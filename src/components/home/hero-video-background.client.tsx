"use client";

import { useEffect, useRef } from "react";

// User asked for the hero background to be video instead of a still photo,
// slowed down and looping. Same compliance bar as every hero photo before
// it (DECISIONS.md): verified frame-by-frame before approving — a high
// aerial of the Haram, crowd reads as texture/scale at this height, no
// individual identifiable, consistent from 0:00 through 0:10 of the clip.
//
// No `autoPlay` attribute here on purpose: the `poster` frame (the same
// already-approved aerial photo used as the static hero before this) is
// the real fallback for prefers-reduced-motion, not just a loading
// placeholder — under reduced motion this component never calls `.play()`
// at all, so a user who needs that setting never sees the video move,
// full stop, matching how every other animation on this site works
// (code.md §11.3: never force motion, SSR/first-paint content is already
// complete on its own).
export function HeroVideoBackground({ poster, videoSrc }: { poster: string; videoSrc: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.playbackRate = 0.6;
    void video.play().catch(() => {
      // Autoplay can be rejected by the browser even when muted (rare,
      // policy-dependent) — the poster frame stays visible either way,
      // so there's nothing further to do here.
    });
  }, []);

  return (
    <video
      ref={ref}
      // The source clip is ~16:9; the hero box is much wider than that on
      // desktop, so object-cover scales the video up to match the box's
      // height and crops the sides. Tried object-contain (zero crop) first,
      // but that put visible bg-ink letterbox bars down both sides, which
      // read as "boxed in" rather than "zoomed out a little" — reverted.
      // object-cover stays, matching the full-bleed look every other photo
      // on this site uses; the crop itself is softened by trimming the
      // hero's own height (hero.tsx) instead, which needs less aggressive
      // upscaling to fill a shorter box. Applies to the poster frame too,
      // since poster is rendered by this same <video> element before
      // playback starts.
      className="size-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
