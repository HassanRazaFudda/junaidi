import "server-only";
import { z } from "zod";
import { Package, Season, Credential, Review, Video, SiteSettings } from "../schema";
import type { ContentRepository } from "../repository";
import { packages } from "./data/packages";
import { samplePackages } from "./data/packages.sample";
import { seasons } from "./data/seasons";
import { credentials } from "./data/credentials";
import { reviews } from "./data/reviews";
import { sampleReviews } from "./data/reviews.sample";
import { site } from "./data/site";
import { videos } from "./data/videos";
import { env } from "@/lib/env";

const isDemo = env.NEXT_PUBLIC_CONTENT_MODE === "demo";

// Parse once at module load: invalid content fails `next build`.
const P = [
  ...z.array(Package).parse(packages),
  ...(isDemo ? z.array(Package).parse(samplePackages) : []),
];
const S = z.array(Season).parse(seasons);
// fix.md §5.2: credentials are real, sourced numbers — never invented —
// but in demo mode they're shown even before the client confirms them in
// writing, labelled as pending rather than hidden, so the client can
// review the layout. Live mode keeps the stricter DECISIONS.md #3 gate.
const C = z
  .array(Credential)
  .parse(credentials)
  .filter((c) => isDemo || c.verifiedByClient);
const R = [
  ...z.array(Review).parse(reviews),
  ...(isDemo ? z.array(Review).parse(sampleReviews) : []),
];
const V = z
  .array(Video)
  .parse(videos)
  .filter((v) => v.openedAndReviewed);
const Site = SiteSettings.parse(site);

export const localAdapter: ContentRepository = {
  getSiteSettings: async () => Site,
  getCurrentHajjSeason: async () => S.find((s) => s.type === "hajj" && s.isCurrent) ?? null,
  getSeason: async (slug) => S.find((s) => s.slug === slug) ?? null,
  listPackages: async ({ type, season }) =>
    P.filter(
      (p) => p.type === type && p.status !== "draft" && (!season || p.seasonSlug === season),
    ),
  getPackage: async (type, slug) => P.find((p) => p.type === type && p.slug === slug) ?? null,
  listCredentials: async () => C,
  listReviews: async (limit = 6) =>
    [...R].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit),
  listVideos: async (f) => V.filter((v) => !f?.season || v.season === f.season),
};
