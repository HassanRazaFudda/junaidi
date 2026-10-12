import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet";

export const buttonStyles: Record<Variant, string> = {
  primary: "bg-ink text-marble hover:bg-ink/90",
  secondary: "border border-ink text-ink hover:bg-ink/5",
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
