import type { Product, FAQPage, WithContext } from "schema-dts";
import { JsonLd } from "@/lib/jsonld";
import { pick } from "@/content/localize";
import { env } from "@/lib/env";
import type { Package } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// guide.md §9.2: "Product/Offer only with real prices and validThrough,"
// "FAQPage where FAQs are visible." Both render only once a package
// actually has that data — never fabricated.
export function PackageJsonLd({ pkg, locale }: { pkg: Package; locale: Locale }) {
  const product: WithContext<Product> | null = pkg.priceFromPKR
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: pick(pkg.title, locale),
        offers: {
          "@type": "Offer",
          price: pkg.priceFromPKR,
          priceCurrency: "PKR",
          availability:
            pkg.status === "live" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
          validThrough: pkg.validUntil,
          url: `${env.NEXT_PUBLIC_SITE_URL}/hajj/${pkg.seasonSlug}/${pkg.slug}`,
        },
      }
    : null;

  const faqPage: WithContext<FAQPage> | null =
    pkg.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pkg.faqs.map((f) => ({
            "@type": "Question",
            name: pick(f.q, locale),
            acceptedAnswer: { "@type": "Answer", text: pick(f.a, locale) },
          })),
        }
      : null;

  return (
    <>
      {product && <JsonLd data={product} />}
      {faqPage && <JsonLd data={faqPage} />}
    </>
  );
}
