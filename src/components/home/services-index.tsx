import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { listPackages } from "@/content/queries";

// design.md §6: "Large-type list, not cards... hide unconfirmed." Only
// Hajj 2027 is a real, live service in Phase 1 — DECISIONS.md #5e.
export async function ServicesIndex() {
  const [t, hajjPackages] = await Promise.all([getTranslations(), listPackages({ type: "hajj" })]);
  const packageCount = hajjPackages.length;

  return (
    <Section>
      <Container>
        <h2 className="sr-only">{t("services.heading")}</h2>
        <ul className="divide-y divide-line border-y border-line">
          <li>
            <Link
              href="/hajj/2027"
              className="flex items-baseline justify-between gap-4 py-6 hover:text-crimson"
            >
              <span className="font-display text-h3">{t("services.hajj")}</span>
              <span className="text-small text-stone">
                {packageCount > 0 ? `${packageCount} packages` : t("packages.emptyHeading")}
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
