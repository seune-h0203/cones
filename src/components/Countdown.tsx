import { DEBUT_DATE, DEBUT_LABEL } from "../data/site";
import { pad, useCountdown } from "../hooks/useCountdown";
import styles from "./Countdown.module.css";

interface Props {
  variant?: "hero" | "inline" | "chip";
}

export function Countdown({ variant = "inline" }: Props) {
  const { days, hours, minutes, seconds, isLive } = useCountdown(DEBUT_DATE);

  if (variant === "chip") {
    return (
      <span className={`u-mono ${styles.chip}`}>
        {isLive ? "D-DAY" : `D-${days}`}
      </span>
    );
  }

  if (isLive) {
    return (
      <div className={styles.root} data-variant={variant} data-live="true">
        <p className={`u-display ${styles.dday}`}>D-DAY</p>
        <p className={`u-kicker ${styles.live}`}>CONNECTION : 00 — NOW LIVE</p>
      </div>
    );
  }

  const units = [
    { value: String(days), label: "DAYS" },
    { value: pad(hours), label: "HRS" },
    { value: pad(minutes), label: "MIN" },
    { value: pad(seconds), label: "SEC" },
  ];

  return (
    <div
      className={styles.root}
      data-variant={variant}
      role="timer"
      aria-label={`DEBUT SHOWCASE ${DEBUT_LABEL}까지 ${days}일 남았습니다`}
    >
      <div className={styles.units} aria-hidden="true">
        {units.map((unit, i) => (
          <div className={styles.unit} key={unit.label}>
            <span className={`u-mono ${styles.value}`}>{unit.value}</span>
            <span className={styles.label}>{unit.label}</span>
            {i < units.length - 1 && <span className={styles.divider} />}
          </div>
        ))}
      </div>
    </div>
  );
}
