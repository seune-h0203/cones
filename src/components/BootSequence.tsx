import { SITE } from "../data/site";
import { useReducedMotion } from "../hooks/useMedia";
import { LogoMark } from "./LogoMark";
import styles from "./BootSequence.module.css";

/**
 * Cinematic 5s boot opening: two circles (O   O) draw in, travel toward
 * each other, merge into an orbital infinity, then a light sweep reveals
 * the CONES wordmark. Pure CSS/SVG choreography, timed by animation-delay
 * off mount — no per-frame JS.
 *
 * Under prefers-reduced-motion the orbit choreography is skipped outright
 * (the global stylesheet collapses animation-duration, but not the
 * animation-delay this sequence relies on, so it still has to be told not
 * to wait) and the logo/caption appear immediately.
 */
export function BootSequence() {
  const reduced = useReducedMotion();

  return (
    <div className={styles.stage} data-reduced={reduced} aria-hidden="true">
      <div className={styles.visual}>
        {!reduced && (
          <svg
            className={styles.orbit}
            viewBox="0 0 400 200"
            role="presentation"
            focusable="false"
          >
            <g className={styles.circles}>
              <circle className={`${styles.circle} ${styles.circleLeft}`} cx="150" cy="100" r="26" />
              <circle className={`${styles.circle} ${styles.circleRight}`} cx="250" cy="100" r="26" />
            </g>
            <path
              className={styles.spark}
              d="M200 82 L206 96 L220 100 L206 104 L200 118 L194 104 L180 100 L194 96 Z"
            />
            <g className={styles.infinity}>
              <path
                className={styles.infinityTrack}
                pathLength="1"
                d="M160,100 C160,70 190,70 200,100 C210,130 240,130 240,100 C240,70 210,70 200,100 C190,130 160,130 160,100 Z"
              />
              <path
                className={styles.infinityLight}
                pathLength="1"
                d="M160,100 C160,70 190,70 200,100 C210,130 240,130 240,100 C240,70 210,70 200,100 C190,130 160,130 160,100 Z"
              />
            </g>
          </svg>
        )}

        <LogoMark
          alt={SITE.name}
          className={styles.logo}
          width={520}
          height={92}
          reveal
          revealDelay={reduced ? 0 : 3000}
          shine
        />
      </div>

      <p className={`u-mono ${styles.caption}`}>CONNECTION : 00</p>
    </div>
  );
}
