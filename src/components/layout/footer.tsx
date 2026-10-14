import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { FacebookIcon } from "@/components/ui/facebook-icon";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { getSiteSettings, listCredentials } from "@/content/queries";
import { pick } from "@/content/localize";
import { getCurrentYear } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

// Client-supplied badge row (chat request, 2026-10-14) — a plain visual
// strip, separate from the `credentials` data above: those are structured
// records (issuer/sourceUrl/validity) gated on `verifiedByClient` per
// guide.md §1.1 until the client confirms each in writing (CLIENT-TODO.md
// "Licences and credentials"). This row doesn't carry that same weight of
// claim, but three of the five marks (HOAP, TAAP, SECP) aren't modelled as
// Credential records at all yet — the client pointed at a reference banner
// and asked for "these badges", positions below are our best read of that
// low-resolution image, not independently confirmed. See DECISIONS.md.
const credentialBadges = [
  {
    src: "/brand/credentials/govt-pakistan-emblem-01.webp",
    alt: "Government of Pakistan",
    width: 893,
    height: 1024,
  },
  {
    src: "/brand/credentials/hoap-01.webp",
    alt: "Hajj Organizers Association of Pakistan (HOAP)",
    width: 1024,
    height: 683,
  },
  {
    src: "/brand/credentials/taap-01.webp",
    alt: "Travel Agents Association of Pakistan (TAAP)",
    width: 1024,
    height: 841,
  },
  {
    src: "/brand/credentials/iata-01.webp",
    alt: "IATA",
    width: 1024,
    height: 656,
  },
  {
    src: "/brand/credentials/secp-01.webp",
    alt: "Securities and Exchange Commission of Pakistan (SECP)",
    width: 919,
    height: 1024,
  },
] as const;

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
        <div className="md:row-span-2">
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

        {/* Sits in the grid's own leftover space below Services/Licensed/
            Policies (those columns are shorter than the Office column
            beside them, row-span-2 above) rather than adding a new
            full-width band below the footer. bg-marble (inherited from
            <footer>) already gives these dark green/blue marks enough
            contrast — no separate light-background block needed. */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 md:col-span-3 md:col-start-2 md:self-end">
          {credentialBadges.map((b) => (
            <Image
              key={b.src}
              src={b.src}
              alt={b.alt}
              width={b.width}
              height={b.height}
              className="h-16 w-auto object-contain"
            />
          ))}
        </div>
      </Container>

      <Container className="border-t border-line py-4 text-caption text-stone">
        &copy; {year} {site.brandName}. {t("rightsReserved")}
      </Container>
    </footer>
  );
}
