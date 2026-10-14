"use client";

import { useEffect, useRef } from "react";

const FORWARD_RATE = 0.4; // slower than the previous 0.6, per request
const REVERSE_RATE = 0.4; // same perceived pace going backward

// User asked for the hero background to be video instead of a still photo:
// slowed down, and playing in reverse once it reaches the end instead of
// hard-cutting back to the start (a boomerang/ping-pong loop). Same
// compliance bar as every hero photo before it (DECISIONS.md): verified
// frame-by-frame before approving — a high aerial of the Haram, crowd
// reads as texture/scale at this height, no individual identifiable,
// consistent from 0:00 through 0:10 of the clip.
//
// HTML5 <video> has no negative playbackRate — browsers reject it outright,
// there's no native "play backward". The standard workaround (and what
// this does) is manually stepping `currentTime` backward on
// requestAnimationFrame once the video ends, using real elapsed time
// between frames so the reverse speed stays consistent regardless of
// display refresh rate, then handing back to normal forward `.play()`
// once it's scrubbed back to 0.
//
// No `autoPlay` attribute, and the whole effect bails before touching
// anything if reduced motion is requested: the `poster` frame (the same
// already-approved aerial photo used as the static hero before this) is
// the permanent fallback for prefers-reduced-motion, not just a loading
// placeholder, matching how every other animation on this site works
// (code.md §11.3: never force motion).
export function HeroVideoBackground({ poster, videoSrc }: { poster: string; videoSrc: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number | null = null;
    let lastTimestamp: number | null = null;
    // Each currentTime write is a seek the browser has to decode toward.
    // Firing one every rAF tick outruns that on a streamed (not fully
    // buffered) MP4 — every new seek interrupts the last one before it
    // resolves, so the displayed frame just freezes instead of visibly
    // stepping backward (reads as "paused"). Gating on the element's own
    // seeking/seeked events means a step is only issued once the previous
    // one has actually landed — slower on a slow connection, never frozen.
    let seekPending = false;

    const handleSeeking = () => {
      seekPending = true;
    };
    const handleSeeked = () => {
      seekPending = false;
    };

    const stepReverse = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (!seekPending) {
        const next = video.currentTime - deltaSeconds * REVERSE_RATE;
        if (next <= 0) {
          video.currentTime = 0;
          lastTimestamp = null;
          video.playbackRate = FORWARD_RATE;
          void video.play().catch(() => {});
          return;
        }
        video.currentTime = next;
      }
      rafId = requestAnimationFrame(stepReverse);
    };

    const handleEnded = () => {
      lastTimestamp = null;
      rafId = requestAnimationFrame(stepReverse);
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);
    video.playbackRate = FORWARD_RATE;
    void video.play().catch(() => {
      // Autoplay can be rejected by the browser even when muted (rare,
      // policy-dependent) — the poster frame stays visible either way.
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <video
      ref={ref}
      // object-cover, not object-contain: contain shows the whole 16:9
      // frame with zero crop but puts visible bg-ink letterbox bars down
      // both sides of this much-wider hero box, which read as "boxed in"
      // rather than intentional. cover matches the full-bleed look every
      // other photo on this site uses. Applies to the poster frame too,
      // since poster is rendered by this same <video> element before
      // playback starts.
      className="size-full object-cover"
      poster={poster}
      muted
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
