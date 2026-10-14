import { pick } from "@/content/localize";
import type { Package } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// guide.md §5.3 "Stay": Makkah/Madinah hotel — name, distance (and how
// measured), room sharing; Mina camp category; Arafat arrangement.
export function StayBlock({ pkg, locale }: { pkg: Package; locale: Locale }) {
  return (
    <div>
      <h2 className="font-display text-h2">Stay</h2>
      <dl className="mt-4 space-y-6">
        {pkg.hotels.map((hotel) => (
          <div key={`${hotel.city}-${hotel.name}`}>
            <dt className="font-medium">
              {hotel.city} · {hotel.name}
              {hotel.orSimilar && <span className="text-stone"> or similar</span>}
            </dt>
            <dd className="mt-1 text-stone">
              {[
                hotel.distanceMeters ? `${hotel.distanceMeters}m from the Haram` : null,
                hotel.distanceNote ? `(${pick(hotel.distanceNote, locale)})` : null,
                pick(hotel.roomSharing, locale),
              ]
                .filter(Boolean)
                .join(" · ")}
            </dd>
          </div>
        ))}
        {pkg.mina && (
          <div>
            <dt className="font-medium">Mina</dt>
            <dd className="mt-1 text-stone">{pick(pkg.mina, locale)}</dd>
          </div>
        )}
        {pkg.arafat && (
          <div>
            <dt className="font-medium">Arafat</dt>
            <dd className="mt-1 text-stone">{pick(pkg.arafat, locale)}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
