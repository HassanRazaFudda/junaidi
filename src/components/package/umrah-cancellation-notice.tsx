import { Link } from "@/i18n/navigation";

// new-fixes.md §15.2/§15.10: package detail page should cover
// "cancellation/payment terms" and link policies from package pages.
// Umrah payment goes directly to Junaidi (unlike Hajj's government
// portal — see cancellation-notice.tsx), so there's no portal-rules
// framing needed here, just a link to the same real policy page
// (still a legal placeholder pending counsel, CLIENT-TODO.md — not
// invented terms).
export function UmrahCancellationNotice() {
  return (
    <div>
      <h2 className="font-display text-h2">Cancellation and refunds</h2>
      <p className="mt-3 max-w-prose text-stone">
        Payment for this package is made directly to Junaidi, not through a government portal. See
        our{" "}
        <Link href="/cancellation-policy" className="underline underline-offset-4">
          cancellation policy
        </Link>{" "}
        for timelines and terms.
      </p>
    </div>
  );
}
