"use client";
import { useEffect, useRef } from "react";

// code.md §11.3: the route section is server-rendered HTML (map SVG + all
// stop panels, fully readable). This tiny client enhancer loads GSAP only
// when the section approaches the viewport, on capable devices — never on
// mobile or reduced-motion, where the matchMedia check below bails out
// before any GSAP code is even requested.
export function ManasikRouteEnhancer({ stopIds }: { stopIds: readonly string[] }) {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sentinel.current?.closest<HTMLElement>("[data-route]");
    if (!root) return;

    const mq = matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 900px)");
    if (!mq.matches) return;

    let revert: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();

        void (async () => {
          const [{ gsap }, { ScrollTrigger }, { DrawSVGPlugin }] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
            import("gsap/DrawSVGPlugin"),
          ]);
          gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

          const ctx = gsap.context(() => {
            root.dataset.enhanced = "true"; // CSS switches from stacked layout to pinned layout
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: () => `+=${stopIds.length * 90}%`,
                pin: true,
                scrub: 0.6,
                snap: { snapTo: "labels", duration: 0.4, ease: "power1.inOut" },
                invalidateOnRefresh: true,
              },
            });

            for (const id of stopIds) {
              tl.addLabel(id)
                .fromTo(`#seg-${id}`, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1 })
                .to(`#pin-${id}`, { scale: 1, autoAlpha: 1, duration: 0.2 }, "<0.8")
                .to(`[data-panel="${id}"]`, { autoAlpha: 1, y: 0, duration: 0.3 }, "<")
                .to(
                  `[data-panel]:not([data-panel="${id}"])`,
                  { autoAlpha: 0, y: -12, duration: 0.2 },
                  "<",
                );

              if (id === "muzdalifah") {
                tl.to(
                  root,
                  {
                    "--route-bg": "var(--color-ink)",
                    "--route-ink": "var(--color-marble)",
                    duration: 0.5,
                  },
                  "<",
                );
              }
              if (id === "jamarat") {
                tl.to(
                  root,
                  {
                    "--route-bg": "var(--color-marble)",
                    "--route-ink": "var(--color-ink)",
                    duration: 0.5,
                  },
                  "<",
                );
              }
            }
          }, root);

          revert = () => {
            ctx.revert();
            delete root.dataset.enhanced;
          };
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
  }, [stopIds]);

  return <div ref={sentinel} hidden />;
}
