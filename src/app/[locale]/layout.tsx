import type { Metadata } from "next";
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
            <SeasonStrip locale={locale as Locale} />
            <HeaderClient brandName={site.brandName} whatsappNumber={site.whatsappNumber} />
            <main id="main" className="pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <StickyContactBar />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
