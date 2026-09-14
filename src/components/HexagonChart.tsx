import { useEffect, useState } from "react";
import type { HexagonStat } from "../data/hexagonStats";
import styles from "./HexagonChart.module.css";

const AXES = 6;
const SIZE = 760;
const CENTER = SIZE / 2;
const RADIUS = 210;
// Generous gap between the outer ring and the label anchor point: labels are
// Korean text ("맥시멀리스트력") that can run ~100+ user units wide, and
// `overflow: visible` means nothing clips it — the margin has to actually
// contain it instead, on every viewport the SVG gets scaled down to.
const LABEL_RADIUS = RADIUS + 55;
const GUIDE_LEVELS = [0.2, 0.4, 0.6, 0.8, 1];

/** Angle for axis `i` of `count`, starting at the top and running clockwise. */
function angleAt(i: number, count: number) {
  return (Math.PI * 2 * i) / count - Math.PI / 2;
}

function pointAt(i: number, count: number, fraction: number, radius = RADIUS) {
  const angle = angleAt(i, count);
  return {
    x: CENTER + Math.cos(angle) * radius * fraction,
    y: CENTER + Math.sin(angle) * radius * fraction,
  };
}

function polygonAt(count: number, fraction: number, radius = RADIUS) {
  return Array.from({ length: count }, (_, i) => {
    const p = pointAt(i, count, fraction, radius);
    return `${p.x},${p.y}`;
  }).join(" ");
}

function valuePolygon(stats: HexagonStat[]) {
  return stats
    .map((stat, i) => {
      const p = pointAt(i, stats.length, Math.min(stat.value, 100) / 100);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

/** Text anchor + vertical nudge so labels read outward from their vertex instead of overlapping it. */
function labelAnchor(i: number, count: number) {
  const angle = angleAt(i, count);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const anchor = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
  const dy = Math.abs(sin) < 0.2 ? "0.35em" : sin > 0 ? "0.9em" : "-0.4em";
  return { anchor, dy } as const;
}

/**
 * Minimal hexagon radar chart — six axes, MAX-100 outer ring, guide rings
 * beneath it, and a value polygon that expands from the center on mount.
 * `key`ing this per artist (see ArtistProfileModal) restarts the reveal.
 */
export function HexagonChart({ stats }: { stats: HexagonStat[] }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={styles.wrap}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={styles.svg} role="img" aria-label="캐릭터 지수 육각형 차트">
        {GUIDE_LEVELS.map((level) => (
          <polygon
            key={level}
            points={polygonAt(AXES, level)}
            className={level === 1 ? styles.guideOuter : styles.guideInner}
          />
        ))}

        {stats.map((_, i) => {
          const p = pointAt(i, AXES, 1);
          return <line key={i} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} className={styles.axisLine} />;
        })}

        <g className={styles.valueGroup} data-on={revealed}>
          <polygon points={valuePolygon(stats)} className={styles.valuePolygon} />
          {stats.map((stat, i) => {
            const p = pointAt(i, stats.length, Math.min(stat.value, 100) / 100);
            return <circle key={i} cx={p.x} cy={p.y} r={4.5} className={styles.point} />;
          })}
        </g>

        {stats.map((stat, i) => {
          const p = pointAt(i, stats.length, 1, LABEL_RADIUS);
          const { anchor, dy } = labelAnchor(i, stats.length);
          return (
            <text key={stat.label} x={p.x} y={p.y} dy={dy} textAnchor={anchor} className={styles.label}>
              <tspan fontSize={15}>{stat.label}</tspan>
              <tspan x={p.x} dy="1.25em" fontSize={13} className={styles.labelValue}>
                {stat.value}
              </tspan>
            </text>
          );
        })}
      </svg>
      <p className={`u-mono ${styles.caption}`}>HEXAGON INDEX / MAX 100</p>
    </div>
  );
}
