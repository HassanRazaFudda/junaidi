"use client";

import { useRef, type ReactNode } from "react";
import * as m from "motion/react-m";

// fix.md §8 "Past groups carousel": "Drag with momentum, snap." Motion's
// `drag="x"` + `dragConstraints` against the wrapper ref gives click-and-
// drag on desktop (the previous `overflow-x-auto` only supported trackpad/
// scrollbar/touch, not a mouse drag) with its own built-in inertia on
// release. Precise snap-to-card targets would need measuring each card's
// width/gap and animating to the nearest multiple on drag end — left as a
// reasonable simplification for a carousel that currently renders zero
// cards (every video is still gated on human review, DECISIONS.md #5t);
// momentum deceleration alone already reads as a carousel, not a loose
// scroll area.
export function PastGroupsCarousel({ items }: { items: { id: string; node: ReactNode }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={trackRef} className="mt-6 overflow-hidden">
      <m.div
        className="flex cursor-grab gap-4 pb-2 active:cursor-grabbing"
        drag="x"
        dragConstraints={trackRef}
        dragElastic={0.12}
      >
        {items.map((i) => (
          <div key={i.id} className="shrink-0">
            {i.node}
          </div>
        ))}
      </m.div>
    </div>
  );
}
