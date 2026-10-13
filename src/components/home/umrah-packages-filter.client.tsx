"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/cn";

type Item = { id: string; month: string | null; tier: string | null; node: ReactNode };

const ALL = "all";

// fix.md §7: "Tabs: Rabi ul Awwal | Rajab | Shaban | Ramadan | All. Tier
// filter: All | Economy | Standard | Premium." Plain toggle-button groups,
// not a tablist widget — month and tier combine with AND, so there's no
// single "selected tab" that owns the panel. fix.md §8: sliding active pill
// (`layoutId`, scoped per group so Month's pill never tries to animate
// into Tier's row) and the grid animates with `layout` + `AnimatePresence`
// as the filter changes.
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
            groupId="month"
            label="Month"
            value={month}
            onChange={setMonth}
            options={months}
            allLabel={allLabel}
          />
        )}
        {tiers.length > 1 && (
          <FilterGroup
            groupId="tier"
            label="Tier"
            value={tier}
            onChange={setTier}
            options={tiers}
            allLabel={allLabel}
          />
        )}
      </div>

      {filtered.length > 0 ? (
        <m.ul layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {filtered.map((item, index) => (
              <m.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {item.node}
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      ) : (
        <p className="mt-8 text-small text-stone">No packages match that filter yet.</p>
      )}
    </div>
  );
}

function FilterGroup({
  groupId,
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  groupId: string;
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
            "relative min-h-9 rounded-full border px-3.5 text-small font-medium transition-colors",
            value === opt
              ? "border-crimson text-paper"
              : "border-line bg-paper text-ink hover:border-crimson/50",
          )}
        >
          {value === opt && (
            <m.span
              layoutId={`filter-pill-${groupId}`}
              className="absolute inset-0 rounded-full bg-crimson"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative">{opt === ALL ? allLabel : opt}</span>
        </button>
      ))}
    </div>
  );
}
