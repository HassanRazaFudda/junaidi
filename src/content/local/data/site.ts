import "server-only";
import { env } from "@/lib/env";
import type { z } from "zod";
import type { SiteSettings } from "@/content/schema";

// Confirmed facts only — guide.md §1.1 (no "verify" flag on these rows).
// Email is deliberately omitted: guide.md §1.5 found conflicting addresses
// in use (Gmail on Facebook vs. junaidigroup.com elsewhere) with no single
// confirmed canonical address. See CLIENT-TODO.md.
export const site: z.input<typeof SiteSettings> = {
  legalName: "Junaidi Air Travels & Tours (Pvt) Ltd",
  brandName: "Junaidi Group",
  office: {
    addressLines: [
      "Suite 7–8, Mezzanine Floor, Mona Square",
      "Jahangir Road, near Kanzul Iman Masjid",
      "Gurumandir, Karachi",
    ],
  },
  landline: "021-34130184-88",
  // Read from env, not hardcoded: guide.md's "Known facts" — the mobile/
  // WhatsApp number is unconfirmed (two conflicting numbers reported,
  // guide.md §1.1) — the client supplies the real value via deployment env.
  whatsappNumber: env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  facebookUrl: "https://www.facebook.com/Junaidigroup/",
};
