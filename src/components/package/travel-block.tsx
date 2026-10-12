import type { Package } from "@/content/types";

// guide.md §5.3 "Travel": flights (airline if confirmed, baggage), ground
// transport. Renders nothing if flight details weren't given — no inventing
// an airline or baggage allowance.
export function TravelBlock({ pkg }: { pkg: Package }) {
  if (!pkg.flights) return null;

  return (
    <div>
      <h2 className="font-display text-h2">Travel</h2>
      <dl className="mt-4 space-y-2 text-stone">
        <div>
          <dt className="inline font-medium text-ink">Flights: </dt>
          <dd className="inline">
            {pkg.flights.included ? "Included" : "Not included"}
            {pkg.flights.airline && ` — ${pkg.flights.airline}`}
            {pkg.flights.baggage && ` (${pkg.flights.baggage} baggage)`}
          </dd>
        </div>
      </dl>
    </div>
  );
}
