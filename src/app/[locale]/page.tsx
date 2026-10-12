import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { ServicesIndex } from "@/components/home/services-index";
import { CredentialsSection } from "@/components/home/credentials-section";
import { ManasikRoute } from "@/components/route/manasik-route";
import { PackagesPreview } from "@/components/home/packages-preview";
import { PastGroups } from "@/components/home/past-groups";
import { Reviews } from "@/components/home/reviews";
import { Office } from "@/components/home/office";
import { getSiteSettings } from "@/content/queries";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1: season strip (layout.tsx) → hero → services index →
// credentials → the route → packages preview → past groups → reviews →
// office → footer (layout.tsx).
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const site = await getSiteSettings();

  return (
    <>
      <Hero locale={locale as Locale} whatsappNumber={site.whatsappNumber} />
      <ServicesIndex />
      <CredentialsSection locale={locale as Locale} />
      <ManasikRoute />
      <PackagesPreview locale={locale as Locale} />
      <PastGroups locale={locale as Locale} />
      <Reviews locale={locale as Locale} />
      <Office />
    </>
  );
}
