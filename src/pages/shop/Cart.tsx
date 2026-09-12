import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { asset } from "../../utils/asset";
import { formatKrw } from "../../utils/currency";
import { useSeo } from "../../hooks/useSeo";
import pageStyles from "../pages.module.css";
import styles from "./shop.module.css";

export default function Cart() {
  useSeo({ title: "CONES — CART", description: "CONES 공식 MD 장바구니." });
  const { user, loading: authLoading } = useAuth();
  const { lines, loading, subtotal, updateQuantity, removeItem } = useCart();

  if (!authLoading && !user) return <Navigate to="/login" state={{ from: "/cart" }} replace />;

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.hero}>
        <div className="u-container">
          <p className="u-kicker">CONES OFFICIAL MD</p>
          <h1 className={`u-display ${pageStyles.heroTitle}`}>CART</h1>
        </div>
      </header>

      <section className={`u-section ${pageStyles.section}`}>
        <div className="u-container">
          {loading && <p className={styles.notice}>LOADING…</p>}
          {!loading && lines.length === 0 && (
            <p className={styles.notice}>
              장바구니가 비어 있습니다. <Link to="/shop">SHOP으로 이동 →</Link>
            </p>
          )}

          {!loading && lines.length > 0 && (
            <>
              <ul className={styles.cartList}>
                {lines.map((line) => (
                  <li key={line.itemId} className={styles.cartLine}>
                    <img
                      className={styles.cartLineImage}
                      src={asset(line.product.image)}
                      alt={line.product.name}
                      decoding="async"
                    />
                    <div className={styles.cartLineBody}>
                      <p className="u-mono">{line.product.name}</p>
                      <p className={`u-mono ${styles.cartLinePrice}`}>{formatKrw(line.product.price)}</p>
                    </div>
                    <div className={styles.qtyStepper}>
                      <button type="button" onClick={() => updateQuantity(line.itemId, line.quantity - 1)} aria-label="수량 감소">
                        −
                      </button>
                      <span className="u-mono">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.itemId, Math.min(line.product.stock, line.quantity + 1))}
                        aria-label="수량 증가"
                      >
                        +
                      </button>
                    </div>
                    <p className={`u-mono ${styles.cartLineTotal}`}>{formatKrw(line.product.price * line.quantity)}</p>
                    <button type="button" className={styles.removeBtn} onClick={() => removeItem(line.itemId)}>
                      REMOVE
                    </button>
                  </li>
                ))}
              </ul>

              <div className={styles.cartSummary}>
                <p className="u-mono">SUBTOTAL</p>
                <p className={`u-display ${styles.cartTotal}`}>{formatKrw(subtotal)}</p>
              </div>

              <div className={styles.detailActions}>
                <Link to="/shop" className="u-btn">
                  CONTINUE SHOPPING
                </Link>
                <Link to="/checkout" className="u-btn u-btn--primary">
                  CHECKOUT <span className="u-arrow">-&gt;</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
