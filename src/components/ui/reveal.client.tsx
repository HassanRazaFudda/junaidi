"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

// fix.md §8 "Section headings": "Eyebrow + H2 fade-up 16px once when 20%
// visible." `whileInView` + `once: true` only ever adds a transform/opacity
// via JS at animation time — the children are the real server-rendered
// markup underneath, fully visible without this wrapper (code.md §11.3).
// MotionConfig's app-wide `reducedMotion="user"` makes this a no-op
// (instant, final state) under reduced motion with no extra check here.
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
}
