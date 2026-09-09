import { Reveal } from "./Reveal";
import styles from "./SectionHeader.module.css";

interface Props {
  index?: string;
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  /** 1 when the section header doubles as the page title */
  level?: 1 | 2;
  /** tighter bottom margin when controls follow directly */
  compact?: boolean;
}

export function SectionHeader({
  index,
  kicker,
  title,
  lead,
  align = "left",
  level = 2,
  compact = false,
}: Props) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <Reveal className={styles.root}>
      <div data-align={align} data-compact={compact} className={styles.inner}>
        {(index || kicker) && (
          <p className={`u-kicker ${styles.meta}`}>
            {index && <span className={styles.index}>{index}</span>}
            {kicker}
          </p>
        )}
        <Heading className={`u-display ${styles.title}`}>{title}</Heading>
        {lead && <p className={`u-lead ${styles.lead}`}>{lead}</p>}
      </div>
    </Reveal>
  );
}
