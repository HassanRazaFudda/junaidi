import { getTranslations } from "next-intl/server";
import {
  Landmark,
  BadgeCheck,
  Plane,
  Users,
  CalendarCheck,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SampleBadge } from "@/components/ui/sample-badge";
import { listCredentials } from "@/content/queries";
import { pick } from "@/content/localize";
import { env } from "@/lib/env";
import type { Locale } from "@/i18n/routing";

// fix.md §4.3: "Each with an icon or official logo." Generic lucide icons,
// not official org logos — the footer's badge row (added separately,
// DECISIONS.md #5z) already carries the compliance weight of displaying
// real third-party marks; this strip doesn't need to repeat that. Keyed by
// Credential.id so a future credential added to the data layer still gets
// a sensible icon without a code change.
const credentialIcons: Record<string, LucideIcon> = {
  "hajj-2027-al-wakeel": Landmark,
  "dts-2357": BadgeCheck,
  "iata-27-31139-5": Plane,
  "hgo-4299": Users,
};

// fix.md §4.3: "Five items... IATA accredited agent · Umrah operator,
// MoRA attested · Hajj 2027 via Al Wakeel Munazzam · Since 2005 · Office
// at Mona Square, Karachi. ... In demo mode show all; in production show
// only verifiedByClient: true items."
//
// "Since 2005" is deliberately NOT one of those real, sourced items: guide.md
// §1.1 flags it explicitly as "Company self-description only. Verify
// before publishing 'since 2005'" — an unverified claim with no citable
// source (Credential.sourceUrl is required; there's nothing to cite here,
// same reasoning as DECISIONS.md #4's Umrah-attestation gap). It only
// appears in demo mode, sample-labelled, never in live mode. The office
// address item is a confirmed fact (no "verify" flag in guide.md §1.1), so
// it always shows.
export async function TrustStrip({ locale }: { locale: Locale }) {
  const [t, credentials] = await Promise.all([getTranslations("trustStrip"), listCredentials()]);
  const isDemo = env.NEXT_PUBLIC_CONTENT_MODE === "demo";

  if (credentials.length === 0 && !isDemo) {
    // Nothing confirmed yet and we're not in demo mode — only the office
    // fact would show, which isn't really a "trust strip" on its own.
    return null;
  }

  const items = (
    <>
      {credentials.map((c) => {
        const Icon = credentialIcons[c.id] ?? BadgeCheck;
        return (
          <li key={c.id} className="flex items-center gap-1.5">
            <Icon className="size-4 shrink-0 text-crimson" aria-hidden />
            <Link href="/about/credentials" className="hover:text-crimson">
              {pick(c.label, locale)}
            </Link>
            {!c.verifiedByClient && <SampleBadge className="ms-1 inline" />}
          </li>
        );
      })}
      {isDemo && (
        <li className="flex items-center gap-1.5">
          <CalendarCheck className="size-4 shrink-0 text-crimson" aria-hidden />
          <span>Since 2005</span>
          <SampleBadge className="ms-1 inline" />
        </li>
      )}
      <li className="flex items-center gap-1.5">
        <MapPin className="size-4 shrink-0 text-crimson" aria-hidden />
        {t("officeItem")}
      </li>
    </>
  );

  return (
    // fix.md §4.3's 5-item strip auto-scrolls like a marquee — the content
    // is duplicated once (second copy aria-hidden, for screen readers) so
    // the CSS animation can loop seamlessly from 0 to -50%. Under reduced
    // motion, globals.css swaps this back to the original manually
    // scrollable list instead of a frozen half-visible track: the
    // duplicate is hidden and overflow goes back to auto so no credential
    // item is ever lost, only the auto-slide is removed.
    <div className="trust-strip-wrap min-w-0 touch-pan-x overflow-hidden overscroll-x-contain border-y border-line bg-paper">
      <div className="trust-strip-track flex w-max gap-6 py-4 text-meta whitespace-nowrap">
        <ul className="flex shrink-0 gap-6">{items}</ul>
        <ul className="trust-strip-copy flex shrink-0 gap-6" aria-hidden>
          {items}
        </ul>
      </div>
    </div>
  );
}
