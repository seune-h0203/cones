import { Link } from "react-router-dom";
import { DEBUT_LABEL, NAV, SITE } from "../data/site";
import { asset } from "../utils/asset";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={`u-container ${styles.inner}`}>
        <div className={styles.brand}>
          <img
            src={asset("images/cones-logo.png")}
            alt={SITE.name}
            className={styles.logo}
            width={240}
            height={43}
            loading="lazy"
          />
          <p className={`u-kicker ${styles.tagline}`}>{SITE.tagline}</p>
        </div>

        <nav className={styles.nav} aria-label="푸터 메뉴">
          {NAV.map((item) => (
            <Link key={item.path} to={item.path} className={`u-mono ${styles.link}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <dl className={styles.meta}>
          <div>
            <dt className="u-kicker">PROJECT</dt>
            <dd className={`u-mono ${styles.value}`}>{SITE.project}</dd>
          </div>
          <div>
            <dt className="u-kicker">DEBUT SHOWCASE</dt>
            <dd className={`u-mono ${styles.value}`}>{DEBUT_LABEL}</dd>
          </div>
        </dl>
      </div>

      <div className={`u-container ${styles.base}`}>
        <p className="u-mono">
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <p className="u-mono">FOUR MINDS. TWO ORIGINS. ONE SYSTEM.</p>
      </div>
    </footer>
  );
}
