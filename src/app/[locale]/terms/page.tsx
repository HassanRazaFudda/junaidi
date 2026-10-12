import { setRequestLocale } from "next-intl/server";
import { PendingLegalPage } from "@/components/ui/pending-legal-page";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PendingLegalPage
      title="Terms of service"
      covers={[
        "What Junaidi does and doesn't guarantee (guide.md §2: no guaranteed visas or seats)",
        "How inquiries and bookings work with the official Hajj/Umrah portals",
        "Liability and dispute resolution",
      ]}
    />
  );
}
