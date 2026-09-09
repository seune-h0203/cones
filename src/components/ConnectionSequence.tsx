import { UNITS } from "../data/site";
import { useReducedMotion } from "../hooks/useMedia";
import { mapRange, useScrollProgress } from "../hooks/useScrollProgress";
import { asset } from "../utils/asset";
import styles from "./SystemCycle.module.css";

const LEMNISCATE =
  "M 500 200 C 440 118, 338 118, 300 200 C 338 282, 440 282, 500 200 C 560 118, 662 118, 700 200 C 662 282, 560 282, 500 200 Z";

const STEPS = ["O    O", "O + O", "∞", "CONES"];

/**
 * The founding sequence, driven by scroll position:
 * two origins converge, become one system, and resolve into CONES.
 */
export function ConnectionSequence() {
  const reducedMotion = useReducedMotion();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const p = progress;

  const converge = mapRange(p, 0.05, 0.45);

  // Without motion the sequence is presented as one finished composition
  // instead of a scroll-driven animation.
  const frame = reducedMotion
    ? {
        leftCx: 440,
        rightCx: 560,
        circleOpacity: 0.28,
        plusOpacity: 0,
        labelOpacity: 1,
        infinityOpacity: 1,
        infinityDraw: 1,
        logoOpacity: 1,
        activeStep: 3,
      }
    : {
        leftCx: 330 + converge * 130,
        rightCx: 670 - converge * 130,
        circleOpacity: 1 - mapRange(p, 0.44, 0.62),
        plusOpacity: mapRange(p, 0.12, 0.3) * (1 - mapRange(p, 0.4, 0.54)),
        labelOpacity: 1 - mapRange(p, 0.28, 0.44),
        infinityOpacity: mapRange(p, 0.46, 0.58),
        infinityDraw: mapRange(p, 0.48, 0.8),
        logoOpacity: mapRange(p, 0.78, 0.94),
        activeStep: p < 0.2 ? 0 : p < 0.48 ? 1 : p < 0.78 ? 2 : 3,
      };

  const {
    leftCx,
    rightCx,
    circleOpacity,
    plusOpacity,
    labelOpacity,
    infinityOpacity,
    infinityDraw,
    logoOpacity,
    activeStep,
  } = frame;

  return (
    <div className={styles.track} ref={ref}>
      <div className={styles.stage}>
        <ol className={styles.steps} aria-hidden="true">
          {STEPS.map((step, i) => (
            <li key={step} className={`u-mono ${styles.step}`} data-active={i === activeStep}>
              {step}
            </li>
          ))}
        </ol>

        <div className={styles.canvas}>
          <svg viewBox="0 0 1000 400" className={styles.svg} role="img" aria-label="두 개의 기원이 만나 하나의 시스템이 되는 과정">
            <g style={{ opacity: circleOpacity }}>
              <circle cx={leftCx} cy={200} r={112} className={styles.circle} />
              <circle cx={rightCx} cy={200} r={112} className={styles.circle} />
            </g>

            <text x={500} y={212} className={styles.plus} style={{ opacity: plusOpacity }}>
              +
            </text>

            <path
              d={LEMNISCATE}
              className={styles.infinity}
              style={{
                opacity: infinityOpacity,
                strokeDasharray: 1,
                strokeDashoffset: 1 - infinityDraw,
              }}
              pathLength={1}
            />
          </svg>

          <img
            src={asset("images/cones-logo.png")}
            alt="CONES"
            className={styles.sequenceLogo}
            style={{ opacity: logoOpacity }}
            loading="lazy"
          />
        </div>

        <div className={styles.originLabels} style={{ opacity: labelOpacity }}>
          <div>
            <p className="u-kicker">{UNITS.ai.origin}</p>
            <p className={`u-display ${styles.originName}`}>{UNITS.ai.name}</p>
            <p className={`u-mono ${styles.originMandate}`}>{UNITS.ai.mandate}</p>
          </div>
          <div>
            <p className="u-kicker">{UNITS.computer.origin}</p>
            <p className={`u-display ${styles.originName}`}>{UNITS.computer.name}</p>
            <p className={`u-mono ${styles.originMandate}`}>{UNITS.computer.mandate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
