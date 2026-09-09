import { useEffect, useState } from "react";
import styles from "./overlays.module.css";

const SEQUENCE = "cones";

/** Type C-O-N-E-S anywhere: the system acknowledges. */
export function EasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let buffer = "";

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.length !== 1) return;

      buffer = (buffer + event.key.toLowerCase()).slice(-SEQUENCE.length);
      if (buffer === SEQUENCE) setOpen(true);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), 2600);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.egg} role="status">
      <div className={styles.eggInner}>
        <p className={`u-mono ${styles.eggSymbol}`}>O + O → ∞</p>
        <p className={`u-display ${styles.eggText}`}>CONNECTION ESTABLISHED</p>
      </div>
    </div>
  );
}
