import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { RouteMap } from "@/components/route/route-map";
import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { routeStops } from "@/content/route-stops";

// guide.md §5.1 row 5 / design.md §5.2 (mobile) + §7.3. This is the
// Checkpoint 2 static, stacked, no-pinning version — fully readable with JS
// off and with reduced motion, which is what every visitor gets regardless
// of viewport until Checkpoint 3 adds the desktop GSAP-pinned enhancement
// on top of this same server-rendered markup (code.md §11.3).
export async function ManasikRoute() {
  const t = await getTranslations("route");

  return (
    <Section data-route className="border-t border-line bg-route-bg text-route-ink">
      <Container>
        <h2 className="font-display text-h2">{t("heading")}</h2>
        <p className="mt-2 max-w-prose text-stone">{t("subheading")}</p>
        <p className="mt-2 max-w-prose text-caption text-stone italic">{t("scholarReviewNote")}</p>

        <div className="mt-8 flex justify-center">
          <RouteMap stops={routeStops} />
        </div>

        <ol className="mt-10 space-y-10">
          {routeStops.map((stop) => (
            <li
              key={stop.id}
              data-panel={stop.id}
              className="grid gap-6 md:grid-cols-2 md:items-center"
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
                assetId={`R-0${routeStops.indexOf(stop) + 3}`}
                description={stop.assetDescription}
                aspect="aspect-[3/2]"
              />
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
