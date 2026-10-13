"use client";
import { useEffect, useRef } from "react";

const SESSION_KEY = "junaidi-hero-played";

// fix.md §8 "Hero load"/"Hero scroll" rows. The SSR markup (hero.tsx) is
// already the fully visible version; this only ever hides-then-reveals it
// when motion is allowed (code.md §11.3: "never hide content in CSS
// waiting for JS" — every initial/hidden state below is set here, in JS,
// not in a stylesheet). Two independent pieces, gated separately:
//   - the load-in timeline plays once per session (sessionStorage guard)
//   - the scroll parallax/darken keeps working on every visit, including
//     repeat visits within the same session where the load-in is skipped
//
// All dynamic plugin imports are awaited up front, before the single
// `gsap.context()` call — everything that call creates (ScrollTriggers,
// the load-in timeline, the SplitText instance) is then tracked by the one
// `ctx`, so `ctx.revert()` on unmount cleans all of it up. Building part of
// the animation inside a `.then()` after `gsap.context()` has already
// returned would create GSAP instances the context never knew about.
export function HeroLoadSequenceEnhancer() {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sentinel.current?.closest<HTMLElement>("[data-hero]");
    if (!root) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bg = root.querySelector<HTMLElement>(".hero-bg");
    const overlayScroll = root.querySelector<HTMLElement>(".hero-overlay-scroll");
    if (!bg || !overlayScroll) return;

    const playLoadIn = !sessionStorage.getItem(SESSION_KEY);
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }, splitTextModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        playLoadIn ? import("gsap/SplitText") : Promise.resolve(null),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      if (splitTextModule) gsap.registerPlugin(splitTextModule.SplitText);

      const ctx = gsap.context(() => {
        // "Hero scroll": background parallax 15% (desktop only), overlay
        // darkens slightly — runs on every visit, not session-gated.
        if (matchMedia("(min-width: 1024px)").matches) {
          gsap.to(bg, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
          });
        }
        gsap.set(overlayScroll, { autoAlpha: 0 });
        gsap.to(overlayScroll, {
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });

        // "Hero load": first visit per session only.
        if (playLoadIn && splitTextModule) {
          sessionStorage.setItem(SESSION_KEY, "1");

          const talbiyah = root.querySelector<HTMLElement>(".hero-talbiyah");
          const h1 = root.querySelector<HTMLElement>(".hero-h1");
          const sub = root.querySelector<HTMLElement>(".hero-sub");
          const actions = root.querySelector<HTMLElement>(".hero-actions");
          const inquiry = root.querySelector<HTMLElement>(".hero-inquiry");

          if (talbiyah && h1 && sub && actions && inquiry) {
            const split = splitTextModule.SplitText.create(h1, { type: "lines", mask: "lines" });
            gsap.set(bg, { scale: 1.08 });

            const tl = gsap.timeline();
            tl.to(bg, { scale: 1, duration: 1.6, ease: "power2.out" }, 0)
              .from(talbiyah, { y: 16, autoAlpha: 0, duration: 0.6 }, 0)
              .from(
                split.lines,
                { yPercent: 100, stagger: 0.06, duration: 0.9, ease: "expo.out" },
                0.08,
              )
              .from(sub, { y: 16, autoAlpha: 0, duration: 0.6 }, 0.16)
              .from(actions, { y: 16, autoAlpha: 0, duration: 0.6 }, 0.24)
              .from(inquiry, { y: 16, autoAlpha: 0, duration: 0.6 }, 0.32);
          }
        }
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return <div ref={sentinel} hidden />;
}
