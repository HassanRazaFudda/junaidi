import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pick } from "@/content/localize";
import { SampleBadge } from "@/components/ui/sample-badge";
import type { Package } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// design.md §6: "Facts first: duration, Makkah distance, Mina category,
// price, then action. Status text: 'Sold out', 'Archived'." This row
// version is Checkpoint-2-era; fix.md §4.1's full package card (photo,
// stars, tier badge, inclusion chips) replaces it on the home/Hajj-2027
// grids in Step 4/5 of the fix.md rebuild.
export async function PackageRow({ pkg, locale }: { pkg: Package; locale: Locale }) {
  const t = await getTranslations("packages");
  const makkahHotel = pkg.hotels.find((h) => h.city === "Makkah");
  // Umrah has no dedicated hub/detail route yet (out of original Phase 1
  // scope; fix.md adds Umrah cards to the demo home page without asking
  // for the full Umrah section) — /umrah/[slug] is built alongside the
  // home rebuild in fix.md §11 step 5.
  const href = pkg.type === "hajj" ? `/hajj/${pkg.seasonSlug}/${pkg.slug}` : `/umrah/${pkg.slug}`;

  return (
    <li className="border-b border-line py-5">
      <Link
        href={href}
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
      {pkg.sample && <SampleBadge className="mt-1" />}
    </li>
  );
}
