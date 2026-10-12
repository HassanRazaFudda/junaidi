import { setRequestLocale } from "next-intl/server";
import { PendingLegalPage } from "@/components/ui/pending-legal-page";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PendingLegalPage
      title="Privacy policy"
      covers={[
        "What inquiry-form data is collected and why",
        "How WhatsApp conversations are handled",
        "How long data is kept, and who it's shared with",
        "Your rights over your own data",
      ]}
    />
  );
}
