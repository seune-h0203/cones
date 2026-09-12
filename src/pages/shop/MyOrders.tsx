import { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import type { OrderItemRow, OrderRow } from "../../lib/database.types";
import { asset } from "../../utils/asset";
import { formatKrw } from "../../utils/currency";
import { useSeo } from "../../hooks/useSeo";
import pageStyles from "../pages.module.css";
import styles from "./shop.module.css";

type OrderWithItems = OrderRow & {
  order_items: Pick<OrderItemRow, "id" | "product_name" | "image">[];
};

export default function MyOrders() {
  useSeo({ title: "CONES — MY ORDERS", description: "내 CONES 공식 MD 주문 내역." });
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(id, product_name, image)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setOrders((data as OrderWithItems[] | null) ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  if (!authLoading && !user) return <Navigate to="/login" state={{ from: "/mypage/orders" }} replace />;

  const markPaid = async (orderId: string) => {
    await supabase.rpc("mock_pay_order", { p_order_id: orderId });
    await load();
  };

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.hero}>
        <div className="u-container">
          <p className="u-kicker">MYPAGE</p>
          <h1 className={`u-display ${pageStyles.heroTitle}`}>MY ORDERS</h1>
        </div>
      </header>

      <section className={`u-section ${pageStyles.section}`}>
        <div className="u-container">
          {loading && <p className={styles.notice}>LOADING…</p>}
          {!loading && orders.length === 0 && (
            <p className={styles.notice}>
              주문 내역이 없습니다. <Link to="/shop">SHOP으로 이동 →</Link>
            </p>
          )}

          <ul className={styles.orderList}>
            {orders.map((order) => (
              <li key={order.id} className={styles.orderRow}>
                <div className={styles.orderThumbs}>
                  {order.order_items.slice(0, 3).map((item) =>
                    item.image ? (
                      <img
                        key={item.id}
                        className={styles.orderThumb}
                        src={asset(item.image)}
                        alt={item.product_name}
                        decoding="async"
                      />
                    ) : (
                      <div key={item.id} className={styles.orderThumb} aria-hidden="true" />
                    ),
                  )}
                </div>
                <div>
                  <p className="u-mono">{order.order_number}</p>
                  <p className={`u-mono ${styles.orderDate}`}>{new Date(order.created_at).toLocaleDateString("ko-KR")}</p>
                </div>
                <p className={`u-mono ${styles.orderStatus}`} data-status={order.status}>
                  {order.status}
                </p>
                <p className="u-mono">{formatKrw(order.total_price)}</p>
                <div className={styles.orderActions}>
                  <Link to={`/order/${order.id}`} className={styles.backLink}>
                    상세보기 →
                  </Link>
                  {order.status === "PENDING" && (
                    <button type="button" className={styles.removeBtn} onClick={() => markPaid(order.id)}>
                      결제 완료 처리 (mock)
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
