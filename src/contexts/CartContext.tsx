import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabase";
import type { ProductRow } from "../lib/database.types";
import { useAuth } from "./AuthContext";

export interface CartLine {
  itemId: string;
  quantity: number;
  option: string | null;
  product: ProductRow;
}

interface CartContextValue {
  lines: CartLine[];
  loading: boolean;
  totalCount: number;
  subtotal: number;
  addItem: (product: ProductRow, quantity?: number, option?: string | null) => Promise<{ error: string | null }>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

async function ensureCartId(userId: string): Promise<string> {
  const { data: existing } = await supabase.from("carts").select("id").eq("user_id", userId).maybeSingle();
  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from("carts")
    .insert({ user_id: userId })
    .select("id")
    .single();
  if (error || !created) throw new Error(error?.message ?? "CART_CREATE_FAILED");
  return created.id;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setLines([]);
      return;
    }
    setLoading(true);
    try {
      const cartId = await ensureCartId(user.id);
      const { data, error } = await supabase
        .from("cart_items")
        .select("id, quantity, option, products(*)")
        .eq("cart_id", cartId);

      if (error) throw error;

      const next: CartLine[] = (data ?? [])
        .filter((row): row is typeof row & { products: ProductRow } => Boolean(row.products))
        .map((row) => ({
          itemId: row.id,
          quantity: row.quantity,
          option: row.option,
          product: row.products,
        }));
      setLines(next);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem: CartContextValue["addItem"] = async (product, quantity = 1, option = null) => {
    if (!user) return { error: "AUTH_REQUIRED" };
    const cartId = await ensureCartId(user.id);

    let existingQuery = supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("cart_id", cartId)
      .eq("product_id", product.id);
    existingQuery = option === null ? existingQuery.is("option", null) : existingQuery.eq("option", option);
    const { data: existing } = await existingQuery.maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id);
      if (error) return { error: error.message };
    } else {
      const { error } = await supabase
        .from("cart_items")
        .insert({ cart_id: cartId, product_id: product.id, quantity, option });
      if (error) return { error: error.message };
    }

    await refresh();
    return { error: null };
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(itemId);
      return;
    }
    await supabase.from("cart_items").update({ quantity }).eq("id", itemId);
    await refresh();
  };

  const removeItem = async (itemId: string) => {
    await supabase.from("cart_items").delete().eq("id", itemId);
    await refresh();
  };

  const totalCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.quantity * l.product.price, 0), [lines]);

  return (
    <CartContext.Provider value={{ lines, loading, totalCount, subtotal, addItem, updateQuantity, removeItem, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
