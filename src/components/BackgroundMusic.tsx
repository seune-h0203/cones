import { useEffect, useState } from "react";
import styles from "./BackgroundMusic.module.css";

const AUDIO_ID = "cones-theme";

function getThemeAudio(): HTMLAudioElement | null {
  return document.getElementById(AUDIO_ID) as HTMLAudioElement | null;
}

/**
 * Controls for the landing-page theme song — but doesn't own the <audio>
 * element itself. That lives as a static tag in index.html and starts
 * trying to play the instant the raw HTML parses (see the inline script
 * there), well before this component's own JS bundle can fetch, parse and
 * mount. This just adopts that element by id and reflects/drives its
 * play state; App.tsx's LandingMusic pauses it on navigation away from "/".
 */
export function BackgroundMusic() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = getThemeAudio();
    if (!audio) return;

    const sync = () => setPlaying(!audio.paused);
    sync();
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);

    // Covers the case where the page-load attempt in index.html was
    // blocked and no interaction has happened yet by the time this
    // mounts — harmless no-op if it's already playing.
    audio.play().catch(() => {});

    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
    };
  }, []);

  const toggle = () => {
    const audio = getThemeAudio();
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
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
  );
}
