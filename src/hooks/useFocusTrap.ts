import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';

/** Keeps Tab inside an open overlay and restores focus to the trigger on close. */
export function useFocusTrap(active: boolean, containerRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    const previous = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(container?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (element) => element.offsetParent !== null,
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [active, containerRef]);
}

/** Prevents the page behind an overlay from scrolling. */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    document.body.classList.add("is-locked");
    return () => document.body.classList.remove("is-locked");
  }, [active]);
}
