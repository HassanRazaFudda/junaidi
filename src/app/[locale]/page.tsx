import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { ServicesIndex } from "@/components/home/services-index";
import { CredentialsSection } from "@/components/home/credentials-section";
import { PackagesPreview } from "@/components/home/packages-preview";
import { PastGroups } from "@/components/home/past-groups";
import { Reviews } from "@/components/home/reviews";
import { Office } from "@/components/home/office";
import { getSiteSettings } from "@/content/queries";
import type { Locale } from "@/i18n/routing";

// fix.md §3.2/§9.1: the pinned route is removed from home (it becomes a
// compact non-pinned stepper on /hajj/2027 — fix.md §11 step 7). This
// ordering is a Step 1 quick fix; the full v3 section order (fix.md §7)
// lands in Step 5.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const site = await getSiteSettings();

  return (
    <>
      <Hero locale={locale as Locale} whatsappNumber={site.whatsappNumber} />
      <ServicesIndex />
      <CredentialsSection locale={locale as Locale} />
      <PackagesPreview locale={locale as Locale} />
      <PastGroups locale={locale as Locale} />
      <Reviews locale={locale as Locale} />
      <Office />
    </>
  );
}
