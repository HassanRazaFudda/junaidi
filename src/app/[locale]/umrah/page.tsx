import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { UmrahPackages } from "@/components/home/umrah-packages";
import { CtaBand } from "@/components/home/cta-band";
import { getSiteSettings } from "@/content/queries";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Umrah packages from Karachi",
    description:
      "Compare Junaidi's Umrah packages by month and tier: hotels, flights and visa included.",
  };
}

export default async function UmrahIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, site] = await Promise.all([getTranslations("packages"), getSiteSettings()]);

  return (
    <>
      <Section noPaddingBottom>
        <Container>
          <h1 className="font-display text-h1">{t("umrahHeading")}</h1>
        </Container>
      </Section>
      <UmrahPackages
        locale={locale as Locale}
        whatsappNumber={site.whatsappNumber}
        seeAllLink={false}
        noPaddingTop
      />
      <CtaBand />
    </>
  );
}
