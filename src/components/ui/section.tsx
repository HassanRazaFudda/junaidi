import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// design.md §2.4: sections separated by rhythm, not divider lines —
// 120px desktop / 72px mobile.
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-(--spacing-s8) lg:py-(--spacing-s9)", className)} {...props} />;
}
