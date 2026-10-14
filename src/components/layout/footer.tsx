import { getTranslations, getLocale } from "next-intl/server";
import { FacebookIcon } from "@/components/ui/facebook-icon";
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

// fix.md §7: "services links · Hajj/Umrah links." Only real, live routes
// (DECISIONS.md #5e) — Flights/Visas/Tours/Hotels still don't have their
// own pages (DECISIONS.md #5r), but /umrah does now (fix.md §11 step 5).
const serviceLinks = [
  { href: "/hajj/2027", label: "Hajj 2027" },
  { href: "/umrah", label: "Umrah packages" },
  { href: "/hajj/how-private-hajj-booking-works", label: "How booking works" },
  { href: "/contact", label: "Contact" },
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
      <Container className="grid gap-x-10 gap-y-6 py-12 text-small md:grid-cols-4">
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
          {site.facebookUrl && (
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-stone hover:text-crimson"
            >
              <FacebookIcon className="size-5" />
              <span className="sr-only">Facebook</span>
            </a>
          )}
        </div>

        <div>
          <h2 className="font-medium">{t("servicesHeading")}</h2>
          <ul className="mt-2 space-y-2">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-stone hover:text-crimson">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
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
