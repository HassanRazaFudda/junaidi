import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CredentialRow } from "@/components/credentials/credential-row";
import { listCredentials } from "@/content/queries";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

// guide.md §5.8: "table of every licence/registration → number → issuing
// body → season/validity → link to source document → date checked." fix.md
// §9.3: no "pending" panel — hides if there's nothing confirmed to show
// (demo mode fills this with the real, sourced, sample-labelled
// credentials on staging — fix.md §5.2).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CredentialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const credentials = await listCredentials();

  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="font-display text-h1">Credentials</h1>
        <p className="mt-4 max-w-prose text-lead text-stone">
          Every licence and registration Junaidi holds, with a link to the official document it
          comes from (guide.md §2 — no authorisation claim without a source).
        </p>

        {credentials.length > 0 && (
          <ul className="mt-8">
            {credentials.map((c) => (
              <CredentialRow key={c.id} credential={c} locale={locale as Locale} />
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
