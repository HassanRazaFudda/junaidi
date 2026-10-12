import type { RouteStop } from "@/content/route-stops";

// design.md §7.3 R-01: "SVG drawn by the designer from OpenStreetMap
// shapes... credit 'Map data © OpenStreetMap contributors.'" This agent
// can't trace real OSM geography by hand, so this is a schematic stand-in —
// an abstract flowing path through the stops, not a geographic trace — and
// deliberately carries NO OpenStreetMap credit, since that would misstate
// where it came from. A real designer pass replacing this with an actual
// traced map is tracked in ASSETS-NEEDED.md (R-01).
//
// IDs match design.md's convention (#seg-{id}, #pin-{id}) so the
// Checkpoint 3 GSAP enhancer can target them without changing this markup.
export function RouteMap({ stops, activeId }: { stops: RouteStop[]; activeId?: string }) {
  const n = stops.length;
  const points = stops.map((s, i) => ({
    id: s.id,
    x: 40 + (i % 2 === 0 ? 0 : 60),
    y: 20 + i * (260 / Math.max(n - 1, 1)),
  }));

  return (
    <svg
      viewBox="0 0 140 300"
      className="h-auto w-full max-w-xs"
      role="img"
      aria-label="The route from Makkah through the days of Hajj to Madinah"
    >
      {points.slice(0, -1).map((p, i) => {
        const next = points[i + 1];
        if (!next) return null;
        const stop = stops[i];
        if (!stop) return null;
        return (
          <path
            key={stop.id}
            id={`seg-${stop.id}`}
            d={`M ${p.x} ${p.y} L ${next.x} ${next.y}`}
            stroke="var(--color-crimson)"
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />
        );
      })}
      {points.map((p, i) => {
        const stop = stops[i];
        if (!stop) return null;
        const active = stop.id === activeId;
        return (
          <circle
            key={p.id}
            id={`pin-${stop.id}`}
            cx={p.x}
            cy={p.y}
            r={active ? 7 : 4}
            fill={active ? "var(--color-crimson)" : "var(--color-stone)"}
            stroke={active ? "var(--color-crimson)" : "none"}
            strokeWidth={active ? 1 : 0}
          />
        );
      })}
    </svg>
  );
}
