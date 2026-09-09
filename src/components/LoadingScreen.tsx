import { useEffect, useState } from "react";
import { SITE } from "../data/site";
import { useScrollLock } from "../hooks/useFocusTrap";
import { LogoMark } from "./LogoMark";
import styles from "./overlays.module.css";

const MIN_VISIBLE = 900;
const MAX_VISIBLE = 2400;
const STEPS = ["CONNECTING ORIGINS", "SYNCING ARTISTS", "ESTABLISHING CONNECTION", "CONES"];

/** Branded boot sequence. Always releases the page — never traps the visitor. */
export function LoadingScreen() {
  const [ready, setReady] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [step, setStep] = useState(0);

  useScrollLock(!removed);

  useEffect(() => {
    const started = Date.now();
    let releaseTimer = 0;

    const stepTimer = window.setInterval(() => {
      setStep((value) => Math.min(STEPS.length, value + 1));
    }, 240);

    const release = () => {
      const waited = Date.now() - started;
      releaseTimer = window.setTimeout(() => setReady(true), Math.max(0, MIN_VISIBLE - waited));
    };

    if (document.readyState === "complete") {
      release();
    } else {
      window.addEventListener("load", release, { once: true });
    }

    const hardStop = window.setTimeout(() => setReady(true), MAX_VISIBLE);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(hardStop);
      window.clearTimeout(releaseTimer);
      window.removeEventListener("load", release);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setRemoved(true), 700);
    return () => window.clearTimeout(timer);
  }, [ready]);

  if (removed) return null;

  return (
    <div className={styles.loader} data-ready={ready}>
      <div className={styles.loaderInner}>
        <LogoMark
          alt={SITE.name}
          className={styles.loaderLogo}
          width={360}
          height={64}
          shine
          pulse
        />
        <p className={`u-kicker ${styles.loaderStatus}`} role="status">
          {ready ? "SYSTEM READY" : "SYSTEM INITIALIZING…"}
        </p>
        <ul className={styles.steps} aria-hidden="true">
          {STEPS.map((label, i) => (
            <li key={label} className={styles.step} data-on={ready || i < step}>
              <span className={`u-mono ${styles.stepIndex}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className={`u-mono ${styles.stepLabel}`}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
