import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// design.md §2.4: 12-column grid, 1280px max, 20px page margin on mobile.
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 lg:px-6", className)} {...props} />;
}
