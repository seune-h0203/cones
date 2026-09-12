import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True once VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are configured. */
export const isCommerceConfigured = Boolean(url && anonKey);

if (!isCommerceConfigured) {
  console.warn(
    "[commerce] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set — Shop, Cart, and Orders are disabled. See .env.example.",
  );
}

// Untyped client on purpose: hand-generating a Database type that matches
// supabase-js's PostgREST generics exactly is brittle without running
// `supabase gen types` against a live project. Row shapes are asserted at
// each call site instead — see src/lib/database.types.ts.
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
);
