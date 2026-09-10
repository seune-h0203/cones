import { useEffect, useState } from "react";
import { useScrollLock } from "../hooks/useFocusTrap";
import { useReducedMotion } from "../hooks/useMedia";
import { BootSequence } from "./BootSequence";
import styles from "./overlays.module.css";

// The boot choreography (O O -> infinity -> CONES, see BootSequence.module.css)
// is scripted to land at 5s, so the screen must stay up at least that long —
// but a stalled load must never trap the visitor past MAX_VISIBLE. Under
// prefers-reduced-motion the sequence is skipped, so there's nothing to wait for.
const MIN_VISIBLE = 5100;
const MAX_VISIBLE = 6800;
const MIN_VISIBLE_REDUCED = 300;
const MAX_VISIBLE_REDUCED = 1200;

/** Branded boot sequence. Always releases the page — never traps the visitor. */
export function LoadingScreen() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [removed, setRemoved] = useState(false);

  useScrollLock(!removed);

  useEffect(() => {
    const minVisible = reduced ? MIN_VISIBLE_REDUCED : MIN_VISIBLE;
    const maxVisible = reduced ? MAX_VISIBLE_REDUCED : MAX_VISIBLE;
    const started = Date.now();
    let releaseTimer = 0;

    const release = () => {
      const waited = Date.now() - started;
      releaseTimer = window.setTimeout(() => setReady(true), Math.max(0, minVisible - waited));
    };

    if (document.readyState === "complete") {
      release();
    } else {
      window.addEventListener("load", release, { once: true });
    }

    const hardStop = window.setTimeout(() => setReady(true), maxVisible);

    return () => {
      window.clearTimeout(hardStop);
      window.clearTimeout(releaseTimer);
      window.removeEventListener("load", release);
    };
  }, [reduced]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setRemoved(true), 700);
    return () => window.clearTimeout(timer);
  }, [ready]);

  if (removed) return null;

  return (
    <div className={styles.loader} data-ready={ready}>
      <div className={styles.loaderInner}>
        <BootSequence />
        <p className="u-sr-only" role="status">
          {ready ? "SYSTEM READY" : "SYSTEM INITIALIZING…"}
        </p>
      </div>
    </div>
  );
}
