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
import { UmrahCancellationNotice } from "@/components/package/umrah-cancellation-notice";
import { Faq } from "@/components/package/faq";
import { PackageJsonLd } from "@/components/seo/package-jsonld";
import { getPackage, listPackages, getSiteSettings } from "@/content/queries";
import { buildPackageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

// Same pattern as hajj/[season]/[slug]/page.tsx (code.md §6.2), minus the
// season segment — Umrah packages aren't tied to a government-run season
// the way Hajj 2027 is (there's no official portal/deadline concept for
// Umrah). Same placeholder-param reasoning for an empty
// generateStaticParams under Cache Components (see that file's comment).
const PLACEHOLDER_SLUG = "__placeholder__";

export async function generateStaticParams() {
  const pkgs = await listPackages({ type: "umrah" });
  if (pkgs.length === 0) {
    return routing.locales.map((locale) => ({ locale, slug: PLACEHOLDER_SLUG }));
  }
  return routing.locales.flatMap((locale) => pkgs.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (slug === PLACEHOLDER_SLUG) return {};
  const pkg = await getPackage("umrah", slug);
  return pkg ? buildPackageMetadata(pkg, locale as Locale) : {};
}

export default async function UmrahPackageDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (slug === PLACEHOLDER_SLUG) notFound();

  const [pkg, site] = await Promise.all([getPackage("umrah", slug), getSiteSettings()]);
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
        <UmrahCancellationNotice />
        <Faq faqs={pkg.faqs} locale={locale as Locale} />
      </Container>
    </Section>
  );
}
