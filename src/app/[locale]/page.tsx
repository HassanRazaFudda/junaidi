import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// Checkpoint 1 placeholder: proves the layout shell (season strip, header,
// footer, sticky bar) renders end to end. Full Home (guide.md §5.1 — hero,
// services index, credentials, the route, packages preview, past groups,
// reviews, office) is built in Checkpoint 2.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section>
      <Container>
        <h1 className="font-display text-display">Junaidi Group</h1>
        <p className="mt-4 max-w-prose text-lead text-stone">
          Hajj and Umrah from Karachi, with a team that travels with you. Full homepage content
          ships in Checkpoint 2.
        </p>
      </Container>
    </Section>
  );
}
