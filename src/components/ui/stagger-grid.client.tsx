"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

// fix.md §8 "Card grids": "Stagger in 60ms per card, once." Cards are
// Server Components (PackageCard does its own `await getTranslations()`),
// so they're rendered server-side into `items[].node` and handed to this
// client wrapper as already-built nodes — this only ever toggles each
// item's opacity/position via `variants`, it never re-renders a card.
export function StaggerGrid({
  items,
  className,
  itemClassName,
}: {
  items: { id: string; node: ReactNode }[];
  className?: string;
  /** e.g. "shrink-0 w-[85vw] snap-start" for a horizontal snap-scroll row instead of a grid. */
  itemClassName?: string;
}) {
  return (
    <m.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className={className}
    >
      {items.map((i) => (
        <m.li key={i.id} variants={item} className={itemClassName}>
          {i.node}
        </m.li>
      ))}
    </m.ul>
  );
}
