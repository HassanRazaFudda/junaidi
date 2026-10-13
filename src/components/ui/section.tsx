import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// fix.md §3.2: sections separated by rhythm — 80px desktop / 56px mobile
// (v2/design.md §2.4 was 120px/72px; denser per this niche's expectations).
//
// noPaddingTop/noPaddingBottom exist because `className` can't reliably
// override this default: `py-(--spacing-s8) lg:py-(--spacing-s9)` uses
// Tailwind v4's `(--var)` arbitrary-property syntax, which tailwind-merge
// 3.7.0 doesn't recognise as conflicting with a later `pt-0`/`pb-0` in the
// same class list (confirmed via computed styles — the `py-*` rule still
// wins the cascade). Omitting the relevant utility entirely sidesteps that
// rather than fixing the shared `cn()` merge config, which every other
// `className` override in the app also depends on.
export function Section({
  className,
  noPaddingTop,
  noPaddingBottom,
  ...props
}: ComponentProps<"section"> & { noPaddingTop?: boolean; noPaddingBottom?: boolean }) {
  return (
    <section
      className={cn(
        !noPaddingTop && "pt-(--spacing-s8) lg:pt-(--spacing-s9)",
        !noPaddingBottom && "pb-(--spacing-s8) lg:pb-(--spacing-s9)",
        className,
      )}
      {...props}
    />
  );
}
