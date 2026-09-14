import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArtist } from "../../data/artists";
import { UNITS } from "../../data/site";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { supabase } from "../../lib/supabase";
import type { ProductRow } from "../../lib/database.types";
import { asset } from "../../utils/asset";
import { formatKrw } from "../../utils/currency";
import { useSeo } from "../../hooks/useSeo";
import { VideoModal } from "../../components/VideoModal";
import pageStyles from "../pages.module.css";
import styles from "./shop.module.css";

const BAESAN = getArtist("baesan");

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState<ProductRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<string | null>(null);
  const [teaserOpen, setTeaserOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) setNotFound(true);
        else setProduct(data);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useSeo({
    title: product ? `CONES — ${product.name}` : "CONES — OFFICIAL MD",
    description: product?.description ?? "CONES 공식 MD 스토어.",
  });

  if (loading) return <div className={pageStyles.page}><div className="u-container"><p className={styles.notice}>LOADING…</p></div></div>;
  if (notFound || !product) return <div className={pageStyles.page}><div className="u-container"><p className={styles.notice}>상품을 찾을 수 없습니다.</p></div></div>;

  const soldOut = product.stock <= 0;

  const handleAdd = async (redirectToCart: boolean) => {
    setMessage(null);
    if (!user) {
      navigate("/login", { state: { from: `/shop/product/${product.slug}` } });
      return;
    }
    const { error } = await addItem(product, quantity);
    if (error) {
      setMessage(error);
      return;
    }
    if (redirectToCart) navigate("/cart");
    else setMessage("장바구니에 담았습니다.");
  };

  return (
    <div className={pageStyles.page}>
      <div className="u-container">
        <div className={styles.detailLayout}>
          <div className={styles.detailMedia}>
            <img src={asset(product.image)} alt={product.name} decoding="async" />
            {product.is_best && <span className={styles.badge}>BEST</span>}
            {product.is_limited && <span className={`${styles.badge} ${styles.badgeLimited}`}>LIMITED</span>}
          </div>
          <div className={styles.detailBody}>
            <p className="u-kicker">{product.artist_id.toUpperCase()} · {product.category.replace(/_/g, " ")}</p>
            <h1 className={`u-display ${styles.detailName}`}>{product.name}</h1>
            <p className={`u-mono ${styles.detailPrice}`}>{formatKrw(product.price)}</p>
            <p className={styles.detailDescription}>{product.description}</p>

            <p className={`u-mono ${styles.stockLine}`}>
              {soldOut ? "SOLD OUT" : product.stock <= 10 ? `Only ${product.stock} left` : `재고 ${product.stock}개`}
            </p>

            <div className={styles.qtyRow}>
              <div className={styles.qtyStepper}>
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="수량 감소">
                  −
                </button>
                <span className="u-mono">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="수량 증가"
                >
                  +
                </button>
              </div>
              <p className="u-mono">{formatKrw(product.price * quantity)}</p>
            </div>

            <div className={styles.detailActions}>
              <button type="button" className="u-btn" disabled={soldOut} onClick={() => handleAdd(false)}>
                ADD TO CART
              </button>
              <button
                type="button"
                className="u-btn u-btn--primary"
                disabled={soldOut}
                onClick={() => handleAdd(true)}
              >
                BUY NOW <span className="u-arrow">-&gt;</span>
              </button>
            </div>

            {message && <p className={styles.notice}>{message}</p>}

            {BAESAN && (
              <button
                type="button"
                className={`u-btn ${styles.teaserLink}`}
                onClick={() => setTeaserOpen(true)}
                data-cursor="play"
              >
                BAESAN TEASER <span className="u-arrow">-&gt;</span>
              </button>
            )}

            <Link to={`/shop?artist=${product.artist_id}`} className={styles.backLink}>
              ← {product.artist_id.toUpperCase()} MD 더 보기
            </Link>
          </div>
        </div>
      </div>

      {BAESAN && (
        <VideoModal
          open={teaserOpen}
          onClose={() => setTeaserOpen(false)}
          subject={{
            id: BAESAN.id,
            title: BAESAN.stageName,
            meta: `${UNITS[BAESAN.unit].name} · ${BAESAN.ability}`,
            poster: BAESAN.images.wide,
          }}
        />
      )}
    </div>
  );
}
