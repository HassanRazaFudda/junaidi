import "server-only";
import { env } from "@/lib/env";
import type { z } from "zod";
import type { SiteSettings } from "@/content/schema";

// Confirmed facts only — guide.md §1.1 (no "verify" flag on these rows).
// Email: guide.md §1.5 originally found two conflicting candidates (Gmail
// on Facebook vs. junaidigroup.com elsewhere). Resolved by checking
// Facebook's own "Contact info" page directly (not just a flyer graphic) —
// it lists junaiditravels@gmail.com as the page's own published email, the
// strongest available signal for which one the business actually uses day
// to day. See DECISIONS.md #5z+7.
export const site: z.input<typeof SiteSettings> = {
  legalName: "Junaidi Air Travels & Tours (Pvt) Ltd",
  brandName: "Junaidi Group",
  office: {
    addressLines: [
      "Suite 7–8, Mezzanine Floor, Mona Square",
      "Jahangir Road, near Kanzul Iman Masjid",
      "Gurumandir, Karachi, 07483",
    ],
  },
  landline: "021-34130184-88",
  email: "junaiditravels@gmail.com",
  // Read from env, not hardcoded: guide.md's "Known facts" — the mobile/
  // WhatsApp number is unconfirmed (two conflicting numbers reported,
  // guide.md §1.1) — the client supplies the real value via deployment env.
  whatsappNumber: env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  facebookUrl: "https://www.facebook.com/Junaidigroup/",
};
