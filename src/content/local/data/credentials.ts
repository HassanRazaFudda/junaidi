import "server-only";
import type { z } from "zod";
import type { Credential } from "@/content/schema";

// All four records below are real and sourced (guide.md §1.1–1.2) but every
// one is `verifiedByClient: false` — per the brief, none render on the site
// until the client confirms in writing. The local adapter filters on this
// flag, so this file can carry the real citations today and ship instantly
// later by flipping one boolean per record, with zero invented facts in the
// meantime (DECISIONS.md #3).
//
// Not included here: the Umrah 2025–26 attestation (guide.md §1.4). guide.md
// gives no citable URL for that specific list (only a 2021–22 list is
// linked in its Sources section) — rather than attach the wrong source
// document, this credential isn't modelled until the client supplies the
// real 2025–26 list URL (DECISIONS.md #4, CLIENT-TODO.md).
export const credentials: z.input<typeof Credential>[] = [
  {
    id: "hajj-2027-al-wakeel",
    label: { en: "Hajj 2027 — operated through Al Wakeel Munazzam (Pvt) Ltd" },
    issuer: "Ministry of Religious Affairs (MoRA), Pakistan",
    validity: "Hajj 2027 season",
    sourceUrl: "https://www.mora.gov.pk/SiteImage/Misc/files/030826_PRLissuedHaj27.pdf",
    checkedOn: "2026-10-12",
    verifiedByClient: false,
  },
  {
    id: "dts-2357",
    label: { en: "DTS licence 2357" },
    number: "2357",
    issuer: "Directorate of Tourist Services (DTS) — via Ibadat.pk directory, pending certificate",
    validity: "Not yet verified against the original certificate",
    sourceUrl: "https://ibadat.pk/verified-hajj-group-organizers/junaidi-air-travel-tours-pvt-ltd/",
    checkedOn: "2026-10-12",
    verifiedByClient: false,
  },
  {
    id: "iata-27-31139-5",
    label: { en: "IATA accreditation 27-31139-5" },
    number: "27-31139-5",
    issuer: "IATA — via Ibadat.pk directory, pending certificate",
    validity: "Not yet verified against the original certificate",
    sourceUrl: "https://ibadat.pk/verified-hajj-group-organizers/junaidi-air-travel-tours-pvt-ltd/",
    checkedOn: "2026-10-12",
    verifiedByClient: false,
  },
  {
    id: "hgo-4299",
    label: { en: "Hajj Group Organiser (HGO) enrolment 4299" },
    number: "4299",
    issuer: "MoRA — via Ibadat.pk directory, pending certificate",
    validity: "Not yet verified against the original certificate",
    sourceUrl: "https://ibadat.pk/verified-hajj-group-organizers/junaidi-air-travel-tours-pvt-ltd/",
    checkedOn: "2026-10-12",
    verifiedByClient: false,
  },
];
