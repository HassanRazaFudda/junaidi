import "server-only";
import type { z } from "zod";
import type { Season } from "@/content/schema";

// guide.md §1.2–1.3. credentialLine holds the real, sourced sentence so it's
// ready to ship the moment the client confirms — but pages must NOT render
// it verbatim until the linked Credential (id "hajj-2027-al-wakeel" in
// credentials.ts) has verifiedByClient: true. See DECISIONS.md #3 for why
// this is enforced at the rendering layer rather than on this field.
export const seasons: z.input<typeof Season>[] = [
  {
    slug: "2027",
    type: "hajj",
    name: { en: "Hajj 2027" },
    // Private Hajj 2027 booking deadline, 20 Nov 2026, Asia/Karachi (guide.md §1.3).
    bookingDeadline: "2026-11-20T23:59:00+05:00",
    officialPortalUrl: "https://hajj.mora.gov.pk",
    stripMessage: {
      en: "Private Hajj 2027 booking closes 20 November on the Pak Hajj app. See our packages.",
    },
    credentialLine: {
      en: "For Hajj 2027, Junaidi operates through Al Wakeel Munazzam (Pvt) Ltd, one of 25 companies recognised by the Ministry of Religious Affairs.",
    },
    sourceDocUrl: "https://www.mora.gov.pk/SiteImage/Misc/files/030826_PRLissuedHaj27.pdf",
    isCurrent: true,
  },
];
