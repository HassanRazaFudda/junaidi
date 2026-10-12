"use client";
import { useEffect, useRef } from "react";

const SESSION_KEY = "junaidi-hero-played";

// design.md §7.2 "Home load": H1 lines rise from a mask (yPercent 100→0,
// stagger .06, expo.out, 0.9s); arch frame reveals bottom-up (clip-path
// inset(100% 0 0 0) → inset(0), 1.1s, power3.inOut, starts at 0.15s);
// actions fade in at 0.9s, 0.3s. "First visit per session" (sessionStorage
// guard below). Reduced motion: everything stays visible immediately — the
// SSR markup (hero.tsx) is already the fully visible version; this only
// ever hides-then-reveals it when motion is allowed, never the reverse
// (code.md §11.3: "never hide content in CSS waiting for JS").
export function HeroLoadSequenceEnhancer() {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sentinel.current?.closest<HTMLElement>("[data-hero]");
    if (!root) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");

    const h1 = root.querySelector<HTMLElement>(".hero-h1");
    const archReveal = root.querySelector<HTMLElement>(".hero-arch-reveal");
    const actions = root.querySelector<HTMLElement>(".hero-actions");
    if (!h1 || !archReveal || !actions) return;

    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
      ]);
      gsap.registerPlugin(SplitText);

      const ctx = gsap.context(() => {
        const split = SplitText.create(h1, { type: "lines", mask: "lines" });
        gsap.set(archReveal, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(actions, { autoAlpha: 0 });

        const tl = gsap.timeline();
        tl.from(split.lines, { yPercent: 100, stagger: 0.06, duration: 0.9, ease: "expo.out" })
          .to(
            archReveal,
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
            0.15,
          )
          .to(actions, { autoAlpha: 1, duration: 0.3 }, 0.9);
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return <div ref={sentinel} hidden />;
}
