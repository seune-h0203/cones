import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DEBUT_LABEL, NAV, SITE } from "../data/site";
import { useScrollLock } from "../hooks/useFocusTrap";
import { asset } from "../utils/asset";
import { Countdown } from "./Countdown";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

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
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.meta}>
          <Countdown variant="chip" />
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
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `${styles.overlayLink} ${isActive ? styles.overlayActive : ""}`
                }
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                <span className={`u-mono ${styles.overlayIndex}`}>0{i + 1}</span>
                <span className="u-display">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className={styles.overlayFoot}>
            <p className="u-kicker">DEBUT SHOWCASE</p>
            <p className={`u-mono ${styles.overlayDate}`}>{DEBUT_LABEL}</p>
            <Countdown variant="inline" />
          </div>
        </div>
      )}
    </header>
  );
}
