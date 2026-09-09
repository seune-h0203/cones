import { useEffect, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function measure(target: Date): Countdown {
  const remaining = target.getTime() - Date.now();

  if (remaining <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  const seconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    isLive: false,
  };
}

/** Live countdown driven by the visitor's own clock. Never returns negatives. */
export function useCountdown(target: Date): Countdown {
  const [state, setState] = useState(() => measure(target));

  useEffect(() => {
    setState(measure(target));
    if (measure(target).isLive) return;

    const id = window.setInterval(() => {
      const next = measure(target);
      setState(next);
      if (next.isLive) window.clearInterval(id);
    }, 1000);

    return () => window.clearInterval(id);
  }, [target]);

  return state;
}

export const pad = (value: number): string => value.toString().padStart(2, "0");
