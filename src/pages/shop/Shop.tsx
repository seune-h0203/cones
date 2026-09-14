import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ARTISTS, getArtist } from "../../data/artists";
import { UNITS } from "../../data/site";
import { isCommerceConfigured, supabase } from "../../lib/supabase";
import type { ProductRow } from "../../lib/database.types";
import { asset } from "../../utils/asset";
import { formatKrw } from "../../utils/currency";
import { useSeo } from "../../hooks/useSeo";
import { VideoModal } from "../../components/VideoModal";
import pageStyles from "../pages.module.css";
import styles from "./shop.module.css";

const BAESAN = getArtist("baesan");

export default function Shop() {
  useSeo({ title: "CONES — OFFICIAL MD", description: "CONES 공식 MD 스토어." });

  const [params, setParams] = useSearchParams();
  const activeArtist = params.get("artist");
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [teaserOpen, setTeaserOpen] = useState(false);

  useEffect(() => {
    if (!isCommerceConfigured) {
      setLoading(false);
      setErrorMsg("COMMERCE_NOT_CONFIGURED");
      return;
    }
    let cancelled = false;
    setLoading(true);
    let query = supabase.from("products").select("*").eq("status", "ACTIVE").order("name");
    if (activeArtist) query = query.eq("artist_id", activeArtist);

    query.then(({ data, error }) => {
      if (cancelled) return;
      if (error) setErrorMsg(error.message);
      else setProducts(data ?? []);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [activeArtist]);

  const artistTabs = useMemo(
    () => [{ id: null as string | null, stageName: "ALL" }, ...ARTISTS.map((a) => ({ id: a.id, stageName: a.stageName }))],
    [],
  );

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.hero}>
        <div className="u-container">
          <p className="u-kicker">CONES OFFICIAL MD</p>
          <h1 className={`u-display ${pageStyles.heroTitle}`}>SAME, BUT BRIGHTER.</h1>
          <p className={`u-lead ${pageStyles.heroLead}`}>
            네 사람의 순환이 만든 시스템을, 이제 손에 쥘 수 있는 형태로.
          </p>
          {BAESAN && (
            <div className={styles.heroActions}>
              <button
                type="button"
                className="u-btn u-btn--primary"
                onClick={() => setTeaserOpen(true)}
                data-cursor="play"
              >
                BAESAN TEASER <span className="u-arrow">-&gt;</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <section className={`u-section ${pageStyles.section}`}>
        <div className="u-container">
          <nav className={styles.artistTabs} aria-label="아티스트 필터">
            {artistTabs.map((tab) => (
              <button
                key={tab.id ?? "all"}
                type="button"
                className={styles.artistTab}
                data-active={activeArtist === tab.id || (tab.id === null && !activeArtist)}
                onClick={() => setParams(tab.id ? { artist: tab.id } : {})}
              >
                {tab.stageName}
              </button>
            ))}
          </nav>

          {errorMsg === "COMMERCE_NOT_CONFIGURED" && (
            <p className={styles.notice}>
              스토어가 아직 연결되지 않았습니다. Supabase 프로젝트 설정 후 이용할 수 있습니다.
            </p>
          )}
          {errorMsg && errorMsg !== "COMMERCE_NOT_CONFIGURED" && <p className={styles.notice}>{errorMsg}</p>}
          {!errorMsg && loading && <p className={styles.notice}>LOADING…</p>}
          {!errorMsg && !loading && products.length === 0 && <p className={styles.notice}>등록된 상품이 없습니다.</p>}

          <div className={styles.grid}>
            {products.map((product) => (
              <Link key={product.id} to={`/shop/product/${product.slug}`} className={styles.card} data-cursor="view">
                <div className={styles.cardMedia}>
                  <img src={asset(product.image)} alt={product.name} loading="lazy" decoding="async" />
                  {product.is_best && <span className={styles.badge}>BEST</span>}
                  {product.is_limited && <span className={`${styles.badge} ${styles.badgeLimited}`}>LIMITED</span>}
                  {product.stock === 0 && <span className={styles.soldOut}>SOLD OUT</span>}
                </div>
                <p className={`u-mono ${styles.cardName}`}>{product.name}</p>
                <p className={`u-mono ${styles.cardPrice}`}>{formatKrw(product.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
