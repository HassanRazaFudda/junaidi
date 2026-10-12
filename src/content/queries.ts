import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { repository } from "@/content/repository";
import type { Locale } from "@/i18n/routing";
import type { Package } from "@/content/types";

export async function getSiteSettings() {
  "use cache";
  cacheLife("max");
  cacheTag("site");
  return repository.getSiteSettings();
}

export async function getSeasonBanner(locale: Locale) {
  "use cache";
  cacheLife("hours");
  cacheTag("seasons");
  const season = await repository.getCurrentHajjSeason();
  if (!season || Date.now() > Date.parse(season.bookingDeadline)) return null;
  return {
    message: season.stripMessage[locale] ?? season.stripMessage.en,
    href: `/hajj/${season.slug}`,
  } as const;
}

export async function getCurrentHajjSeason() {
  "use cache";
  cacheLife("hours");
  cacheTag("seasons");
  return repository.getCurrentHajjSeason();
}

export async function getSeason(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("seasons", `season:${slug}`);
  return repository.getSeason(slug);
}

// DECISIONS.md #3: Season.credentialLine (the Hajj 2027 / Al Wakeel
// authorisation claim) only renders once the linked Credential record has
// verifiedByClient: true. This resolves that check so pages never have to
// reach into the Credential list themselves.
export async function isCredentialConfirmed(credentialId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("credentials");
  const creds = await repository.listCredentials();
  return creds.some((c) => c.id === credentialId);
}

export async function getPackage(type: Package["type"], slug: string) {
  "use cache";
  cacheLife("max");
  cacheTag("packages", `package:${type}:${slug}`);
  return repository.getPackage(type, slug);
}

export async function listPackages(filter: { type: Package["type"]; season?: string }) {
  "use cache";
  cacheLife("max");
  cacheTag("packages");
  return repository.listPackages(filter);
}

export async function listCredentials() {
  "use cache";
  cacheLife("hours");
  cacheTag("credentials");
  return repository.listCredentials();
}

export async function listReviews(limit?: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("reviews");
  return repository.listReviews(limit);
}

export async function listVideos(f?: { season?: string }) {
  "use cache";
  cacheLife("max");
  cacheTag("videos");
  return repository.listVideos(f);
}
