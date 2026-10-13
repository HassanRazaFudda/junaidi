import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { listReviews } from "@/content/queries";
import { pick } from "@/content/localize";
import { SampleBadge } from "@/components/ui/sample-badge";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1 row 8: "hidden until real reviews exist." No real seeded
// reviews in Phase 1 (Review.consent can't be fabricated) — CLIENT-TODO.md.
// fix.md §5.2 adds 3 clearly-labelled sample testimonials in demo mode
// only, so the section isn't empty on the review build. fix.md §7: "3 quote
// cards with name + season + source."
export async function Reviews({ locale }: { locale: Locale }) {
  const [t, reviews] = await Promise.all([getTranslations("reviews"), listReviews(3)]);
  if (reviews.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <Container>
        <p className="text-caption font-medium text-crimson">{t("eyebrow")}</p>
        <h2 className="font-display mt-1 text-h2">{t("heading")}</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="card-hover flex h-full flex-col rounded-card border border-line bg-paper p-6"
            >
              <blockquote className="flex-1 text-small">
                &ldquo;{pick(r.text, locale)}&rdquo;
              </blockquote>
              <p className="mt-4 text-meta text-stone">
                <span className="font-medium text-ink">{r.author}</span>, {r.season} ·{" "}
                {r.source === "google" ? "Google review" : r.source}
              </p>
              {r.sample && <SampleBadge className="mt-2" />}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
