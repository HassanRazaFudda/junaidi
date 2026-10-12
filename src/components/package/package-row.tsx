import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pick } from "@/content/localize";
import type { Package } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// design.md §6: "Facts first: duration, Makkah distance, Mina category,
// price, then action. Status text: 'Sold out', 'Archived'." Data rows, not
// a card with a shadow (design.md §3 — rejected the "SaaS card kit" look).
export async function PackageRow({ pkg, locale }: { pkg: Package; locale: Locale }) {
  const t = await getTranslations("packages");
  const makkahHotel = pkg.hotels.find((h) => h.city === "Makkah");

  return (
    <li className="border-b border-line py-5">
      <Link
        href={`/hajj/${pkg.seasonSlug}/${pkg.slug}`}
        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 hover:text-crimson"
      >
        <span className="font-display text-h3">{pick(pkg.title, locale)}</span>
        <span className="flex flex-wrap items-center gap-x-6 gap-y-1 text-small text-stone">
          <span>{pkg.durationDays} days</span>
          {makkahHotel?.distanceMeters && <span>Makkah {makkahHotel.distanceMeters}m</span>}
          {pkg.mina && <span>{pick(pkg.mina, locale)}</span>}
          {pkg.status === "soldOut" && <span className="text-alert">{t("soldOut")}</span>}
          {pkg.status === "archived" && <span>{t("archived")}</span>}
          {pkg.priceFromPKR && pkg.status === "live" && (
            <span className="font-medium text-ink">
              PKR {pkg.priceFromPKR.toLocaleString("en-PK")}
            </span>
          )}
          <span className="text-crimson underline underline-offset-4">{t("view")}</span>
        </span>
      </Link>
    </li>
  );
}
