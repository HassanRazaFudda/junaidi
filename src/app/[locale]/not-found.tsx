import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-xl text-center">
        <h1 className="font-display text-h1">Page not found</h1>
        <p className="mt-4 text-lead text-stone">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block underline underline-offset-4 hover:text-crimson"
        >
          Back to home
        </Link>
      </Container>
    </Section>
  );
}
