import { Link } from "@/i18n/navigation";

// guide.md §5.3: "Cancellation and refunds — portal rules + Junaidi's own
// terms." The portal governs Hajj refunds directly; Junaidi's own terms
// are a legal placeholder pending counsel (CLIENT-TODO.md) — not invented.
export function CancellationNotice({ portalUrl }: { portalUrl: string }) {
  return (
    <div>
      <h2 className="font-display text-h2">Cancellation and refunds</h2>
      <p className="mt-3 max-w-prose text-stone">
        Hajj 2027 cancellations and refunds are governed by the rules of the official{" "}
        <a
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Pak Hajj portal
        </a>
        , since payment is made there, not to Junaidi directly. Junaidi&rsquo;s own cancellation
        terms are being finalised with legal counsel — see our{" "}
        <Link href="/cancellation-policy" className="underline underline-offset-4">
          cancellation policy
        </Link>
        .
      </p>
    </div>
  );
}
