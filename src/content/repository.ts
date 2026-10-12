import "server-only";
import type { Package, Season, Credential, Review, SiteSettings, Video } from "./types";
import { localAdapter } from "./local/adapter";

export interface ContentRepository {
  getSiteSettings(): Promise<SiteSettings>;
  getCurrentHajjSeason(): Promise<Season | null>;
  getSeason(slug: string): Promise<Season | null>;
  listPackages(f: { type: Package["type"]; season?: string }): Promise<Package[]>;
  getPackage(type: Package["type"], slug: string): Promise<Package | null>;
  listCredentials(): Promise<Credential[]>;
  listReviews(limit?: number): Promise<Review[]>;
  listVideos(f?: { season?: string }): Promise<Video[]>;
}

// Swap point. Later: process.env.CONTENT_SOURCE === "payload" ? payloadAdapter : localAdapter
export const repository: ContentRepository = localAdapter;
