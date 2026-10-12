import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CredentialRow } from "@/components/credentials/credential-row";
import { listCredentials } from "@/content/queries";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

// guide.md §5.8: "table of every licence/registration → number → issuing
// body → season/validity → link to source document → date checked." Every
// row is unconfirmed in Phase 1 (DECISIONS.md #3), so this is the pending
// state until the client confirms in writing.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CredentialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, credentials] = await Promise.all([getTranslations("credentials"), listCredentials()]);

  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="font-display text-h1">Credentials</h1>
        <p className="mt-4 max-w-prose text-lead text-stone">
          Every licence and registration Junaidi holds, with a link to the official document it
          comes from (guide.md §2 — no authorisation claim without a source).
        </p>

        {credentials.length > 0 ? (
          <ul className="mt-8">
            {credentials.map((c) => (
              <CredentialRow key={c.id} credential={c} locale={locale as Locale} />
            ))}
          </ul>
        ) : (
          <div className="mt-8 max-w-prose rounded-panel border border-line bg-paper p-6">
            <p className="font-medium">{t("emptyHeading")}</p>
            <p className="mt-2 text-stone">{t("emptyBody")}</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
