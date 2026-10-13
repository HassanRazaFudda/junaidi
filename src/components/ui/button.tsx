import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "quiet";

// fix.md §3.2/§3.3: "Primary CTA in crimson... secondary ghost white on
// dark / ink outline on light. WhatsApp button in WhatsApp green #25D366
// (with ink text #0B3D2E)." v2 had primary in ink with crimson only as a
// line (DECISIONS.md #1) — v3 moves the brand-red fill to the primary
// action itself, per the client's own feedback that the site needed to
// read unambiguously as this niche's vocabulary.
export const buttonStyles: Record<Variant, string> = {
  primary: "bg-crimson text-paper hover:bg-crimson/90",
  secondary: "border border-ink text-ink hover:bg-ink/5", // on light (marble/paper) sections
  ghost: "border border-paper text-paper hover:bg-paper/10", // on dark (ink) sections
  whatsapp: "bg-whatsapp text-whatsapp-ink hover:bg-whatsapp/90",
  quiet: "text-crimson underline underline-offset-4 hover:no-underline",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-5 font-medium transition-colors duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        buttonStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
