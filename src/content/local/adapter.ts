import "server-only";
import { z } from "zod";
import { Package, Season, Credential, Review, Video, SiteSettings } from "../schema";
import type { ContentRepository } from "../repository";
import { packages } from "./data/packages";
import { seasons } from "./data/seasons";
import { credentials } from "./data/credentials";
import { reviews } from "./data/reviews";
import { site } from "./data/site";
import { videos } from "./data/videos";

// Parse once at module load: invalid content fails `next build`.
const P = z.array(Package).parse(packages);
const S = z.array(Season).parse(seasons);
const C = z
  .array(Credential)
  .parse(credentials)
  .filter((c) => c.verifiedByClient);
const R = z.array(Review).parse(reviews);
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
