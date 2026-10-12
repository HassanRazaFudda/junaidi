import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { RouteMap } from "@/components/route/route-map";
import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { ManasikRouteEnhancer } from "@/components/route/manasik-route.enhancer";
import { routeStops } from "@/content/route-stops";

// guide.md §5.1 row 5 / design.md §5.2 (mobile) + §7.3. This server-rendered
// markup IS the complete, accessible content — fully readable with JS off
// and with reduced motion, which is what every visitor gets regardless of
// viewport. On capable desktops, ManasikRouteEnhancer progressively adds
// the GSAP-pinned scroll experience on top of this same markup by toggling
// `data-enhanced` (code.md §11.3) — it never replaces or hides content,
// only repositions it via CSS (see globals.css ".route-stage").
export async function ManasikRoute() {
  const t = await getTranslations("route");
  const stopIds = routeStops.map((s) => s.id);

  return (
    <Section data-route className="route-root border-t border-line bg-route-bg text-route-ink">
      <Container>
        <h2 className="font-display text-h2">{t("heading")}</h2>
        <p className="mt-2 max-w-prose text-stone">{t("subheading")}</p>
        <p className="mt-2 max-w-prose text-caption text-stone italic">{t("scholarReviewNote")}</p>

        <div className="route-stage mt-8">
          <div className="route-map-wrap flex justify-center">
            <RouteMap stops={routeStops} />
          </div>

          <ol className="route-panels">
            {routeStops.map((stop, i) => (
              <li
                key={stop.id}
                data-panel={stop.id}
                className="route-panel grid gap-6 py-10 first:pt-0 md:grid-cols-2 md:items-center md:py-0"
              >
                <div>
                  <p className="text-caption text-crimson">{stop.dateLabel}</p>
                  <h3 className="font-display text-h3">{stop.place}</h3>
                  <div className="mt-3">
                    <p className="text-small font-medium text-stone">{t("youDo")}</p>
                    <p className="mt-1">{stop.youDo}</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-small font-medium text-stone">{t("weDo")}</p>
                    <p className="mt-1 text-stone italic">{t("pendingTeamNote")}</p>
                  </div>
                </div>
                <PlaceholderMedia
                  assetId={`R-0${i + 3}`}
                  description={stop.assetDescription}
                  aspect="aspect-[3/2]"
                />
              </li>
            ))}
          </ol>
        </div>
      </Container>
      <ManasikRouteEnhancer stopIds={stopIds} />
    </Section>
  );
}
