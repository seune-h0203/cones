import { Link } from "react-router-dom";
import { ARTISTS } from "../data/artists";
import { CYCLE } from "../data/site";
import { useInView } from "../hooks/useInView";
import styles from "./SystemCycle.module.css";

/** LEARN → PREDICT → DESIGN → EXECUTE → LEARN → ∞ */
export function SystemCycle() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div className={styles.cycle} ref={ref} data-on={inView}>
      <ol className={styles.chain}>
        {CYCLE.map((step, i) => {
          const artist = ARTISTS.find((item) => item.stageName === step.artist);
          return (
            <li
              key={step.ability}
              className={styles.node}
              style={{ transitionDelay: `${i * 220}ms` }}
            >
              <span className={`u-mono ${styles.nodeIndex}`}>0{i + 1}</span>
              <span className={`u-display ${styles.nodeAbility}`}>{step.ability}</span>
              {artist ? (
                <Link to={`/artists/${artist.id}`} className={`u-mono ${styles.nodeArtist}`}>
                  {step.artist}
                </Link>
              ) : (
                <span className={`u-mono ${styles.nodeArtist}`}>{step.artist}</span>
              )}
              <span className={`u-mono ${styles.nodeUnit}`}>{step.unit}</span>
            </li>
          );
        })}
      </ol>

      <div className={styles.loop}>
        <span className={styles.loopLine} />
        <span className={`u-mono ${styles.loopLabel}`}>LOOP</span>
        <span className={styles.loopSymbol}>∞</span>
      </div>
    </div>
  );
}
