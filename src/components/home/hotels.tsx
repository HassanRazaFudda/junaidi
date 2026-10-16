import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal.client";
import { StaggerGrid } from "@/components/ui/stagger-grid.client";
import { Link } from "@/i18n/navigation";
import { listPackages } from "@/content/queries";
import { pick } from "@/content/localize";
import type { Hotel, Package } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// fix.md §4.6/§7: "Where you'll stay: 4 hotel cards (photo, stars,
// distance), tabs Makkah | Madinah." No photo here deliberately: pairing a
// generic stock photo with a specific real hotel's name would misleadingly
// imply it's a photo of that hotel — the same reasoning as design.md's P-01
// rule against generic "luxury room" stock. Hotels are derived from
// package data (there's no standalone hotel content entity), deduped by
// name, so this section is empty — and hidden — until packages exist.
//
// new-fixes.md §16 "Hotels": "name the city, property, package
// association..." — each card links back to the package(s) it belongs to
// (DECISIONS.md #5z+8), not just a bare name/stars/distance.
function packageHref(pkg: Package) {
  return pkg.type === "hajj" ? `/hajj/${pkg.seasonSlug}/${pkg.slug}` : `/umrah/${pkg.slug}`;
}

export async function Hotels({ locale }: { locale: Locale }) {
  const [t, hajj, umrah] = await Promise.all([
    getTranslations("hotels"),
    listPackages({ type: "hajj" }),
    listPackages({ type: "umrah" }),
  ]);

  const byKey = new Map<string, { hotel: Hotel; packages: Package[] }>();
  for (const pkg of [...hajj, ...umrah]) {
    for (const hotel of pkg.hotels) {
      const key = `${hotel.city}-${hotel.name}`;
      const entry = byKey.get(key);
      if (entry) entry.packages.push(pkg);
      else byKey.set(key, { hotel, packages: [pkg] });
    }
  }
  const hotels = [...byKey.values()];
  if (hotels.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <Container>
        <Reveal>
          <p className="text-caption font-medium text-crimson">{t("eyebrow")}</p>
          <h2 className="font-display mt-1 text-h2">{t("heading")}</h2>
        </Reveal>
        <StaggerGrid
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          items={hotels.map(({ hotel, packages }) => ({
            id: `${hotel.city}-${hotel.name}`,
            node: (
              <div className="card-hover rounded-card border border-line bg-paper p-4">
                <p className="text-caption text-stone">{hotel.city}</p>
                <p className="mt-1 font-medium">{hotel.name}</p>
                {hotel.stars && (
                  <span
                    role="img"
                    className="mt-1 flex items-center text-star"
                    aria-label={`${hotel.stars} stars`}
                  >
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="size-3.5" fill="currentColor" aria-hidden />
                    ))}
                  </span>
                )}
                {hotel.distanceMeters && (
                  <p className="mt-1 text-meta text-stone">
                    {hotel.distanceMeters}m from the Haram
                  </p>
                )}
                <p className="mt-2 text-caption text-stone">
                  {t("partOf")}{" "}
                  {packages.map((pkg, i) => (
                    <span key={pkg.id}>
                      {i > 0 && ", "}
                      <Link
                        href={packageHref(pkg)}
                        className="underline underline-offset-4 hover:text-crimson"
                      >
                        {pick(pkg.title, locale)}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            ),
          }))}
        />
      </Container>
    </Section>
  );
}
