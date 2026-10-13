import type { MetadataRoute } from "next";
import { listPackages } from "@/content/queries";
import { env } from "@/lib/env";

// code.md §13: reads from the repository (live packages, seasons, guides);
// archived packages stay in the sitemap with lower priority. Phase 1 has
// zero live packages (DECISIONS.md #5), so the package loop below
// contributes nothing yet — it activates automatically once real packages
// exist, with zero code changes.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL;
  const packages = await listPackages({ type: "hajj" });

  return [
    { url: base, priority: 1 },
    { url: `${base}/hajj/2027`, priority: 0.9 },
    { url: `${base}/hajj/how-private-hajj-booking-works`, priority: 0.8 },
    { url: `${base}/about/credentials`, priority: 0.6 },
    { url: `${base}/contact`, priority: 0.6 },
    { url: `${base}/privacy`, priority: 0.2 },
    { url: `${base}/terms`, priority: 0.2 },
    { url: `${base}/cancellation-policy`, priority: 0.2 },
    { url: `${base}/complaints`, priority: 0.2 },
    ...packages.map((p) => ({
      url: `${base}/hajj/${p.seasonSlug}/${p.slug}`,
      priority: p.status === "archived" ? 0.3 : 0.8,
    })),
  ];
}
