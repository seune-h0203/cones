import { useEffect, useRef, useState } from "react";
import { SITE } from "../data/site";
import { useScrollLock } from "../hooks/useFocusTrap";
import { useReducedMotion } from "../hooks/useMedia";
import { IntroSequence } from "./IntroSequence";
import { LogoMark } from "./LogoMark";
import styles from "./overlays.module.css";

// The intro choreography (see IntroSequence's SCENE_TIMELINE, plus the
// boot-mark -> logo reveal timing hardcoded in the "cones" scene's CSS) is
// scripted to land at ~6.4s, so the screen must stay up at least that long
// — but a stalled load must never trap the visitor past MAX_VISIBLE, and
// the SKIP button (handleSkip below) can always end it early regardless of
// either bound. Under prefers-reduced-motion the sequence is skipped
// entirely, so there's nothing to wait for.
const MIN_VISIBLE = 6400;
const MAX_VISIBLE = 8000;
const MIN_VISIBLE_REDUCED = 300;
const MAX_VISIBLE_REDUCED = 1200;

/** Branded intro overlay. Always releases the page — never traps the visitor. */
export function LoadingScreen() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [removed, setRemoved] = useState(false);
  const releaseTimerRef = useRef(0);
  const hardStopRef = useRef(0);

  useScrollLock(!removed);

  useEffect(() => {
    const minVisible = reduced ? MIN_VISIBLE_REDUCED : MIN_VISIBLE;
    const maxVisible = reduced ? MAX_VISIBLE_REDUCED : MAX_VISIBLE;
    const started = Date.now();

    const release = () => {
      const waited = Date.now() - started;
      releaseTimerRef.current = window.setTimeout(() => setReady(true), Math.max(0, minVisible - waited));
    };

    if (document.readyState === "complete") {
      release();
    } else {
      window.addEventListener("load", release, { once: true });
    }

    hardStopRef.current = window.setTimeout(() => setReady(true), maxVisible);

    return () => {
      window.clearTimeout(hardStopRef.current);
      window.clearTimeout(releaseTimerRef.current);
      window.removeEventListener("load", release);
    };
  }, [reduced]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setRemoved(true), 820);
    return () => window.clearTimeout(timer);
  }, [ready]);

  const handleSkip = () => {
    window.clearTimeout(releaseTimerRef.current);
    window.clearTimeout(hardStopRef.current);
    setReady(true);
  };

  if (removed) return null;

  return (
    <div className={styles.loader} data-ready={ready}>
      {reduced ? (
        <div className={styles.loaderInner}>
          <LogoMark alt={SITE.name} width={420} height={74} shine />
        </div>
      ) : (
        <IntroSequence onSkip={handleSkip} exiting={ready} />
      )}
      <p className="u-sr-only" role="status">
        {ready ? "SYSTEM READY" : "SYSTEM INITIALIZING…"}
      </p>
    </div>
  );
}
