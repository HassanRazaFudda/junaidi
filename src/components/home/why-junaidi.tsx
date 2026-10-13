import { getTranslations } from "next-intl/server";
import { Users, GraduationCap, Tent, Headset, Building2, MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SampleBadge } from "@/components/ui/sample-badge";
import { Reveal } from "@/components/ui/reveal.client";
import { StaggerGrid } from "@/components/ui/stagger-grid.client";
import { env } from "@/lib/env";

// fix.md §4.4: 6 points, "Draft points to confirm with the client" — by
// fix.md's own description these are proposed marketing copy, not
// confirmed operational facts (e.g. "Scholar-led Hajj training" is an
// operational claim no different in kind from the package facts
// DECISIONS.md #5 won't invent). Demo-mode-only and sample-labelled, same
// treatment as the sample packages, until the client actually confirms
// which of these are true and approves the wording.
const points = [
  {
    Icon: Users,
    title: "Group leaders travel with you",
    body: "A Junaidi group leader accompanies every departure, start to finish.",
  },
  {
    Icon: GraduationCap,
    title: "Scholar-led Hajj training",
    body: "Pre-departure manasik training in Karachi, led by a scholar.",
  },
  {
    Icon: Tent,
    title: "VIP Mina and Arafat arrangements",
    body: "See our Hajj 2025 footage for the camps and halls we arranged.",
  },
  {
    Icon: Headset,
    title: "Saudi-side support team",
    body: "A local team on call throughout your stay in the Kingdom.",
  },
  {
    Icon: Building2,
    title: "Visa, tickets and hotels",
    body: "Everything under one roof — one point of contact, start to finish.",
  },
  {
    Icon: MapPin,
    title: "A real office you can visit",
    body: "Mona Square, Karachi — come in and talk to us in person.",
  },
] as const;

export async function WhyJunaidi() {
  if (env.NEXT_PUBLIC_CONTENT_MODE !== "demo") return null;
  const t = await getTranslations("whyJunaidi");

  return (
    <Section className="border-t border-line">
      <Container>
        <Reveal>
          <p className="text-caption font-medium text-crimson">{t("eyebrow")}</p>
          <h2 className="font-display mt-1 text-h2">{t("heading")}</h2>
        </Reveal>
        <StaggerGrid
          className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          items={points.map(({ Icon, title, body }) => ({
            id: title,
            node: (
              <div>
                <Icon className="size-7 text-crimson" aria-hidden />
                <p className="mt-3 font-medium">{title}</p>
                <p className="mt-1 text-meta text-stone">{body}</p>
              </div>
            ),
          }))}
        />
        <SampleBadge className="mt-6" />
      </Container>
    </Section>
  );
}
