import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { archivo, nastaliq, amiri } from "./fonts";
import { SkipLink } from "@/components/ui/skip-link";
import { MotionProvider } from "@/components/motion/motion-provider.client";
import { SeasonStrip } from "@/components/layout/season-strip";
import { HeaderClient } from "@/components/layout/header.client";
import { Footer } from "@/components/layout/footer";
import { StickyContactBar } from "@/components/layout/sticky-contact-bar";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp.client";
import { DemoBanner } from "@/components/layout/demo-banner";
import { getSiteSettings } from "@/content/queries";
import { TravelAgencyJsonLd } from "@/components/seo/travel-agency-jsonld";
import { env } from "@/lib/env";
import type { Locale } from "@/i18n/routing";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// prompt.md hard rule: "Every page prerendered. Keep
// `ensureStatic = 'navigation'` passing." code.md §6.1: "the build fails
// if any page in the site accidentally becomes dynamic." Set on the root
// locale layout so it applies to every route in the app.
export const ensureStatic = "navigation";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: "Junaidi Group", template: "%s · Junaidi Group" },
  // No Al Wakeel Munazzam / Hajj 2027 credential claim here — that's
  // unconfirmed and gated elsewhere (DECISIONS.md #3); this description
  // only states the one thing that's actually settled, the tagline itself.
  description: "Hajj and Umrah from Karachi, with a team that travels with you.",
};

// This was missing entirely — confirmed live via `curl | grep viewport`
// returning nothing. In the App Router, `viewport` is its own export
// (Next.js split it out of `metadata` years ago); defining a custom
// `metadata` object without a matching `viewport` export does not fall
// back to a sane default. Without this tag, mobile browsers render the
// page at a desktop-width virtual viewport (~980px) and scale it down —
// the screen itself never rotates (confirmed live), but the page becomes
// pannable sideways within it, and every `sm:`/`lg:` breakpoint evaluates
// against that fake ~980px width instead of the real device width. That's
// what was actually happening on the Hajj band's package carousel: real
// mobile width is ~390-440px, but the cards' `sm:w-80` fixed-width rule
// (meant for ≥640px) was firing anyway, because the browser's own
// virtual-viewport width goes past 640 despite the physical screen never
// doing so.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const site = await getSiteSettings();
  // `hasLocale` above narrows `locale` to the (currently single-member)
  // Locale type, so the comparison needs widening back to `string` first —
  // see DECISIONS.md #5c / src/content/localize.ts for why "ur" still
  // needs to type-check here ahead of Phase 2.
  const dir = (locale as string) === "ur" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${archivo.variable} ${nastaliq.variable} ${amiri.variable}`}
    >
      <body>
        <TravelAgencyJsonLd />
        <NextIntlClientProvider>
          <MotionProvider>
            <SkipLink />
            <DemoBanner />
            <SeasonStrip locale={locale as Locale} />
            <HeaderClient brandName={site.brandName} whatsappNumber={site.whatsappNumber} />
            <main id="main" className="pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <StickyContactBar />
            <FloatingWhatsApp whatsappNumber={site.whatsappNumber} />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
