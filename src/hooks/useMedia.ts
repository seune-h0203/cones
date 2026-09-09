import { useEffect, useState } from "react";

function useMediaQuery(query: string, initial = false): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? initial : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True only for precise pointers — gates cursor and parallax effects. */
export function usePointerFine(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
