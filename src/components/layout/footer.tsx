import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { getSiteSettings, listCredentials } from "@/content/queries";
import { pick } from "@/content/localize";
import { getCurrentYear } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

const policyLinks = [
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
  { href: "/cancellation-policy", key: "cancellation" },
  { href: "/complaints", key: "complaints" },
] as const;

export async function Footer() {
  const [t, locale, site, credentials, year] = await Promise.all([
    getTranslations("footer"),
    getLocale() as Promise<Locale>,
    getSiteSettings(),
    listCredentials(),
    getCurrentYear(),
  ]);

  return (
    <footer className="border-t border-line bg-marble">
      <Container className="grid gap-10 py-12 text-small md:grid-cols-3">
        <div>
          <p className="font-display text-h3">{site.brandName}</p>
          <p className="mt-1 text-stone">{site.legalName}</p>

          <h2 className="mt-6 font-medium">{t("officeHeading")}</h2>
          <address className="mt-1 text-stone not-italic">
            {site.office.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-2">
            <a href={`tel:${site.landline.replace(/\D/g, "")}`} className="hover:text-crimson">
              {site.landline}
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-medium">{t("credentialsHeading")}</h2>
          {credentials.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {credentials.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone hover:text-crimson"
                  >
                    {pick(c.label, locale)}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-stone">
              <Link
                href="/about/credentials"
                className="underline underline-offset-4 hover:text-crimson"
              >
                {t("credentialsLink")}
              </Link>
            </p>
          )}
        </div>

        <div>
          <h2 className="font-medium">{t("policiesHeading")}</h2>
          <ul className="mt-2 space-y-2">
            {policyLinks.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-stone hover:text-crimson">
                  {t(p.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="border-t border-line py-4 text-caption text-stone">
        &copy; {year} {site.brandName}. {t("rightsReserved")}
      </Container>
    </footer>
  );
}
