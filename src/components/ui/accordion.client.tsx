"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import * as m from "motion/react-m";

// design.md §7.2: "Accordion | Motion | click | height: 0 → auto, 240ms |
// Instant [reduced motion]." WAI-ARIA accordion pattern: a <button> inside
// a heading, aria-expanded, controlling a region by id. MotionConfig's
// reducedMotion="user" (set app-wide in motion-provider.client.tsx) makes
// the 240ms collapse into the reduced-motion "instant" automatically.
export function Accordion({
  items,
}: {
  items: { id: string; question: string; answer: string }[];
}) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-start text-body font-medium"
              >
                {item.question}
                <Plus
                  aria-hidden
                  className={`size-4 shrink-0 text-stone transition-transform ${open ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={false}
              animate={{ height: open ? "auto" : 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-4 text-stone">{item.answer}</p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
