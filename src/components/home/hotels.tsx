import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { listPackages } from "@/content/queries";
import type { Hotel } from "@/content/types";

// fix.md §4.6/§7: "Where you'll stay: 4 hotel cards (photo, stars,
// distance), tabs Makkah | Madinah." No photo here deliberately: pairing a
// generic stock photo with a specific real hotel's name would misleadingly
// imply it's a photo of that hotel — the same reasoning as design.md's P-01
// rule against generic "luxury room" stock. Hotels are derived from
// package data (there's no standalone hotel content entity), deduped by
// name, so this section is empty — and hidden — until packages exist.
export async function Hotels() {
  const [t, hajj, umrah] = await Promise.all([
    getTranslations("hotels"),
    listPackages({ type: "hajj" }),
    listPackages({ type: "umrah" }),
  ]);

  const seen = new Set<string>();
  const hotels: Hotel[] = [];
  for (const pkg of [...hajj, ...umrah]) {
    for (const hotel of pkg.hotels) {
      const key = `${hotel.city}-${hotel.name}`;
      if (!seen.has(key)) {
        seen.add(key);
        hotels.push(hotel);
      }
    }
  }
  if (hotels.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <Container>
        <p className="text-caption font-medium text-crimson">{t("eyebrow")}</p>
        <h2 className="font-display mt-1 text-h2">{t("heading")}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hotels.map((hotel) => (
            <li
              key={`${hotel.city}-${hotel.name}`}
              className="card-hover rounded-card border border-line bg-paper p-4"
            >
              <p className="text-caption text-stone">{hotel.city}</p>
              <p className="mt-1 font-medium">{hotel.name}</p>
              {hotel.stars && (
                <span
                  className="mt-1 flex items-center text-star"
                  aria-label={`${hotel.stars} stars`}
                >
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="size-3.5" fill="currentColor" aria-hidden />
                  ))}
                </span>
              )}
              {hotel.distanceMeters && (
                <p className="mt-1 text-meta text-stone">{hotel.distanceMeters}m from the Haram</p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
