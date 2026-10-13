import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// fix.md §3.2: sections separated by rhythm — 80px desktop / 56px mobile
// (v2/design.md §2.4 was 120px/72px; denser per this niche's expectations).
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-(--spacing-s8) lg:py-(--spacing-s9)", className)} {...props} />;
}
