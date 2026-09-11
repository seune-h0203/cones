import styles from "./overlays.module.css";

/** Black wipe + chrome line between routes. Purely decorative. */
export function PageTransition() {
  return <div className={styles.transition} aria-hidden="true" />;
}

/** Routes always open at the top of the document. */
export function ScrollToTop() {
  return null;
}
