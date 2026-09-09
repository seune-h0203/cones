import type { CSSProperties } from "react";
import { asset } from "../utils/asset";
import styles from "./LogoMark.module.css";

interface Props {
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  /** continuous chrome light sweep across the mark */
  shine?: boolean;
  /** breathing drop-shadow glow */
  glow?: boolean;
  /** breathing opacity pulse — used by the boot screen */
  pulse?: boolean;
  /** power-on wipe reveal on mount */
  reveal?: boolean;
  /** delay (ms) before the reveal animation starts */
  revealDelay?: number;
}

const SRC = "images/cones-logo.png";

/**
 * The CONES wordmark, rendered with an optional animated chrome shine.
 * The shine is a moving highlight gradient clipped to the logo's own alpha
 * shape (mask-image: url(logo)), so it reads as light sweeping across the
 * metal rather than a generic glowing box.
 */
export function LogoMark({
  alt,
  className = "",
  width = 1894,
  height = 336,
  loading = "eager",
  shine = true,
  glow = false,
  pulse = false,
  reveal = false,
  revealDelay = 0,
}: Props) {
  const src = asset(SRC);
  const style = revealDelay ? ({ "--logo-delay": `${revealDelay}ms` } as CSSProperties) : undefined;

  return (
    <span
      className={`${styles.mark} ${className}`}
      data-glow={glow}
      data-pulse={pulse}
      data-reveal={reveal}
      style={style}
    >
      <img src={src} alt={alt} className={styles.img} width={width} height={height} loading={loading} decoding="async" />
      {shine && (
        <span
          className={styles.shine}
          style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
