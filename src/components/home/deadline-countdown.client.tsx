"use client";

import { useEffect, useRef } from "react";

// fix.md §8 "Hajj 2027 band": "Deadline number counts down from total to
// days left once (it's a real date, not a vanity stat)." `days` is the
// real, already-computed value from getSeasonDeadlineStatus — this only
// animates the on-screen digits counting down to it once, it never
// invents or extends the number itself. SSR renders the real number
// directly (no CSS-hidden state), so a no-JS/reduced-motion visitor sees
// the correct count immediately.
export function DeadlineCountdown({ days, totalDays }: { days: number; totalDays: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();

        void import("gsap").then(({ gsap }) => {
          const counter = { value: totalDays };
          const tween = gsap.to(counter, {
            value: days,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.value));
            },
          });
          cleanup = () => tween.kill();
        });
      },
      { rootMargin: "-20% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cleanup?.();
    };
  }, [days, totalDays]);

  return <span ref={ref}>{days}</span>;
}
