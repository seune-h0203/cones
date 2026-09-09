import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./overlays.module.css";

/** Black wipe + chrome line between routes. Purely decorative. */
export function PageTransition() {
  const { pathname } = useLocation();
  const [run, setRun] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setRun((value) => value + 1);
  }, [pathname]);

  if (run === 0) return null;

  return <div key={run} className={styles.transition} aria-hidden="true" />;
}

/** Routes always open at the top of the document. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
