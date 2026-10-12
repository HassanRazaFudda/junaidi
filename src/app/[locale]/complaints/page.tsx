import { setRequestLocale } from "next-intl/server";
import { PendingLegalPage } from "@/components/ui/pending-legal-page";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ComplaintsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PendingLegalPage
      title="Complaints"
      covers={[
        "How to raise a complaint and who handles it",
        "Expected response time",
        "Escalation path, including to MoRA where relevant for Hajj/Umrah services",
      ]}
    />
  );
}
