import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getCurrentHajjSeason } from "@/content/queries";

// code.md §4: "hub → redirects or links to current season." Takes `params`
// directly (not next-intl's getLocale()) and calls setRequestLocale, like
// every other page here — needed for this to stay statically prerenderable
// under Cache Components.
export default async function HajjHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const season = await getCurrentHajjSeason();
  redirect({ href: season ? `/hajj/${season.slug}` : "/", locale });
}
