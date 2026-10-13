import type { TravelAgency, WithContext } from "schema-dts";
import { JsonLd } from "@/lib/jsonld";
import { getSiteSettings } from "@/content/queries";
import { env } from "@/lib/env";

// guide.md §9.2: "TravelAgency (verified NAP)" — name/address/phone only,
// the confirmed facts from guide.md §1.1. No aggregateRating (no real
// reviews exist yet), no foundingDate (the "since 2005" claim is
// unverified per guide.md §1.1), no sameAs social links beyond what's
// actually confirmed.
export async function TravelAgencyJsonLd() {
  const site = await getSiteSettings();

  const data: WithContext<TravelAgency> = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.brandName,
    legalName: site.legalName,
    url: env.NEXT_PUBLIC_SITE_URL,
    telephone: site.landline,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.office.addressLines.join(", "),
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    ...(site.facebookUrl ? { sameAs: [site.facebookUrl] } : {}),
  };

  return <JsonLd data={data} />;
}
