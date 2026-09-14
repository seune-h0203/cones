import { useEffect, useRef, useState } from "react";
import { asset } from "../utils/asset";
import styles from "./BackgroundMusic.module.css";

/**
 * Landing-page theme music. Starts muted on mount (the only autoplay browsers
 * reliably allow) and the toggle button below is what actually unmutes it —
 * clicking is a real user gesture, so it's the one path guaranteed to work
 * across browsers that block unmuted autoplay.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    audioRef.current?.play().catch(() => {
      // Even muted autoplay can be blocked in rare cases — the toggle
      // button's click-driven play() call below still works.
    });
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    if (!next) audio.play().catch(() => {});
    setMuted(next);
  };

  return (
    <>
      <audio ref={audioRef} src={asset("audio/theme.mp3")} loop muted={muted} preload="auto" />
      <button
        type="button"
        className={`u-mono ${styles.toggle}`}
        onClick={toggle}
        aria-pressed={!muted}
        aria-label={muted ? "배경음악 켜기" : "배경음악 끄기"}
      >
        <span className={styles.icon} aria-hidden="true">
          {muted ? "♪" : "♫"}
        </span>
        {muted ? "SOUND OFF" : "SOUND ON"}
      </button>
    </>
  );
}
