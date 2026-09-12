-- CONES Commerce schema — run this once in the Supabase SQL editor
-- (Project → SQL Editor → New query → paste this whole file → Run).
-- Safe to re-run: tables are created with IF NOT EXISTS and the RPC uses CREATE OR REPLACE.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. TABLES
-- ---------------------------------------------------------------------------

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  artist_id text not null,
  slug text not null unique,
  name text not null,
  category text not null,
  description text not null default '',
  price integer not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image text not null,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'SOLD_OUT', 'HIDDEN')),
  is_best boolean not null default false,
  is_limited boolean not null default false,
  interest_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  option text,
  created_at timestamptz not null default now(),
  unique (cart_id, product_id, option)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete restrict,
  order_number text not null unique,
  subtotal integer not null,
  shipping_fee integer not null,
  total_price integer not null,
  status text not null default 'PENDING' check (status in ('PENDING', 'PAID', 'PREPARING', 'SHIPPED', 'COMPLETED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  product_name text not null,
  quantity integer not null,
  unit_price integer not null,
  option text
);

create index if not exists idx_products_artist on public.products (artist_id);
create index if not exists idx_cart_items_cart on public.cart_items (cart_id);
create index if not exists idx_orders_user on public.orders (user_id);
create index if not exists idx_order_items_order on public.order_items (order_id);

-- ---------------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------

alter table public.products enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "products are publicly readable" on public.products;
create policy "products are publicly readable" on public.products
  for select using (true);

drop policy if exists "users manage their own cart" on public.carts;
create policy "users manage their own cart" on public.carts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "users manage their own cart items" on public.cart_items;
create policy "users manage their own cart items" on public.cart_items
  for all using (
    cart_id in (select id from public.carts where user_id = auth.uid())
  ) with check (
    cart_id in (select id from public.carts where user_id = auth.uid())
  );

drop policy if exists "users read their own orders" on public.orders;
create policy "users read their own orders" on public.orders
  for select using (auth.uid() = user_id);

drop policy if exists "users read their own order items" on public.order_items;
create policy "users read their own order items" on public.order_items
  for select using (
    order_id in (select id from public.orders where user_id = auth.uid())
  );

-- No insert/update/delete policies on orders/order_items for regular clients —
-- orders are only ever created through create_order() below (SECURITY DEFINER),
-- so a client can never write its own price/total/stock.

-- ---------------------------------------------------------------------------
-- 3. CHECKOUT RPC — recomputes price/stock server-side, never trusts the client
-- ---------------------------------------------------------------------------

create or replace function public.create_order()
returns table (order_id uuid, order_number text, total_price integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_cart_id uuid;
  v_subtotal integer := 0;
  v_shipping integer := 0;
  v_total integer := 0;
  v_order_id uuid;
  v_order_number text;
  r record;
begin
  if v_user_id is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  select id into v_cart_id from public.carts where user_id = v_user_id;
  if v_cart_id is null then
    raise exception 'CART_EMPTY';
  end if;

  if not exists (select 1 from public.cart_items where cart_id = v_cart_id) then
    raise exception 'CART_EMPTY';
  end if;

  -- lock the products in this cart to prevent a concurrent checkout
  -- from overselling the same stock
  perform 1
  from public.products p
  where p.id in (select product_id from public.cart_items where cart_id = v_cart_id)
  for update;

  for r in
    select p.id, p.name, p.stock, ci.quantity
    from public.cart_items ci
    join public.products p on p.id = ci.product_id
    where ci.cart_id = v_cart_id
  loop
    if r.quantity > r.stock then
      raise exception 'OUT_OF_STOCK: %', r.name;
    end if;
  end loop;

  select coalesce(sum(p.price * ci.quantity), 0) into v_subtotal
  from public.cart_items ci
  join public.products p on p.id = ci.product_id
  where ci.cart_id = v_cart_id;

  v_shipping := case when v_subtotal >= 50000 then 0 else 3000 end;
  v_total := v_subtotal + v_shipping;

  v_order_number := 'CN' || to_char(now(), 'YYMMDD') ||
    '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));

  insert into public.orders (user_id, order_number, subtotal, shipping_fee, total_price, status)
  values (v_user_id, v_order_number, v_subtotal, v_shipping, v_total, 'PENDING')
  returning id into v_order_id;

  insert into public.order_items (order_id, product_id, product_name, quantity, unit_price, option)
  select v_order_id, p.id, p.name, ci.quantity, p.price, ci.option
  from public.cart_items ci
  join public.products p on p.id = ci.product_id
  where ci.cart_id = v_cart_id;

  update public.products p
  set stock = p.stock - ci.quantity, updated_at = now()
  from public.cart_items ci
  where ci.cart_id = v_cart_id and ci.product_id = p.id;

  update public.products set status = 'SOLD_OUT'
  where stock <= 0 and status <> 'SOLD_OUT'
    and id in (select product_id from public.order_items oi where oi.order_id = v_order_id);

  delete from public.cart_items where cart_id = v_cart_id;

  return query select v_order_id, v_order_number, v_total;
end;
$$;

grant execute on function public.create_order() to authenticated;

-- mock payment action for the presentation build — flips a PENDING order to
-- PAID without a real PG. Only the order's own owner can call it.
create or replace function public.mock_pay_order(p_order_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.orders
  set status = 'PAID', updated_at = now()
  where id = p_order_id and user_id = auth.uid() and status = 'PENDING';

  if not found then
    raise exception 'ORDER_NOT_FOUND_OR_NOT_PENDING';
  end if;
end;
$$;

grant execute on function public.mock_pay_order(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- 4. SEED — 4 artists x 8 products = 32 rows. Re-runnable (upsert on slug).
-- ---------------------------------------------------------------------------

insert into public.products
  (artist_id, slug, name, category, description, price, stock, image, is_best, is_limited)
values
  ('baesan', 'baesan-light-stick', 'BAESAN LIGHT STICK', 'LIGHT_STICK', 'BAESAN 공식 응원봉. 라이브에서 하나의 빛으로 연결된다.', 42000, 37, 'images/md/products/baesan-light-stick.jpg', true, false),
  ('baesan', 'baesan-photobook', 'BAESAN PHOTOBOOK', 'PHOTOBOOK', 'BAESAN의 무드를 담은 공식 포토북.', 35000, 22, 'images/md/products/baesan-photobook.jpg', false, false),
  ('baesan', 'baesan-photo-card-set', 'BAESAN PHOTO CARD SET', 'PHOTO_CARD_SET', 'BAESAN 포토카드 8종 세트.', 18000, 64, 'images/md/products/baesan-photo-card-set.jpg', false, false),
  ('baesan', 'baesan-keyring', 'BAESAN KEYRING', 'KEYRING', 'BAESAN 시그니처 참 키링.', 16000, 80, 'images/md/products/baesan-keyring.jpg', false, false),
  ('baesan', 'baesan-poster-set', 'BAESAN POSTER SET', 'POSTER_SET', 'BAESAN 포스터 3종 세트.', 24000, 33, 'images/md/products/baesan-poster-set.jpg', false, false),
  ('baesan', 'baesan-t-shirt', 'BAESAN T-SHIRT', 'T_SHIRT', 'BAESAN 로고 티셔츠.', 39000, 45, 'images/md/products/baesan-t-shirt.jpg', false, false),
  ('baesan', 'baesan-hoodie', 'BAESAN HOODIE', 'HOODIE', 'BAESAN 로고 후디.', 69000, 20, 'images/md/products/baesan-hoodie.jpg', false, false),
  ('baesan', 'baesan-limited-box', 'BAESAN LIMITED MD BOX', 'LIMITED_MD_BOX', 'BAESAN 리미티드 MD 박스 — 포토카드, 포토북, 키링 구성.', 89000, 9, 'images/md/products/baesan-limited-box.jpg', false, true),
  ('ham-bom', 'ham-bom-light-stick', 'HAM BOM LIGHT STICK', 'LIGHT_STICK', 'HAM BOM 공식 응원봉. 라이브에서 하나의 빛으로 연결된다.', 42000, 42, 'images/md/products/ham-bom-light-stick.jpg', true, false),
  ('ham-bom', 'ham-bom-photobook', 'HAM BOM PHOTOBOOK', 'PHOTOBOOK', 'HAM BOM의 무드를 담은 공식 포토북.', 35000, 18, 'images/md/products/ham-bom-photobook.jpg', false, false),
  ('ham-bom', 'ham-bom-photo-card-set', 'HAM BOM PHOTO CARD SET', 'PHOTO_CARD_SET', 'HAM BOM 포토카드 8종 세트.', 18000, 58, 'images/md/products/ham-bom-photo-card-set.jpg', false, false),
  ('ham-bom', 'ham-bom-keyring', 'HAM BOM KEYRING', 'KEYRING', 'HAM BOM 시그니처 참 키링.', 16000, 75, 'images/md/products/ham-bom-keyring.jpg', false, false),
  ('ham-bom', 'ham-bom-poster-set', 'HAM BOM POSTER SET', 'POSTER_SET', 'HAM BOM 포스터 3종 세트.', 24000, 27, 'images/md/products/ham-bom-poster-set.jpg', false, false),
  ('ham-bom', 'ham-bom-t-shirt', 'HAM BOM T-SHIRT', 'T_SHIRT', 'HAM BOM 로고 티셔츠.', 39000, 39, 'images/md/products/ham-bom-t-shirt.jpg', false, false),
  ('ham-bom', 'ham-bom-hoodie', 'HAM BOM HOODIE', 'HOODIE', 'HAM BOM 로고 후디.', 69000, 16, 'images/md/products/ham-bom-hoodie.jpg', false, false),
  ('ham-bom', 'ham-bom-limited-box', 'HAM BOM LIMITED MD BOX', 'LIMITED_MD_BOX', 'HAM BOM 리미티드 MD 박스 — 포토카드, 포토북, 키링 구성.', 89000, 12, 'images/md/products/ham-bom-limited-box.jpg', false, true),
  ('hyun-jizel', 'hyun-jizel-light-stick', 'HYUN JIZEL LIGHT STICK', 'LIGHT_STICK', 'HYUN JIZEL 공식 응원봉. 라이브에서 하나의 빛으로 연결된다.', 42000, 29, 'images/md/products/hyun-jizel-light-stick.jpg', true, false),
  ('hyun-jizel', 'hyun-jizel-photobook', 'HYUN JIZEL PHOTOBOOK', 'PHOTOBOOK', 'HYUN JIZEL의 무드를 담은 공식 포토북.', 35000, 25, 'images/md/products/hyun-jizel-photobook.jpg', false, false),
  ('hyun-jizel', 'hyun-jizel-photo-card-set', 'HYUN JIZEL PHOTO CARD SET', 'PHOTO_CARD_SET', 'HYUN JIZEL 포토카드 8종 세트.', 18000, 71, 'images/md/products/hyun-jizel-photo-card-set.jpg', false, false),
  ('hyun-jizel', 'hyun-jizel-keyring', 'HYUN JIZEL KEYRING', 'KEYRING', 'HYUN JIZEL 시그니처 참 키링.', 16000, 68, 'images/md/products/hyun-jizel-keyring.jpg', false, false),
  ('hyun-jizel', 'hyun-jizel-poster-set', 'HYUN JIZEL POSTER SET', 'POSTER_SET', 'HYUN JIZEL 포스터 3종 세트.', 24000, 40, 'images/md/products/hyun-jizel-poster-set.jpg', false, false),
  ('hyun-jizel', 'hyun-jizel-t-shirt', 'HYUN JIZEL T-SHIRT', 'T_SHIRT', 'HYUN JIZEL 로고 티셔츠.', 39000, 50, 'images/md/products/hyun-jizel-t-shirt.jpg', false, false),
  ('hyun-jizel', 'hyun-jizel-hoodie', 'HYUN JIZEL HOODIE', 'HOODIE', 'HYUN JIZEL 로고 후디.', 69000, 24, 'images/md/products/hyun-jizel-hoodie.jpg', false, false),
  ('hyun-jizel', 'hyun-jizel-limited-box', 'HYUN JIZEL LIMITED MD BOX', 'LIMITED_MD_BOX', 'HYUN JIZEL 리미티드 MD 박스 — 포토카드, 포토북, 키링 구성.', 89000, 8, 'images/md/products/hyun-jizel-limited-box.jpg', false, true),
  ('rina', 'rina-light-stick', 'SERINA LIGHT STICK', 'LIGHT_STICK', 'SERINA 공식 응원봉. 라이브에서 하나의 빛으로 연결된다.', 42000, 51, 'images/md/products/rina-light-stick.jpg', true, false),
  ('rina', 'rina-photobook', 'SERINA PHOTOBOOK', 'PHOTOBOOK', 'SERINA의 무드를 담은 공식 포토북.', 35000, 30, 'images/md/products/rina-photobook.jpg', false, false),
  ('rina', 'rina-photo-card-set', 'SERINA PHOTO CARD SET', 'PHOTO_CARD_SET', 'SERINA 포토카드 8종 세트.', 18000, 66, 'images/md/products/rina-photo-card-set.jpg', false, false),
  ('rina', 'rina-keyring', 'SERINA KEYRING', 'KEYRING', 'SERINA 시그니처 참 키링.', 16000, 90, 'images/md/products/rina-keyring.jpg', false, false),
  ('rina', 'rina-poster-set', 'SERINA POSTER SET', 'POSTER_SET', 'SERINA 포스터 3종 세트.', 24000, 35, 'images/md/products/rina-poster-set.jpg', false, false),
  ('rina', 'rina-t-shirt', 'SERINA T-SHIRT', 'T_SHIRT', 'SERINA 로고 티셔츠.', 39000, 48, 'images/md/products/rina-t-shirt.jpg', false, false),
  ('rina', 'rina-hoodie', 'SERINA HOODIE', 'HOODIE', 'SERINA 로고 후디.', 69000, 19, 'images/md/products/rina-hoodie.jpg', false, false),
  ('rina', 'rina-limited-box', 'SERINA LIMITED MD BOX', 'LIMITED_MD_BOX', 'SERINA 리미티드 MD 박스 — 포토카드, 포토북, 키링 구성.', 89000, 7, 'images/md/products/rina-limited-box.jpg', false, true)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  price = excluded.price,
  image = excluded.image,
  is_best = excluded.is_best,
  is_limited = excluded.is_limited;
