import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PackageCard } from "@/components/package/package-card";
import { BookingSteps } from "@/components/package/booking-steps";
import { getSeason, getSeasonDeadlineStatus, listPackages } from "@/content/queries";
import type { Locale } from "@/i18n/routing";

// fix.md §7: ink + pattern band, left = H2 + deadline + 4 booking steps,
// right = 3 tier cards on paper, note that booking/payment only happens
// through the official Pak Hajj app (guide.md §2 rule 1 — never a payment
// button here). Hidden entirely if there's no real season/packages yet,
// same "no pending panel" treatment as every other section.
export async function HajjBand({
  locale,
  whatsappNumber,
}: {
  locale: Locale;
  whatsappNumber: string;
}) {
  const [t, season, deadlineStatus, packages] = await Promise.all([
    getTranslations("hajjBand"),
    getSeason("2027"),
    getSeasonDeadlineStatus("2027"),
    listPackages({ type: "hajj", season: "2027" }),
  ]);
  if (!season || !deadlineStatus || packages.length === 0) return null;

  const tiers = packages.slice(0, 3);

  return (
    <Section className="pattern-star-ink bg-ink text-paper">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-caption font-medium text-crimson-night">{t("eyebrow")}</p>
          <h2 className="font-display mt-1 text-h2 text-paper">{t("heading")}</h2>
          {!deadlineStatus.closed && (
            <p className="mt-2 text-lead text-paper/85">
              {deadlineStatus.days} day{deadlineStatus.days === 1 ? "" : "s"} left to book on the
              Pak Hajj app.
            </p>
          )}
          <div className="mt-8">
            <BookingSteps portalUrl={season.officialPortalUrl} dark />
          </div>
          <p className="mt-6 text-meta text-paper/60">{t("note")}</p>
        </div>

        <ul className="grid gap-6">
          {tiers.map((pkg) => (
            <li key={pkg.id}>
              <PackageCard pkg={pkg} locale={locale} whatsappNumber={whatsappNumber} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
