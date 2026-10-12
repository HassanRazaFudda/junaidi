import { setRequestLocale } from "next-intl/server";
import { PendingLegalPage } from "@/components/ui/pending-legal-page";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CancellationPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PendingLegalPage
      title="Cancellation policy"
      covers={[
        "That Hajj refunds are governed by the official portal, not Junaidi directly",
        "Junaidi's own cancellation terms for services it does bill directly",
        "Timelines and how to request a cancellation",
      ]}
    />
  );
}
