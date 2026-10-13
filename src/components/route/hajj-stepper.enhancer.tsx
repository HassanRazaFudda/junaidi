"use client";
import { useEffect, useRef } from "react";

// fix.md §8 "Hajj page stepper": "Line fills as you scroll past (no pin),
// steps light up." GSAP ScrollTrigger, scrub — trigger is the compact
// track itself (not the whole section), so this plays as a short flourish
// while the track crosses the viewport, independent of the longer detail
// list below it. The SSR markup (hajj-stepper.tsx) is already the fully
// accessible version — every dot is a real jump link, every step's detail
// is already visible — this only adds the scroll-linked colour animation
// on top, desktop + motion-allowed only (the track itself is `hidden` on
// mobile already, same media-query gate as ManasikRouteEnhancer used).
const CRIMSON = "#a00c20";

export function HajjStepperEnhancer({ stepIds }: { stepIds: readonly string[] }) {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sentinel.current?.closest<HTMLElement>("[data-hajj-stepper]");
    if (!root) return;

    const mq = matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 768px)");
    if (!mq.matches) return;

    const track = root.querySelector<HTMLElement>(".hajj-stepper-track");
    const fill = root.querySelector<HTMLElement>(".hajj-stepper-fill");
    if (!track || !fill) return;

    let revert: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();

        void (async () => {
          const [{ gsap }, { ScrollTrigger }] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);
          gsap.registerPlugin(ScrollTrigger);

          const ctx = gsap.context(() => {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: track, start: "top 75%", end: "bottom 25%", scrub: 0.6 },
            });

            tl.fromTo(fill, { width: "0%" }, { width: "100%", ease: "none" }, 0);

            stepIds.forEach((id, i) => {
              const link = track.querySelector<HTMLElement>(`a[href="#hajj-step-${id}"]`);
              const dot = link?.querySelector<HTMLElement>(".hajj-stepper-dot");
              const label = link?.querySelector<HTMLElement>(".hajj-stepper-label");
              if (!dot || !label) return;
              const position = stepIds.length > 1 ? i / (stepIds.length - 1) : 0;
              tl.to(dot, { backgroundColor: CRIMSON, duration: 0.01 }, position).to(
                label,
                { color: CRIMSON, duration: 0.01 },
                position,
              );
            });
          }, root);

          revert = () => ctx.revert();
        })();
      },
      { rootMargin: "50% 0px" },
    );

    io.observe(root);
    const onChange = () => revert?.();
    mq.addEventListener("change", onChange);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", onChange);
      revert?.();
    };
  }, [stepIds]);

  return <div ref={sentinel} hidden />;
}
