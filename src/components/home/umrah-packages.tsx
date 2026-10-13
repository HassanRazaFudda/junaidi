import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PackageCard } from "@/components/package/package-card";
import { UmrahPackagesFilter } from "@/components/home/umrah-packages-filter.client";
import { Link } from "@/i18n/navigation";
import { listPackages } from "@/content/queries";
import { pick } from "@/content/localize";
import type { Locale } from "@/i18n/routing";

// fix.md §7/§2: "Umrah packages browsable by month or by tier (tabs)."
// Months/tiers shown as filter options are derived from what's actually in
// the data, not hardcoded against fix.md's mockup labels — the mockup lists
// a "Shaban" tab, but no sample package exists for Shaban, and a tab that
// always shows zero results is its own kind of invented claim ("we have
// Shaban departures"). PackageCard is an async Server Component, so it's
// rendered here (server-side) and handed to the client filter as already-
// rendered nodes tagged with month/tier — the client only ever toggles
// visibility, it never re-renders a card.
export async function UmrahPackages({
  locale,
  whatsappNumber,
  seeAllLink = true,
  noPaddingTop = false,
}: {
  locale: Locale;
  whatsappNumber: string;
  /** Home preview links to /umrah; the /umrah index itself doesn't link to itself. */
  seeAllLink?: boolean;
  noPaddingTop?: boolean;
}) {
  const [t, packages] = await Promise.all([
    getTranslations("packages"),
    listPackages({ type: "umrah" }),
  ]);
  if (packages.length === 0) return null;

  const items = packages.map((pkg) => ({
    id: pkg.id,
    month: pkg.month ? pick(pkg.month, locale) : null,
    tier: pkg.tierLabel ? pick(pkg.tierLabel, locale) : null,
    node: <PackageCard key={pkg.id} pkg={pkg} locale={locale} whatsappNumber={whatsappNumber} />,
  }));

  return (
    <Section noPaddingTop={noPaddingTop}>
      <Container>
        <p className="text-caption font-medium text-crimson">{t("umrahEyebrow")}</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-h2">{t("umrahSubheading")}</h2>
          {seeAllLink && (
            <Link href="/umrah" className="text-small font-medium hover:text-crimson">
              {t("seeAllUmrah")}
            </Link>
          )}
        </div>
        <UmrahPackagesFilter items={items} allLabel={t("filterAll")} />
      </Container>
    </Section>
  );
}
