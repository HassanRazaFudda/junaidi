import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PackageRow } from "@/components/package/package-row";
import { BookingSteps } from "@/components/package/booking-steps";
import { Faq } from "@/components/package/faq";
import { PastGroups } from "@/components/home/past-groups";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { buttonStyles } from "@/components/ui/button";
import {
  getSeason,
  listPackages,
  isCredentialConfirmed,
  getSiteSettings,
  getSeasonDeadlineStatus,
} from "@/content/queries";
import { pick } from "@/content/localize";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => [{ locale, season: "2027" }]);
}

// code.md §9.1 target intent: "private hajj packages 2027 Karachi," "hajj
// 2027 package price Pakistan." No credential/authorisation claim here —
// that's unconfirmed and gated elsewhere (DECISIONS.md #3).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ season: string }>;
}): Promise<Metadata> {
  const { season: seasonSlug } = await params;
  const season = await getSeason(seasonSlug);
  if (!season) return {};

  return {
    title: `Hajj ${season.slug} packages from Karachi`,
    description:
      "Compare Junaidi's Hajj 2027 packages and how private Hajj booking works through the official Pak Hajj app and Hajj Portal.",
  };
}

export default async function HajjSeasonPage({
  params,
}: {
  params: Promise<{ locale: string; season: string }>;
}) {
  const { locale, season: seasonSlug } = await params;
  setRequestLocale(locale);

  const [season, packages, credentialConfirmed, site, t, deadlineStatus] = await Promise.all([
    getSeason(seasonSlug),
    listPackages({ type: "hajj", season: seasonSlug }),
    isCredentialConfirmed("hajj-2027-al-wakeel"),
    getSiteSettings(),
    getTranslations(),
    getSeasonDeadlineStatus(seasonSlug),
  ]);

  if (!season || season.type !== "hajj" || !deadlineStatus) notFound();

  const { days, closed } = deadlineStatus;
  const faqs = packages.flatMap((p) => p.faqs);

  return (
    <>
      <Section className="pb-10">
        <Container>
          <h1 className="font-display text-h1">{pick(season.name, locale as Locale)}</h1>
          {!closed && (
            <p className="mt-2 text-lead text-stone">
              {days} day{days === 1 ? "" : "s"} left to book on the Pak Hajj app.
            </p>
          )}
          {credentialConfirmed ? (
            <p className="mt-2 max-w-prose text-stone">
              {pick(season.credentialLine, locale as Locale)}
            </p>
          ) : (
            <p className="mt-2 max-w-prose text-stone italic">{t("credentials.emptyBody")}</p>
          )}
        </Container>
      </Section>

      <Section className="border-t border-line pt-10">
        <Container>
          <BookingSteps portalUrl={season.officialPortalUrl} id="how-booking-works" />
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <h2 className="font-display text-h2">{t("packages.heading")}</h2>
          {packages.length > 0 ? (
            <ul className="mt-6">
              {packages.map((pkg) => (
                <PackageRow key={pkg.id} pkg={pkg} locale={locale as Locale} />
              ))}
            </ul>
          ) : (
            <div className="mt-6 max-w-prose rounded-panel border border-line bg-paper p-6">
              <p className="font-medium">{t("packages.emptyHeading")}</p>
              <p className="mt-2 text-stone">{t("packages.emptyBody")}</p>
            </div>
          )}
        </Container>
      </Section>

      <PastGroups locale={locale as Locale} />

      <Faq faqs={faqs} locale={locale as Locale} />

      <Section className="border-t border-line">
        <Container className="flex flex-wrap items-center gap-4">
          <a
            href={whatsappUrl(site.whatsappNumber, { season: pick(season.name, locale as Locale) })}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonStyles.primary,
              "inline-flex min-h-12 items-center gap-2 rounded-control px-5",
            )}
          >
            <WhatsAppIcon className="size-5" />
            {t("header.whatsappCta")}
          </a>
          <a
            href={`tel:${site.landline.replace(/\D/g, "")}`}
            className={cn(
              buttonStyles.secondary,
              "inline-flex min-h-12 items-center rounded-control px-5",
            )}
          >
            {site.landline}
          </a>
        </Container>
      </Section>
    </>
  );
}
