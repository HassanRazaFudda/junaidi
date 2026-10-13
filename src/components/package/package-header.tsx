import { getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { buttonStyles } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";
import { pick } from "@/content/localize";
import { cn } from "@/lib/cn";
import type { Package } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// guide.md §5.3: season badge, name, duration/city/price/price-checked
// date, then the two CTAs. Hajj CTA is never a payment button (guide.md §2
// rule 1) — "How to book this package" leads to the official-portal steps
// further down the page, not a checkout.
export async function PackageHeader({
  pkg,
  locale,
  whatsappNumber,
}: {
  pkg: Package;
  locale: Locale;
  whatsappNumber: string;
}) {
  const t = await getTranslations("packages");

  return (
    <div>
      <p className="text-caption text-crimson">{pick(pkg.seasonLabel, locale)}</p>
      <h1 className="font-display text-h1">{pick(pkg.title, locale)}</h1>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-small text-stone">
        <span>{pkg.durationDays} days</span>
        <span>{pkg.departureCities.join(", ")}</span>
        {pkg.priceFromPKR && (
          <span className="font-medium text-ink">
            PKR {pkg.priceFromPKR.toLocaleString("en-PK")}
          </span>
        )}
        {pkg.priceCheckedOn && (
          <span>
            {t("priceChecked")} {pkg.priceCheckedOn}
          </span>
        )}
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        {pkg.officialBookingUrl && (
          <a
            href="#how-booking-works"
            className={cn(
              buttonStyles.primary,
              "inline-flex min-h-12 items-center rounded-control px-5",
            )}
          >
            {t("howToBook")}
          </a>
        )}
        <a
          href={whatsappUrl(whatsappNumber, {
            packageName: pick(pkg.title, locale),
            season: pick(pkg.seasonLabel, locale),
          })}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonStyles.whatsapp,
            "inline-flex min-h-12 items-center gap-2 rounded-control px-5",
          )}
        >
          <WhatsAppIcon className="size-5" />
          {t("whatsappAboutPackage")}
        </a>
      </div>
    </div>
  );
}
