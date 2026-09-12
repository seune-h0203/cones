export type ProductCategory =
  | "LIGHT_STICK"
  | "PHOTOBOOK"
  | "PHOTO_CARD_SET"
  | "KEYRING"
  | "POSTER_SET"
  | "T_SHIRT"
  | "HOODIE"
  | "LIMITED_MD_BOX";

export type ProductStatus = "ACTIVE" | "SOLD_OUT" | "HIDDEN";
export type OrderStatus = "PENDING" | "PAID" | "PREPARING" | "SHIPPED" | "COMPLETED";

export interface ProductRow {
  id: string;
  artist_id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  stock: number;
  image: string;
  status: ProductStatus;
  is_best: boolean;
  is_limited: boolean;
  interest_count: number;
  created_at: string;
  updated_at: string;
}

export interface CartRow {
  id: string;
  user_id: string;
  created_at: string;
}

export interface CartItemRow {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  option: string | null;
  created_at: string;
}

export interface OrderRow {
  id: string;
  user_id: string;
  order_number: string;
  subtotal: number;
  shipping_fee: number;
  total_price: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export interface OrderItemRow {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  option: string | null;
}

export interface CreateOrderResult {
  order_id: string;
  order_number: string;
  total_price: number;
}

export interface Database {
  public: {
    Tables: {
      products: { Row: ProductRow; Insert: Partial<ProductRow>; Update: Partial<ProductRow> };
      carts: { Row: CartRow; Insert: Partial<CartRow>; Update: Partial<CartRow> };
      cart_items: { Row: CartItemRow; Insert: Partial<CartItemRow>; Update: Partial<CartItemRow> };
      orders: { Row: OrderRow; Insert: Partial<OrderRow>; Update: Partial<OrderRow> };
      order_items: { Row: OrderItemRow; Insert: Partial<OrderItemRow>; Update: Partial<OrderItemRow> };
    };
    Functions: {
      create_order: { Args: Record<string, never>; Returns: CreateOrderResult[] };
      mock_pay_order: { Args: { p_order_id: string }; Returns: void };
    };
  };
}
