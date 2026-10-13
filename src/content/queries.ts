import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { repository } from "@/content/repository";
import { daysUntil, isPastDeadline } from "@/lib/season";
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

// Next's Cache Components model treats `Date.now()` as an unstable
// prerender-time value (same issue as the footer's copyright year —
// DECISIONS.md #5f), so the deadline countdown is resolved here, inside a
// cached function, rather than calling daysUntil()/isPastDeadline() with
// their Date.now() defaults directly in a page component.
export async function getSeasonDeadlineStatus(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("seasons", `season:${slug}`);
  const season = await repository.getSeason(slug);
  if (!season) return null;
  return {
    days: daysUntil(season.bookingDeadline),
    closed: isPastDeadline(season.bookingDeadline),
  } as const;
}

// DECISIONS.md #3: Season.credentialLine (the Hajj 2027 / Al Wakeel
// authorisation claim) only renders once the linked Credential record has
// verifiedByClient: true. This resolves that check so pages never have to
// reach into the Credential list themselves.
//
// Checks the credential's actual `verifiedByClient` field, not just its
// presence in listCredentials() — in demo mode (fix.md §5.2) that list
// includes every credential for layout review regardless of confirmation
// status, so "is it in the list" and "is it actually confirmed" are
// different questions once demo mode exists. Conflating them was a real
// bug: it made the hero and /hajj/2027 render the Al Wakeel authorisation
// claim as settled fact in demo mode, when it's still pending — caught via
// a screenshot review, not inspection, which is exactly why fix.md asks
// for screenshots after each step.
export async function isCredentialConfirmed(credentialId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("credentials");
  const creds = await repository.listCredentials();
  return creds.some((c) => c.id === credentialId && c.verifiedByClient);
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
