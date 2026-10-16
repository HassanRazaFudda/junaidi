import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ServicePathways } from "@/components/home/service-pathways";
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

// Section order per new-fixes.md §16's homepage spec (Stage 4 of §23's
// roadmap): Hero, trust strip, service pathways, featured Umrah, Hajj
// 2027, Why Junaidi, past groups, hotels, testimonials, FAQs, final CTA.
// ServicePathways was the one section the spec names that didn't exist
// at all (DECISIONS.md #5z+8) — its "Other travel services" card anchor-
// links straight to ServicesCards (id="other-services"), which stays in
// its existing lower position rather than moving up next to
// ServicePathways: stacking two card-grid sections back to back, before
// any real Umrah/Hajj package content, would crowd the top of the page
// the spec is trying to simplify.
//
// The pinned route is gone for good (fix.md §3.2: it becomes a compact
// non-pinned stepper on /hajj/2027, fix.md §11 step 7 — not part of home
// at all any more). Every section below hides itself when it has
// nothing real/confirmed to show (and SiteFaq/WhyJunaidi are demo-mode-
// only) — there is deliberately no "pending" fallback anywhere here
// (fix.md §9.3).
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const site = await getSiteSettings();
  const l = locale as Locale;

  return (
    <>
      <Hero locale={l} whatsappNumber={site.whatsappNumber} />
      <TrustStrip locale={l} />
      <ServicePathways />
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
