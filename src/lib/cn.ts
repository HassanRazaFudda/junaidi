import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Plain `twMerge()` (no config) doesn't know this project's custom
// `@theme` tokens (globals.css) — it only recognises Tailwind's own
// built-in colour/size scale names when deciding which classes conflict.
// That silently broke real markup: `cn(buttonStyles.primary, "... text-small")`
// — i.e. `text-paper` (our custom colour) next to `text-small` (our custom
// font-size) — got merged down to just `text-small`, because tailwind-merge
// couldn't tell "paper" was a colour and "small" was a size, so it treated
// both as competing for a single `text-*` slot and kept only the later
// one. Caught via Lighthouse accessibility audit (color-contrast failure
// on PackageCard's "View" button; DECISIONS.md) and reproduced directly:
// the rendered className had `text-paper` missing entirely wherever it sat
// next to a custom `text-*` size class.
//
// Fix: tell tailwind-merge about every custom colour and font-size token
// from globals.css's `@theme` block, so it classifies `text-paper` as a
// colour and `text-small` as a size — two different groups, no conflict.
// Keep this list in sync with globals.css's `--color-*` / `--text-*`
// tokens when either changes.
const customColors = [
  "crimson",
  "crimson-night",
  "ink",
  "marble",
  "paper",
  "haze",
  "stone",
  "ok",
  "alert",
  "line",
  "whatsapp",
  "whatsapp-ink",
  "star",
];
const customFontSizes = [
  "display",
  "h1",
  "h2",
  "h3",
  "lead",
  "body",
  "small",
  "meta",
  "caption",
  "price",
];
const customRadii = ["control", "panel", "card"];
const customSpacing = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: customColors,
      text: customFontSizes,
      radius: customRadii,
      spacing: customSpacing,
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
