import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PackageCard } from "@/components/package/package-card";
import { BookingSteps } from "@/components/package/booking-steps";
import { Reveal } from "@/components/ui/reveal.client";
import { StaggerGrid } from "@/components/ui/stagger-grid.client";
import { DeadlineCountdown } from "@/components/home/deadline-countdown.client";
import { getSeason, getSeasonDeadlineStatus, listPackages } from "@/content/queries";
import type { Locale } from "@/i18n/routing";

// fix.md §7: ink + pattern band, left = H2 + deadline + 4 booking steps,
// right = 3 tier cards on paper, note that booking/payment only happens
// through the official Pak Hajj app (guide.md §2 rule 1 — never a payment
// button here). Hidden entirely if there's no real season/packages yet,
// same "no pending panel" treatment as every other section.
//
// Right side is a horizontal snap-scroll row, not a vertical stack —
// fix.md §7's mobile note ("package grid becomes a horizontal snap
// carousel, 1.1 cards visible") was originally missed here entirely (the
// cards had no column/width rules at all, just an unconstrained vertical
// list). Besides matching that spec, a 3-card vertical stack next to a
// much shorter text column looked broken regardless of text alignment —
// the real fix was giving the cards column a sane height, not moving the
// text around it.
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
  // Animation-only starting point for the countdown's roll-down visual —
  // derived from the real `days` value, not a separate invented date (see
  // deadline-countdown.client.tsx).
  const totalDays = Math.min(deadlineStatus.days * 3, 365);

  return (
    <Section className="pattern-star-ink bg-ink text-paper">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <Reveal>
          <p className="text-caption font-medium text-crimson-night">{t("eyebrow")}</p>
          <h2 className="font-display mt-1 text-h2 text-paper">{t("heading")}</h2>
          {!deadlineStatus.closed && (
            <p className="mt-2 text-lead text-paper/85">
              <DeadlineCountdown days={deadlineStatus.days} totalDays={totalDays} /> day
              {deadlineStatus.days === 1 ? "" : "s"} left to book on the Pak Hajj app.
            </p>
          )}
          <div className="mt-8">
            <BookingSteps portalUrl={season.officialPortalUrl} dark />
          </div>
          <p className="mt-6 text-meta text-paper/60">{t("note")}</p>
        </Reveal>

        <StaggerGrid
          className="scrollbar-hide flex min-w-0 touch-pan-x snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain"
          itemClassName="w-[75%] shrink-0 snap-start sm:w-80"
          items={tiers.map((pkg) => ({
            id: pkg.id,
            node: <PackageCard pkg={pkg} locale={locale} whatsappNumber={whatsappNumber} />,
          }))}
        />
      </Container>
    </Section>
  );
}
