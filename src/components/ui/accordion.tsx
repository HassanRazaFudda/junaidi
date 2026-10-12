// Native <details>/<summary>: keyboard-operable and fully functional with
// JS off, for free. design.md §7.2 catalogues an animated open/close for
// this — that's layered on in Checkpoint 3 (Motion height animation);
// this static version is what reduced-motion and no-JS visitors always get.
export function Accordion({
  items,
}: {
  items: { id: string; question: string; answer: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.id} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-body font-medium marker:content-none">
            {item.question}
            <span aria-hidden className="shrink-0 text-stone group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-stone">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
