import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DEBUT_DATE, DEBUT_LABEL, NAV, SITE } from "../data/site";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useCountdown } from "../hooks/useCountdown";
import { useScrollLock } from "../hooks/useFocusTrap";
import { asset } from "../utils/asset";
import { Countdown } from "./Countdown";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { totalCount } = useCart();
  const { isLive } = useCountdown(DEBUT_DATE);
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={styles.root} data-scrolled={scrolled} data-open={open}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label={`${SITE.name} 홈`}>
          <img src={asset("images/cones-logo.png")} alt={SITE.name} width={158} height={28} />
        </Link>

        <nav className={styles.links} aria-label="주요 메뉴">
          {NAV.map((item) => (
            <a
              key={item.path}
              href={`${window.__CONES_BASE__ ?? "/"}${item.path}`}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link to="/shop" className={styles.link} onClick={() => setOpen(false)}>
            SHOP
          </Link>
        </nav>

        <div className={styles.meta}>
          <Countdown variant="chip" />
          <Link to="/cart" className={styles.cartLink} aria-label="장바구니">
            <span className="u-mono">CART</span>
            {totalCount > 0 && <span className={styles.cartCount}>{totalCount}</span>}
          </Link>
          {user ? (
            <Link to="/mypage/orders" className={styles.link}>
              MY ORDERS
            </Link>
          ) : (
            <Link to="/login" className={styles.link}>
              LOGIN
            </Link>
          )}
        </div>

        <button
          type="button"
          className={`u-mono ${styles.toggle}`}
          aria-expanded={open}
          aria-controls="cones-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open && (
        <div className={styles.overlay} id="cones-menu">
          <nav className={styles.overlayNav} aria-label="전체 메뉴">
            {NAV.map((item, i) => (
              <a
                key={item.path}
                href={`${window.__CONES_BASE__ ?? "/"}${item.path}`}
                className={styles.overlayLink}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                <span className={`u-mono ${styles.overlayIndex}`}>0{i + 1}</span>
                <span className="u-display">{item.label}</span>
              </a>
            ))}
            <Link
              to="/shop"
              className={styles.overlayLink}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${80 + NAV.length * 60}ms` }}
            >
              <span className={`u-mono ${styles.overlayIndex}`}>0{NAV.length + 1}</span>
              <span className="u-display">SHOP</span>
            </Link>
          </nav>
          <div className={styles.overlayFoot}>
            <p className="u-kicker">DEBUT SHOWCASE</p>
            {isLive ? (
              <Countdown variant="inline" />
            ) : (
              <>
                <p className={`u-mono ${styles.overlayDate}`}>{DEBUT_LABEL}</p>
                <Countdown variant="inline" />
              </>
            )}
            <div className={styles.overlayAccount}>
              <Link to="/cart" className={styles.cartLink} onClick={() => setOpen(false)}>
                <span className="u-mono">CART</span>
                {totalCount > 0 && <span className={styles.cartCount}>{totalCount}</span>}
              </Link>
              {user ? (
                <Link to="/mypage/orders" className={styles.link} onClick={() => setOpen(false)}>
                  MY ORDERS
                </Link>
              ) : (
                <Link to="/login" className={styles.link} onClick={() => setOpen(false)}>
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
