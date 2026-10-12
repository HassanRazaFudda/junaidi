import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { listReviews } from "@/content/queries";
import { pick } from "@/content/localize";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1 row 8: "hidden until real reviews exist." No seeded reviews
// in Phase 1 (Review.consent can't be fabricated) — CLIENT-TODO.md.
export async function Reviews({ locale }: { locale: Locale }) {
  const [t, reviews] = await Promise.all([getTranslations("reviews"), listReviews()]);
  if (reviews.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <Container>
        <h2 className="font-display text-h2">{t("heading")}</h2>
        <ul className="mt-6 grid gap-8 md:grid-cols-2">
          {reviews.map((r) => (
            <li key={r.id}>
              <blockquote className="text-lead">&ldquo;{pick(r.text, locale)}&rdquo;</blockquote>
              <p className="mt-2 text-small text-stone">
                — {r.author}, {r.season} ({r.source === "google" ? "Google review" : r.source},{" "}
                {r.date})
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
