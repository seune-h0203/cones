import { useEffect, useRef, useState } from "react";
import type { TeaserSource } from "../hooks/useTeaser";
import { useIsMobile, useReducedMotion } from "../hooks/useMedia";
import { asset } from "../utils/asset";
import styles from "./Teaser.module.css";

interface Props {
  source: TeaserSource;
  poster: string;
  title: string;
  /** play when scrolled into view, pause when it leaves */
  autoInView?: boolean;
  onPlay?: () => void;
  onComplete?: () => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/**
 * Cinematic teaser player: minimal chrome controls, viewport-driven playback,
 * and a poster fallback whenever the file or autoplay is unavailable.
 */
export function TeaserVideo({ source, poster, title, autoInView = true, onPlay, onComplete }: Props) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  const file = isMobile && source.mobile ? source.mobile : source.desktop;
  const src = asset(`videos/${file}`);

  useEffect(() => {
    setFailed(false);
    setCurrent(0);
  }, [src]);

  useEffect(() => {
    const node = containerRef.current;
    const video = videoRef.current;
    if (!node || !video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (autoInView && !reducedMotion) {
            // Muted inline playback only — a rejected promise simply leaves the poster up.
            video.play().catch(() => undefined);
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [autoInView, reducedMotion, src]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  };

  const seek = (value: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(duration) || duration === 0) return;
    video.currentTime = (value / 100) * duration;
  };

  const goFullscreen = () => {
    const node = containerRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void node.requestFullscreen?.();
    }
  };

  if (failed) {
    return (
      <div className={styles.fallback}>
        <img src={asset(poster)} alt={title} className={`u-photo ${styles.fallbackImage}`} />
        <p className={`u-kicker ${styles.fallbackNote}`}>TEASER UNAVAILABLE — POSTER MODE</p>
      </div>
    );
  }

  const percent = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className={styles.player} ref={containerRef} data-playing={playing}>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={asset(poster)}
        muted={muted}
        playsInline
        preload="metadata"
        aria-label={title}
        onPlay={() => {
          setPlaying(true);
          onPlay?.();
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => {
          setPlaying(false);
          onComplete?.();
        }}
        onError={() => setFailed(true)}
      />

      {!playing && (
        <button type="button" className={styles.bigPlay} onClick={toggle} data-cursor="play">
          <span className={styles.bigPlayIcon} aria-hidden="true" />
          <span className={`u-mono ${styles.bigPlayLabel}`}>PLAY TEASER</span>
        </button>
      )}

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={toggle}
          aria-label={playing ? "일시정지" : "재생"}
        >
          <span className="u-mono" aria-hidden="true">
            {playing ? "❙❙" : "▶"}
          </span>
        </button>

        <input
          type="range"
          className={styles.progress}
          min={0}
          max={100}
          step={0.1}
          value={percent}
          onChange={(event) => seek(Number(event.currentTarget.value))}
          aria-label="재생 위치"
        />

        <span className={`u-mono ${styles.time}`}>
          {formatTime(current)} / {formatTime(duration)}
        </span>

        <button
          type="button"
          className={`u-mono ${styles.control}`}
          onClick={() => setMuted((value) => !value)}
          aria-label={muted ? "소리 켜기" : "음소거"}
        >
          {muted ? "MUTED" : "SOUND"}
        </button>

        <button
          type="button"
          className={`u-mono ${styles.control}`}
          onClick={goFullscreen}
          aria-label="전체화면"
        >
          FULL
        </button>
      </div>
    </div>
  );
}
