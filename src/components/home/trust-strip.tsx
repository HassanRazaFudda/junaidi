import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SampleBadge } from "@/components/ui/sample-badge";
import { listCredentials } from "@/content/queries";
import { pick } from "@/content/localize";
import { env } from "@/lib/env";
import type { Locale } from "@/i18n/routing";

// fix.md §4.3: "Five items... IATA accredited agent · Umrah operator,
// MoRA attested · Hajj 2027 via Al Wakeel Munazzam · Since 2005 · Office
// at Mona Square, Karachi. ... In demo mode show all; in production show
// only verifiedByClient: true items."
//
// "Since 2005" is deliberately NOT one of those real, sourced items: guide.md
// §1.1 flags it explicitly as "Company self-description only. Verify
// before publishing 'since 2005'" — an unverified claim with no citable
// source (Credential.sourceUrl is required; there's nothing to cite here,
// same reasoning as DECISIONS.md #4's Umrah-attestation gap). It only
// appears in demo mode, sample-labelled, never in live mode. The office
// address item is a confirmed fact (no "verify" flag in guide.md §1.1), so
// it always shows.
export async function TrustStrip({ locale }: { locale: Locale }) {
  const [t, credentials] = await Promise.all([getTranslations("trustStrip"), listCredentials()]);
  const isDemo = env.NEXT_PUBLIC_CONTENT_MODE === "demo";

  if (credentials.length === 0 && !isDemo) {
    // Nothing confirmed yet and we're not in demo mode — only the office
    // fact would show, which isn't really a "trust strip" on its own.
    return null;
  }

  return (
    <div className="border-y border-line bg-paper">
      <Container>
        <ul className="flex gap-6 overflow-x-auto py-4 text-meta whitespace-nowrap">
          {credentials.map((c) => (
            <li key={c.id}>
              <Link href="/about/credentials" className="hover:text-crimson">
                {pick(c.label, locale)}
              </Link>
              {!c.verifiedByClient && <SampleBadge className="ms-1 inline" />}
            </li>
          ))}
          {isDemo && (
            <li>
              <span>Since 2005</span>
              <SampleBadge className="ms-1 inline" />
            </li>
          )}
          <li>{t("officeItem")}</li>
        </ul>
      </Container>
    </div>
  );
}
