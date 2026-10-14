"use client";

import type { ReactNode } from "react";

// fix.md §8 "Past groups carousel" originally asked for a manual
// Motion `drag="x"` carousel (momentum + snap) — fine when it rendered
// zero cards (every video still gated on human review). Now that 5 real
// videos render (DECISIONS.md #5z+1), only ~3.5 cards fit in the
// viewport and nothing hinted the rest existed off-screen. Switched to
// the trust strip's auto-sliding marquee pattern instead (globals.css's
// `.trust-strip-track`): continuous CSS animation, paused on hover so a
// visitor can read a title or click into a video, content duplicated
// once for a seamless loop.
//
// Unlike the trust strip's duplicate (plain text links), each duplicated
// item here is a real YoutubeFacade <button> — `aria-hidden` alone hides
// it from assistive tech but leaves it reachable by Tab, a genuine
// WCAG 4.1.2 violation axe caught in e2e (`tests/e2e/a11y.spec.ts`):
// "Focusable content should be disabled or be removed from the DOM".
// `inert` fixes both at once: out of the accessibility tree and out of
// the tab order, in one standard HTML attribute.
export function PastGroupsCarousel({ items }: { items: { id: string; node: ReactNode }[] }) {
  return (
    <div className="past-groups-wrap mt-6 min-w-0 overflow-hidden">
      <div className="past-groups-track flex w-max gap-4 pb-2">
        <div className="flex shrink-0 gap-4">
          {items.map((i) => (
            <div key={i.id} className="shrink-0">
              {i.node}
            </div>
          ))}
        </div>
        <div className="past-groups-copy flex shrink-0 gap-4" aria-hidden inert>
          {items.map((i) => (
            <div key={i.id} className="shrink-0">
              {i.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
