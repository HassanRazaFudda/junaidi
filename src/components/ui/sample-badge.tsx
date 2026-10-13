// fix.md §5.1: "Every sample item renders a small stone-coloured line
// 'Sample, for review' (card footer, or caption under images)."
export function SampleBadge({ className = "" }: { className?: string }) {
  return <p className={`text-caption text-stone ${className}`}>Sample, for review only</p>;
}
