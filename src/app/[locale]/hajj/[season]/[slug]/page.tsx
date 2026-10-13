import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PackageHeader } from "@/components/package/package-header";
import { StayBlock } from "@/components/package/stay-block";
import { TravelBlock } from "@/components/package/travel-block";
import { InclusionsList } from "@/components/package/inclusions-list";
import { Itinerary } from "@/components/package/itinerary";
import { BookingSteps } from "@/components/package/booking-steps";
import { CancellationNotice } from "@/components/package/cancellation-notice";
import { Faq } from "@/components/package/faq";
import { PackageJsonLd } from "@/components/seo/package-jsonld";
import { getPackage, listPackages, getSiteSettings } from "@/content/queries";
import { buildPackageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

// code.md §6.2 pattern. Zero live packages exist in Phase 1 (DECISIONS.md
// #5) — but Next's Cache Components model refuses to build a dynamic route
// whose generateStaticParams returns an empty array (it can't validate the
// route has no unguarded dynamic access without at least one param to
// render against: https://nextjs.org/docs/messages/empty-generate-static-params).
// The docs' own documented fix for "no real values exist yet" is a
// placeholder param that 404s immediately — never a real, crawlable,
// invented route. The moment real packages exist, this reverts to mapping
// over listPackages() like every other generateStaticParams in this repo.
const PLACEHOLDER_SLUG = "__placeholder__";

export async function generateStaticParams() {
  const pkgs = await listPackages({ type: "hajj" });
  if (pkgs.length === 0) {
    return routing.locales.map((locale) => ({ locale, season: "2027", slug: PLACEHOLDER_SLUG }));
  }
  return routing.locales.flatMap((locale) =>
    pkgs.map((p) => ({ locale, season: p.seasonSlug, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (slug === PLACEHOLDER_SLUG) return {};
  const pkg = await getPackage("hajj", slug);
  return pkg ? buildPackageMetadata(pkg, locale as Locale) : {};
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ locale: string; season: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (slug === PLACEHOLDER_SLUG) notFound();

  const [pkg, site] = await Promise.all([getPackage("hajj", slug), getSiteSettings()]);
  if (!pkg || pkg.status === "draft") notFound();

  return (
    <Section>
      <PackageJsonLd pkg={pkg} locale={locale as Locale} />
      <Container className="max-w-3xl space-y-12">
        <PackageHeader pkg={pkg} locale={locale as Locale} whatsappNumber={site.whatsappNumber} />
        <StayBlock pkg={pkg} locale={locale as Locale} />
        <TravelBlock pkg={pkg} />
        <InclusionsList
          included={pkg.included}
          notIncluded={pkg.notIncluded}
          locale={locale as Locale}
        />
        <Itinerary itinerary={pkg.itinerary} locale={locale as Locale} />
        {pkg.officialBookingUrl && (
          <BookingSteps portalUrl={pkg.officialBookingUrl} id="how-booking-works" />
        )}
        {pkg.officialBookingUrl && <CancellationNotice portalUrl={pkg.officialBookingUrl} />}
        <Faq faqs={pkg.faqs} locale={locale as Locale} />
      </Container>
    </Section>
  );
}
