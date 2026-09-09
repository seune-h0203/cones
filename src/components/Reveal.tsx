import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface Props {
  children: ReactNode;
  className?: string;
  /** stagger in milliseconds */
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`u-reveal ${className}`.trim()}
      data-inview={inView}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
