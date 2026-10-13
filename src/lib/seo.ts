import "server-only";
import type { Metadata } from "next";
import { env } from "@/lib/env";
import { pick } from "@/content/localize";
import type { Package } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export function buildPackageMetadata(pkg: Package, locale: Locale): Metadata {
  const title = `${pick(pkg.title, locale)} — ${pick(pkg.seasonLabel, locale)}`;
  const description = `${pkg.durationDays} days from ${pkg.departureCities.join(", ")}.${
    pkg.priceFromPKR ? ` From PKR ${pkg.priceFromPKR.toLocaleString("en-PK")}.` : ""
  }`;

  return {
    title,
    description,
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/hajj/${pkg.seasonSlug}/${pkg.slug}` },
  };
}
