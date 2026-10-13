import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PackageRow } from "@/components/package/package-row";
import { listPackages } from "@/content/queries";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1 row 6: "Hajj 2027 tiers + current Umrah. Max 3 per row."
// Umrah packages aren't in Phase 1 scope (prompt.md), so this previews
// Hajj 2027 only. fix.md §9.3: no "pending" panel on public pages — hides
// entirely when empty, same treatment as CredentialsSection.
export async function PackagesPreview({ locale }: { locale: Locale }) {
  const [t, packages] = await Promise.all([
    getTranslations("packages"),
    listPackages({ type: "hajj" }),
  ]);
  const preview = packages.slice(0, 3);
  if (preview.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <Container>
        <h2 className="font-display text-h2">{t("heading")}</h2>
        <ul className="mt-6">
          {preview.map((pkg) => (
            <PackageRow key={pkg.id} pkg={pkg} locale={locale} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
