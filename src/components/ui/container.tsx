import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// fix.md §3.2: "content width 1240px" (v2 was 1280px, design.md §2.4).
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 lg:px-6", className)} {...props} />;
}
