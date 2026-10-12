import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PackageRow } from "@/components/package/package-row";
import { listPackages } from "@/content/queries";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1 row 6: "Hajj 2027 tiers + current Umrah. Max 3 per row."
// Umrah packages aren't in Phase 1 scope (prompt.md), so this previews
// Hajj 2027 only — empty in Phase 1 pending real package data.
export async function PackagesPreview({ locale }: { locale: Locale }) {
  const [t, packages] = await Promise.all([
    getTranslations("packages"),
    listPackages({ type: "hajj" }),
  ]);
  const preview = packages.slice(0, 3);

  return (
    <Section className="border-t border-line">
      <Container>
        <h2 className="font-display text-h2">{t("heading")}</h2>
        {preview.length > 0 ? (
          <ul className="mt-6">
            {preview.map((pkg) => (
              <PackageRow key={pkg.id} pkg={pkg} locale={locale} />
            ))}
          </ul>
        ) : (
          <div className="mt-6 max-w-prose rounded-panel border border-line bg-paper p-6">
            <p className="font-medium">{t("emptyHeading")}</p>
            <p className="mt-2 text-stone">{t("emptyBody")}</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
