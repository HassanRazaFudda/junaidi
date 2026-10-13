import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { HajjStepperEnhancer } from "@/components/route/hajj-stepper.enhancer";
import { routeStops } from "@/content/route-stops";

// fix.md §3.2/§11 step 7: the pinned home-page route is gone for good —
// this is its replacement, "a compact horizontal 'Hajj in 5 days' stepper
// on the Hajj page (no pinning)." fix.md §8 names the 5 steps: Mina,
// Arafat, Muzdalifah, Jamarat, Tawaf — a condensed subset of the existing
// 8-stop `routeStops` (dropping the pre-Hajj Umrah arrival, the "stone
// Jamarat again" repeat days, and the optional Madinah visit, which the
// package-detail Itinerary component already covers in full). These are
// the SAME real, scholar-review-pending stops as before, not new content —
// just chosen and relabelled for a shorter overview. "What our team does"
// is dropped here (it was always a pending-client placeholder note, not
// real content, and this stepper is explicitly meant to be compact); "what
// you do" per stop stays, since that's real liturgical content.
//
// Every dot/label below is also a real `<a href="#hajj-step-{id}">` jump
// link to its detail block — functional keyboard/no-JS navigation, not
// just decoration. HajjStepperEnhancer only ever adds the scroll-linked
// fill/light-up animation on top of this already-complete markup.
const STEP_IDS = ["mina", "arafat", "muzdalifah", "jamarat", "farewell-tawaf"] as const;
const STEP_LABELS: Record<(typeof STEP_IDS)[number], string> = {
  mina: "Mina",
  arafat: "Arafat",
  muzdalifah: "Muzdalifah",
  jamarat: "Jamarat",
  "farewell-tawaf": "Tawaf",
};

export async function HajjStepper() {
  const t = await getTranslations("route");
  const steps = STEP_IDS.map((id) => {
    const stop = routeStops.find((s) => s.id === id);
    return stop ? { ...stop, shortLabel: STEP_LABELS[id] } : null;
  }).filter((s): s is NonNullable<typeof s> => s !== null);
  if (steps.length === 0) return null;

  return (
    <Section data-hajj-stepper className="border-t border-line">
      <Container>
        <h2 className="font-display text-h2">{t("heading")}</h2>
        <p className="mt-2 max-w-prose text-stone">{t("subheading")}</p>
        <p className="mt-2 max-w-prose text-caption text-stone italic">{t("scholarReviewNote")}</p>

        <div className="hajj-stepper-track relative mt-12 hidden md:block">
          <div className="absolute inset-x-0 top-[5px] h-0.5 bg-line" />
          <div className="hajj-stepper-fill absolute inset-y-0 start-0 top-[5px] h-0.5 w-0 bg-crimson" />
          <ol className="relative grid grid-cols-5">
            {steps.map((step) => (
              <li key={step.id} className="flex justify-center">
                <a
                  href={`#hajj-step-${step.id}`}
                  className="hajj-stepper-step flex flex-col items-center gap-3 text-center"
                >
                  <span
                    aria-hidden
                    className="hajj-stepper-dot relative z-10 size-3 rounded-full bg-haze ring-4 ring-marble transition-colors"
                  />
                  <span className="hajj-stepper-label text-caption font-medium text-stone transition-colors">
                    {step.shortLabel}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <ol className="mt-12 space-y-10 md:mt-16">
          {steps.map((step) => (
            <li
              key={step.id}
              id={`hajj-step-${step.id}`}
              data-hajj-step={step.id}
              className="scroll-mt-24 md:grid md:grid-cols-[140px_1fr] md:gap-8"
            >
              <p className="text-caption font-medium text-crimson">{step.dateLabel}</p>
              <div>
                <h3 className="font-display text-h3">{step.place}</h3>
                <div className="mt-2">
                  <p className="text-small font-medium text-stone">{t("youDo")}</p>
                  <p className="mt-1">{step.youDo}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
      <HajjStepperEnhancer stepIds={steps.map((s) => s.id)} />
    </Section>
  );
}
