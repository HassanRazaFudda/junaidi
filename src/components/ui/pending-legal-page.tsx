import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";

// prompt.md: "Privacy, terms, cancellation and complaints pages as
// structured placeholders marked TODO(client/legal)." Honest pending state
// (code.md §0 rule 6), not invented legal text.
export function PendingLegalPage({ title, covers }: { title: string; covers: string[] }) {
  return (
    <Section>
      <Container className="max-w-2xl">
        <h1 className="font-display text-h1">{title}</h1>
        <p className="mt-4 max-w-prose text-lead text-stone">
          This page is being finalised with the client&rsquo;s legal counsel and will be published
          before launch.
        </p>
        <div className="mt-6 rounded-panel border border-line bg-paper p-6">
          <p className="font-medium">Planned to cover</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-stone">
            {covers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-stone">
          Questions in the meantime?{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-crimson">
            Contact us
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
