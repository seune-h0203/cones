import { useEffect, useRef, useState } from "react";

/**
 * Progress (0 → 1) of a tall section scrolling past a sticky stage.
 * rAF-throttled so scroll handling never blocks the main thread.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      const scrolled = -rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / distance)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/** Maps a value from one range to another, clamped. */
export function mapRange(value: number, inMin: number, inMax: number, outMin = 0, outMax = 1) {
  const t = (value - inMin) / (inMax - inMin);
  return Math.min(Math.max(outMin + t * (outMax - outMin), Math.min(outMin, outMax)), Math.max(outMin, outMax));
}
