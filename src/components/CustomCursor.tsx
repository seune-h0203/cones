import { useEffect, useRef, useState } from "react";
import { usePointerFine, useReducedMotion } from "../hooks/useMedia";
import styles from "./overlays.module.css";

type CursorState = "default" | "view" | "play" | "drag";

const LABELS: Record<CursorState, string> = {
  default: "",
  view: "VIEW",
  play: "PLAY",
  drag: "DRAG",
};

/**
 * Minimal chrome cursor for precise pointers.
 * Elements opt in with data-cursor="view | play | drag".
 */
export function CustomCursor() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const position = { x: 0, y: 0 };
    let frame = 0;

    const paint = () => {
      frame = 0;
      const node = dotRef.current;
      if (node) node.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      position.x = event.clientX;
      position.y = event.clientY;
      if (!visible) setVisible(true);
      if (!frame) frame = window.requestAnimationFrame(paint);

      const target = event.target as HTMLElement | null;
      const holder = target?.closest<HTMLElement>("[data-cursor]");
      const next = (holder?.dataset.cursor as CursorState | undefined) ?? "default";
      setState((current) => (current === next ? current : next));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className={styles.cursor}
      data-state={state}
      data-visible={visible}
      aria-hidden="true"
    >
      <span className={styles.cursorDot} />
      {LABELS[state] && <span className={`u-mono ${styles.cursorLabel}`}>{LABELS[state]}</span>}
    </div>
  );
}
