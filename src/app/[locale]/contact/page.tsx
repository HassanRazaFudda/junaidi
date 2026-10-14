import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { InquiryForm } from "@/components/forms/inquiry-form.client";
import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { getSiteSettings } from "@/content/queries";
import { routing } from "@/i18n/routing";

// guide.md §5.9: office map, landline, WhatsApp, email, hours, and the
// short inquiry form. Email resolved via Facebook's own Contact info page
// (DECISIONS.md #5z+7); hours are still unconfirmed (CLIENT-TODO.md) —
// omitted rather than guessed. Never asks for passport/CNIC.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const site = await getSiteSettings();

  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-h1">Contact</h1>
          <address className="mt-4 text-lead text-stone not-italic">
            {site.office.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-4">
            <a href={`tel:${site.landline.replace(/\D/g, "")}`} className="hover:text-crimson">
              {site.landline}
            </a>
          </p>
          {site.email && (
            <p className="mt-1">
              <a href={`mailto:${site.email}`} className="hover:text-crimson">
                {site.email}
              </a>
            </p>
          )}
          <div className="mt-6">
            <PlaceholderMedia
              assetId="contact-map"
              description="Office map pin (Mona Square)"
              aspect="aspect-[4/3]"
            />
          </div>
        </div>
        <div>
          <h2 className="font-display text-h2">Send us an inquiry</h2>
          <div className="mt-4">
            <InquiryForm whatsappNumber={site.whatsappNumber} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
