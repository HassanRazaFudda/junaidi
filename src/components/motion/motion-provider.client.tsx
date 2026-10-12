"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./motion-features").then((m) => m.default);

// code.md §11.2. `reducedMotion="user"` makes every m.* element respect
// prefers-reduced-motion automatically, without each component checking it.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
