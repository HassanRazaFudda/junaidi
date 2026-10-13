import { getTranslations } from "next-intl/server";
import { listCredentials } from "@/content/queries";
import { CredentialRow } from "@/components/credentials/credential-row";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1 row 4: "Prove legitimacy." fix.md §9.3: no "pending" panel
// on public pages — the section hides entirely when there's nothing
// confirmed to show, rather than announcing its own emptiness. Demo mode
// (fix.md §5) fills this with clearly-labelled sample credentials on
// staging; in live mode with no verified credentials, there's simply no
// section here, same as Reviews/PastGroups already did.
export async function CredentialsSection({ locale }: { locale: Locale }) {
  const [t, credentials] = await Promise.all([getTranslations("credentials"), listCredentials()]);
  if (credentials.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <Container>
        <h2 className="font-display text-h2">{t("heading")}</h2>
        <ul className="mt-6">
          {credentials.map((c) => (
            <CredentialRow key={c.id} credential={c} locale={locale} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
