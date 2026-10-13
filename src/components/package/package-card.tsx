import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Star, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { buttonStyles } from "@/components/ui/button";
import { SampleBadge } from "@/components/ui/sample-badge";
import { pick } from "@/content/localize";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import type { Package } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// fix.md §4.1: photo 16:10 + tier badge pill, duration/departure overlay
// chip, title, hotel lines (stars + distance), up to 4 inclusion chips,
// price with basis, two CTAs. "If a field is unknown, hide the line;
// never show 'TBD.'"
export async function PackageCard({
  pkg,
  locale,
  whatsappNumber,
}: {
  pkg: Package;
  locale: Locale;
  whatsappNumber: string;
}) {
  const t = await getTranslations("packages");
  const href = pkg.type === "hajj" ? `/hajj/${pkg.seasonSlug}/${pkg.slug}` : `/umrah/${pkg.slug}`;
  const title = pick(pkg.title, locale);

  return (
    <div className="card-hover group flex flex-col overflow-hidden rounded-card border border-line bg-paper">
      <div className="relative aspect-[16/10] overflow-hidden">
        {pkg.photo ? (
          <Image
            src={pkg.photo.src}
            alt={pick(pkg.photo.alt, locale)}
            fill
            sizes="(min-width: 1024px) 400px, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="size-full bg-haze" />
        )}
        {pkg.tierLabel && (
          <span className="absolute end-3 top-3 rounded-full bg-paper px-3 py-1 text-caption font-medium text-ink shadow-sm">
            {pick(pkg.tierLabel, locale)}
          </span>
        )}
        <span className="absolute start-3 bottom-3 rounded-control bg-ink/80 px-2.5 py-1 text-caption text-marble">
          {pkg.durationDays} {t("nights")} · {pkg.departureCities.join(", ")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h3 font-medium">{title}</h3>

        <ul className="mt-2 space-y-1 text-meta text-stone">
          {pkg.hotels.map((hotel) => (
            <li key={`${hotel.city}-${hotel.name}`} className="flex items-center gap-1.5">
              {hotel.stars && (
                <span
                  role="img"
                  aria-label={`${hotel.stars} stars`}
                  className="flex items-center text-star"
                >
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="size-3" fill="currentColor" aria-hidden />
                  ))}
                </span>
              )}
              <span>
                {hotel.city} — {hotel.name}
                {hotel.distanceMeters && ` · ${hotel.distanceMeters}m`}
              </span>
            </li>
          ))}
        </ul>

        {pkg.included.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-meta text-stone">
            {pkg.included.slice(0, 4).map((item) => (
              <li key={pick(item, locale)} className="flex items-center gap-1">
                <Check className="size-3 text-crimson" aria-hidden />
                {pick(item, locale)}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4">
          {pkg.priceFromPKR && (
            <p>
              <span className="text-meta text-stone">{t("from")} </span>
              <span className="text-price font-bold text-crimson">
                PKR {pkg.priceFromPKR.toLocaleString("en-PK")}
              </span>
              {pkg.priceBasis && (
                <span className="text-meta text-stone"> / {pick(pkg.priceBasis, locale)}</span>
              )}
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <Link
              href={href}
              className={cn(
                buttonStyles.primary,
                "inline-flex min-h-11 flex-1 items-center justify-center rounded-control px-4 text-small",
              )}
            >
              {t("view")}
            </Link>
            <a
              href={whatsappUrl(whatsappNumber, {
                packageName: title,
                season: pick(pkg.seasonLabel, locale),
              })}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonStyles.whatsapp,
                "inline-flex min-h-11 items-center justify-center rounded-control px-3",
              )}
            >
              <WhatsAppIcon className="size-5" />
              <span className="sr-only">{t("whatsappAboutPackage")}</span>
            </a>
          </div>
          {pkg.sample && <SampleBadge className="mt-2" />}
        </div>
      </div>
    </div>
  );
}
