import { env } from "@/lib/env";

// fix.md §5.1: "A thin top banner on staging: 'Review build: sample
// packages and photos for layout only.'" Renders nothing in live mode.
export function DemoBanner() {
  if (env.NEXT_PUBLIC_CONTENT_MODE !== "demo") return null;

  return (
    <div className="bg-alert py-1 text-center text-caption text-marble">
      Review build: sample packages and photos for layout only.
    </div>
  );
}
