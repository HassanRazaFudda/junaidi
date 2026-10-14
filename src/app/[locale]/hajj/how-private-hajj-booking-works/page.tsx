import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BookingSteps } from "@/components/package/booking-steps";
import { getCurrentHajjSeason } from "@/content/queries";
import { routing } from "@/i18n/routing";

// guide.md §5.2's evergreen guide: the same four real booking steps, with
// their own URL for SEO (code.md §9.1: "how to book private hajj 2027 Pak
// Hajj app"). "Pending scholar/client review" per prompt.md's checkpoint 2
// scope note.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HowPrivateHajjBookingWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const season = await getCurrentHajjSeason();
  if (!season) notFound();

  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="font-display text-h1">How private Hajj booking works</h1>
        <p className="mt-4 max-w-prose text-lead text-stone">
          Private Hajj 2027 bookings and payments happen only through the official Hajj Portal or
          the Pak Hajj app, never directly to Junaidi.
        </p>
        <p className="mt-2 text-caption text-stone italic">
          This sequence is pending review by the client&rsquo;s scholar before final publication.
        </p>
        <div className="mt-10">
          <BookingSteps portalUrl={season.officialPortalUrl} />
        </div>
      </Container>
    </Section>
  );
}
