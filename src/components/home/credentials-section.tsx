import { getTranslations } from "next-intl/server";
import { listCredentials } from "@/content/queries";
import { CredentialRow } from "@/components/credentials/credential-row";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1 row 4: "Prove legitimacy." In Phase 1 this is almost always
// the pending state — every Credential is unverified until the client
// confirms in writing (DECISIONS.md #3) — but the section still has to say
// something honest rather than render nothing at all.
export async function CredentialsSection({ locale }: { locale: Locale }) {
  const [t, credentials] = await Promise.all([getTranslations("credentials"), listCredentials()]);

  return (
    <Section className="border-t border-line">
      <Container>
        <h2 className="font-display text-h2">{t("heading")}</h2>
        {credentials.length > 0 ? (
          <ul className="mt-6">
            {credentials.map((c) => (
              <CredentialRow key={c.id} credential={c} locale={locale} />
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
