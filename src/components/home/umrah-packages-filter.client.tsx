"use client";

import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; month: string | null; tier: string | null; node: ReactNode };

const ALL = "all";

// fix.md §7: "Tabs: Rabi ul Awwal | Rajab | Shaban | Ramadan | All. Tier
// filter: All | Economy | Standard | Premium." Plain toggle-button groups,
// not a tablist widget — month and tier combine with AND, so there's no
// single "selected tab" that owns the panel. fix.md §8 asks for a sliding
// active pill (`layoutId`) here; that's Step 6 motion scope (this is Step
// 5, no-motion pass) — the active state is a plain class swap for now.
export function UmrahPackagesFilter({ items, allLabel }: { items: Item[]; allLabel: string }) {
  const months = useMemo(
    () => [...new Set(items.map((i) => i.month).filter((m): m is string => m !== null))],
    [items],
  );
  const tiers = useMemo(
    () => [...new Set(items.map((i) => i.tier).filter((t): t is string => t !== null))],
    [items],
  );
  const [month, setMonth] = useState(ALL);
  const [tier, setTier] = useState(ALL);

  const filtered = items.filter(
    (i) => (month === ALL || i.month === month) && (tier === ALL || i.tier === tier),
  );

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-6">
        {months.length > 1 && (
          <FilterGroup
            label="Month"
            value={month}
            onChange={setMonth}
            options={months}
            allLabel={allLabel}
          />
        )}
        {tiers.length > 1 && (
          <FilterGroup
            label="Tier"
            value={tier}
            onChange={setTier}
            options={tiers}
            allLabel={allLabel}
          />
        )}
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li key={item.id}>{item.node}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-small text-stone">No packages match that filter yet.</p>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {[ALL, ...options].map((opt) => (
        <button
          key={opt}
          type="button"
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            "min-h-9 rounded-full border px-3.5 text-small font-medium transition-colors",
            value === opt
              ? "border-crimson bg-crimson text-paper"
              : "border-line bg-paper text-ink hover:border-crimson/50",
          )}
        >
          {opt === ALL ? allLabel : opt}
        </button>
      ))}
    </div>
  );
}
