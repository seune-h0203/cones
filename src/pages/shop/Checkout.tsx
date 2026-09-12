import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { supabase } from "../../lib/supabase";
import { asset } from "../../utils/asset";
import { formatKrw } from "../../utils/currency";
import { useSeo } from "../../hooks/useSeo";
import pageStyles from "../pages.module.css";
import styles from "./shop.module.css";

export default function Checkout() {
  useSeo({ title: "CONES — CHECKOUT", description: "CONES 공식 MD 주문." });
  const { user, loading: authLoading } = useAuth();
  const { lines, subtotal, refresh } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!authLoading && !user) return <Navigate to="/login" state={{ from: "/checkout" }} replace />;
  if (lines.length === 0 && !placing) return <Navigate to="/cart" replace />;

  const shippingFee = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError(null);
    const { data, error: rpcError } = await supabase.rpc("create_order");
    setPlacing(false);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    const result = Array.isArray(data) ? data[0] : data;
    if (!result) {
      setError("주문 생성에 실패했습니다.");
      return;
    }
    await refresh();
    navigate(`/order/${result.order_id}`);
  };

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.hero}>
        <div className="u-container">
          <p className="u-kicker">CONES OFFICIAL MD</p>
          <h1 className={`u-display ${pageStyles.heroTitle}`}>CHECKOUT</h1>
        </div>
      </header>

      <section className={`u-section ${pageStyles.section}`}>
        <div className="u-container">
          <ul className={styles.cartList}>
            {lines.map((line) => (
              <li key={line.itemId} className={styles.cartLine}>
                <img className={styles.cartLineImage} src={asset(line.product.image)} alt={line.product.name} decoding="async" />
                <div className={styles.cartLineBody}>
                  <p className="u-mono">{line.product.name}</p>
                  <p className={`u-mono ${styles.cartLinePrice}`}>수량 {line.quantity}개</p>
                </div>
                <p className={`u-mono ${styles.cartLineTotal}`}>{formatKrw(line.product.price * line.quantity)}</p>
              </li>
            ))}
          </ul>

          <div className={styles.summaryTable}>
            <div>
              <span className="u-mono">SUBTOTAL</span>
              <span className="u-mono">{formatKrw(subtotal)}</span>
            </div>
            <div>
              <span className="u-mono">SHIPPING</span>
              <span className="u-mono">{shippingFee === 0 ? "FREE" : formatKrw(shippingFee)}</span>
            </div>
            <div className={styles.summaryTotalRow}>
              <span className="u-mono">TOTAL</span>
              <span className={`u-display ${styles.cartTotal}`}>{formatKrw(total)}</span>
            </div>
          </div>

          {error && <p className={styles.notice}>{error}</p>}

          <div className={styles.detailActions}>
            <button type="button" className="u-btn u-btn--primary" onClick={handlePlaceOrder} disabled={placing}>
              {placing ? "PLACING ORDER…" : "PLACE ORDER"} <span className="u-arrow">-&gt;</span>
            </button>
          </div>
          <p className={styles.footnote}>결제 연동 전 MVP 단계로, 주문은 PENDING 상태로 생성됩니다.</p>
        </div>
      </section>
    </div>
  );
}
