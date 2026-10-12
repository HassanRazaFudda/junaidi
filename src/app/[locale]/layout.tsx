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
import type { Locale } from "@/i18n/routing";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: { default: "Junaidi Group", template: "%s · Junaidi Group" },
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
