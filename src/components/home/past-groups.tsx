import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { YoutubeFacade } from "@/components/media/youtube-facade.client";
import { listVideos } from "@/content/queries";
import { pick } from "@/content/localize";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1 row 7: "Real footage. Only season-labelled client footage."
// Hidden entirely (not a pending notice) when there's nothing to show —
// every video is gated on a human reviewing it first (CLIENT-TODO.md).
export async function PastGroups({ locale }: { locale: Locale }) {
  const [t, videos] = await Promise.all([getTranslations("pastGroups"), listVideos()]);
  if (videos.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <Container>
        <h2 className="font-display text-h2">{t("heading")}</h2>
        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2">
          {videos.map((v) => (
            <YoutubeFacade
              key={v.youtubeId}
              youtubeId={v.youtubeId}
              title={pick(v.title, locale)}
              seasonLabel={v.seasonLabel}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
