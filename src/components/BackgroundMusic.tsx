import { useEffect, useRef, useState } from "react";
import { asset } from "../utils/asset";
import styles from "./BackgroundMusic.module.css";

const UNLOCK_EVENTS = ["pointerdown", "keydown", "touchstart", "wheel"] as const;

/**
 * Landing-page theme music, playing with sound as close to "on load" as
 * browsers allow. Autoplay with audio is blocked without a user gesture in
 * most browsers, so this tries unmuted playback immediately and, if that's
 * rejected, arms a one-time listener on the very first interaction anywhere
 * on the page (click, key, scroll, touch) to start it — the visitor never
 * has to find or press the music button themselves. The button is a manual
 * stop/resume toggle for whoever wants to turn it off.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let cancelled = false;

    const unlock = () => {
      if (cancelled) return;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    audio.play().then(() => setPlaying(true)).catch(() => {
      UNLOCK_EVENTS.forEach((event) => window.addEventListener(event, unlock, { once: true }));
    });

    return () => {
      cancelled = true;
      UNLOCK_EVENTS.forEach((event) => window.removeEventListener(event, unlock));
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={asset("audio/theme.mp3")} loop preload="auto" />
      <button
        type="button"
        className={`u-mono ${styles.toggle}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "배경음악 정지" : "배경음악 재생"}
      >
        <span className={styles.icon} aria-hidden="true">
          {playing ? "♫" : "♪"}
        </span>
        {playing ? "STOP" : "PLAY"}
      </button>
    </>
  );
}
