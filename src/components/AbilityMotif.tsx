import type { AbilityId } from "../data/artists";
import { useInView } from "../hooks/useInView";
import styles from "./AbilityMotif.module.css";

const DOTS = Array.from({ length: 8 * 4 }, (_, i) => {
  const col = i % 8;
  const row = Math.floor(i / 8);
  return { x: 40 + col * 40, y: 40 + row * 45, active: (col + row) % 3 === 0 };
});

const BRANCHES = [
  "M 60 110 C 170 108, 210 44, 350 32",
  "M 60 110 C 170 110, 214 88, 350 82",
  "M 60 110 C 170 112, 214 134, 350 142",
  "M 60 110 C 170 114, 208 178, 350 192",
];

const BARS = [
  { y: 44, width: 236 },
  { y: 76, width: 172 },
  { y: 108, width: 288 },
  { y: 140, width: 132 },
  { y: 172, width: 210 },
];

/** Each ability carries its own geometry — data, futures, structure, execution. */
export function AbilityMotif({ ability }: { ability: AbilityId }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div className={styles.motif} ref={ref} data-on={inView} data-ability={ability} aria-hidden="true">
      <svg viewBox="0 0 400 220" className={styles.svg}>
        {ability === "LEARN" && (
          <g>
            {DOTS.map((dot, i) => (
              <circle
                key={i}
                cx={dot.x}
                cy={dot.y}
                r={dot.active ? 3.6 : 1.7}
                className={dot.active ? styles.dotActive : styles.dot}
                style={{ transitionDelay: `${(i % 8) * 40 + Math.floor(i / 8) * 90}ms` }}
              />
            ))}
            <line x1={24} x2={376} y1={0} y2={0} className={styles.scan} />
          </g>
        )}

        {ability === "PREDICT" && (
          <g>
            <circle cx={60} cy={110} r={5} className={styles.origin} />
            {BRANCHES.map((path, i) => (
              <g key={path}>
                <path
                  d={path}
                  className={styles.branch}
                  pathLength={1}
                  style={{ transitionDelay: `${i * 180}ms` }}
                />
                <circle
                  cx={350}
                  cy={[32, 82, 142, 192][i]}
                  r={i === 1 ? 4.5 : 2.5}
                  className={i === 1 ? styles.dotActive : styles.dot}
                  style={{ transitionDelay: `${600 + i * 180}ms` }}
                />
              </g>
            ))}
          </g>
        )}

        {ability === "DESIGN" && (
          <g>
            <rect x={92} y={24} width={216} height={172} className={styles.frame} pathLength={1} />
            <rect
              x={126}
              y={52}
              width={148}
              height={116}
              className={styles.frame}
              pathLength={1}
              style={{ transitionDelay: "220ms" }}
            />
            <circle
              cx={200}
              cy={110}
              r={62}
              className={styles.frame}
              pathLength={1}
              style={{ transitionDelay: "420ms" }}
            />
            <line x1={200} x2={200} y1={4} y2={216} className={styles.guide} pathLength={1} />
            <line x1={20} x2={380} y1={110} y2={110} className={styles.guide} pathLength={1} />
          </g>
        )}

        {ability === "EXECUTE" && (
          <g>
            {BARS.map((bar, i) => (
              <rect
                key={bar.y}
                x={40}
                y={bar.y}
                width={bar.width}
                height={5}
                className={styles.bar}
                style={{ transitionDelay: `${i * 130}ms` }}
              />
            ))}
            <path d="M 332 96 L 372 110 L 332 124 Z" className={styles.run} />
          </g>
        )}
      </svg>
    </div>
  );
}
