import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { OrderItemRow, OrderRow } from "../../lib/database.types";
import { formatKrw } from "../../utils/currency";
import { useSeo } from "../../hooks/useSeo";
import pageStyles from "../pages.module.css";
import styles from "./shop.module.css";

export default function OrderComplete() {
  useSeo({ title: "CONES — ORDER COMPLETE", description: "CONES 공식 MD 주문 완료." });
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [items, setItems] = useState<OrderItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    Promise.all([
      supabase.from("orders").select("*").eq("id", id).maybeSingle(),
      supabase.from("order_items").select("*").eq("order_id", id),
    ]).then(([orderRes, itemsRes]) => {
      if (cancelled) return;
      if (orderRes.error || !orderRes.data) {
        setNotFound(true);
      } else {
        setOrder(orderRes.data);
        setItems(itemsRes.data ?? []);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div className={pageStyles.page}><div className="u-container"><p className={styles.notice}>LOADING…</p></div></div>;
  if (notFound || !order) return <div className={pageStyles.page}><div className="u-container"><p className={styles.notice}>주문을 찾을 수 없습니다.</p></div></div>;

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.hero}>
        <div className="u-container">
          <p className="u-kicker">ORDER COMPLETE</p>
          <h1 className={`u-display ${pageStyles.heroTitle}`}>THANK YOU.</h1>
          <p className={`u-lead ${pageStyles.heroLead}`}>주문번호 {order.order_number}가 정상적으로 접수되었습니다.</p>
        </div>
      </header>

      <section className={`u-section ${pageStyles.section}`}>
        <div className="u-container">
          <ul className={styles.cartList}>
            {items.map((item) => (
              <li key={item.id} className={styles.cartLine}>
                <div className={styles.cartLineBody}>
                  <p className="u-mono">{item.product_name}</p>
                  <p className={`u-mono ${styles.cartLinePrice}`}>수량 {item.quantity}개</p>
                </div>
                <p className={`u-mono ${styles.cartLineTotal}`}>{formatKrw(item.unit_price * item.quantity)}</p>
              </li>
            ))}
          </ul>

          <div className={styles.summaryTable}>
            <div>
              <span className="u-mono">SUBTOTAL</span>
              <span className="u-mono">{formatKrw(order.subtotal)}</span>
            </div>
            <div>
              <span className="u-mono">SHIPPING</span>
              <span className="u-mono">{order.shipping_fee === 0 ? "FREE" : formatKrw(order.shipping_fee)}</span>
            </div>
            <div className={styles.summaryTotalRow}>
              <span className="u-mono">TOTAL</span>
              <span className={`u-display ${styles.cartTotal}`}>{formatKrw(order.total_price)}</span>
            </div>
          </div>

          <p className={`u-mono ${styles.stockLine}`}>STATUS: {order.status}</p>

          <div className={styles.detailActions}>
            <Link to="/shop" className="u-btn">
              CONTINUE SHOPPING
            </Link>
            <Link to="/mypage/orders" className="u-btn u-btn--primary">
              VIEW MY ORDERS <span className="u-arrow">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
