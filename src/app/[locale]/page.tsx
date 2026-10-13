import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { UmrahPackages } from "@/components/home/umrah-packages";
import { HajjBand } from "@/components/home/hajj-band";
import { WhyJunaidi } from "@/components/home/why-junaidi";
import { PastGroups } from "@/components/home/past-groups";
import { ServicesCards } from "@/components/home/services-cards";
import { Hotels } from "@/components/home/hotels";
import { Reviews } from "@/components/home/reviews";
import { SiteFaq } from "@/components/home/site-faq";
import { CtaBand } from "@/components/home/cta-band";
import { getSiteSettings } from "@/content/queries";
import type { Locale } from "@/i18n/routing";

// fix.md §7's full v3 section order. The pinned route is gone for good
// (fix.md §3.2: it becomes a compact non-pinned stepper on /hajj/2027,
// fix.md §11 step 7 — not part of home at all any more). Every section
// below hides itself when it has nothing real/confirmed to show (and
// SiteFaq/WhyJunaidi are demo-mode-only) — there is deliberately no
// "pending" fallback anywhere here (fix.md §9.3).
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const site = await getSiteSettings();
  const l = locale as Locale;

  return (
    <>
      <Hero locale={l} whatsappNumber={site.whatsappNumber} />
      <TrustStrip locale={l} />
      <UmrahPackages locale={l} whatsappNumber={site.whatsappNumber} />
      <HajjBand locale={l} whatsappNumber={site.whatsappNumber} />
      <WhyJunaidi />
      <PastGroups locale={l} />
      <ServicesCards />
      <Hotels />
      <Reviews locale={l} />
      <SiteFaq />
      <CtaBand />
    </>
  );
}
