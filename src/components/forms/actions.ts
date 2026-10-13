"use server";

import "server-only";
import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/lib/env";

const Inquiry = z.object({
  // Optional: fix.md §4.2's quick inquiry bar (service/month/travellers/
  // WhatsApp number only, no name field) reuses this same action — the
  // full contact-form page still requires a name via its own required
  // field attribute, this just lets the schema accept either submitter.
  name: z.string().trim().min(2).max(80).optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{10,16}$/, "Enter a phone or WhatsApp number with country code"),
  service: z.enum(["hajj", "umrah", "flights", "visa", "holiday", "other"]),
  packageSlug: z.string().max(80).optional(),
  city: z.string().trim().max(60).optional(),
  month: z.string().trim().max(30).optional(),
  travellers: z.coerce.number().int().min(1).max(60),
  message: z.string().trim().max(1000).optional(),
  company: z.string().max(0).optional(), // honeypot: must stay empty
});

export type InquiryState =
  | { status: "idle" }
  | { status: "error"; fieldErrors: Partial<Record<keyof z.infer<typeof Inquiry>, string[]>> }
  | { status: "server-error" }
  | { status: "sent" };

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const parsed = Inquiry.safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  if (parsed.data.company) return { status: "sent" }; // silently drop bots

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: env.INQUIRY_FROM_EMAIL,
      to: env.INQUIRY_TO_EMAIL,
      subject: `New ${parsed.data.service} inquiry — ${parsed.data.name ?? "quick inquiry bar"}`,
      text: JSON.stringify(parsed.data, null, 2),
    });
    if (error) throw error;
  } catch (err) {
    // A transient email-sending failure shouldn't crash the page for
    // someone who just filled in a real inquiry — show a message pointing
    // them to WhatsApp instead of an unhandled error.
    console.error("submitInquiry: failed to send", err);
    return { status: "server-error" };
  }

  return { status: "sent" };
}
