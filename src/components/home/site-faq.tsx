import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion.client";
import { Reveal } from "@/components/ui/reveal.client";

// fix.md §2/§7: "FAQ — marble, 6 questions, two-column on desktop." Was
// originally demo-mode-only per fix.md §10's acceptance criteria, unlike
// WhyJunaidi's genuinely-unconfirmed claims — every answer here only
// restates facts already established and already live elsewhere in this
// codebase (the booking-steps copy, the no-Hajj-payment hard rule, the
// office address, the "2 office hours" reply claim CtaBand already shows
// live, unconditionally). Un-gated per new-fixes.md §16's FAQ spec and
// the user's explicit confirmation (DECISIONS.md #5z+10) rather than
// leaving genuinely real content hidden behind a stale demo-only scope.
// No SampleBadge here any more either — this was never sample content,
// just mislabelled as such by inheriting WhyJunaidi's treatment.
const faqs = [
  {
    q: "How does Hajj 2027 booking actually work?",
    a: "Compare our packages here, then book and pay only through the official Pak Hajj app or Hajj Portal. We never take Hajj payments directly; our team contacts you after for documents, training and departure.",
  },
  {
    q: "Can I pay Junaidi directly for Hajj?",
    a: "No. Hajj 2027 bookings and payments go only through the official government portal, per Ministry of Religious Affairs rules; we don't accept Hajj payments on this site or in person.",
  },
  {
    q: "How is Umrah booking different from Hajj?",
    a: "Umrah isn't tied to the government Hajj portal or its deadlines. Message us on WhatsApp or use the quick inquiry form and our team will walk you through availability and next steps.",
  },
  {
    q: "What's included in the price shown on a package?",
    a: "Each package card lists its own inclusions: visa, flights, transport and more vary by package, so check the chips on the specific package rather than assuming one price covers everything.",
  },
  {
    q: "How quickly do you reply?",
    a: "We reply within 2 office hours to WhatsApp messages and inquiry form submissions.",
  },
  {
    q: "Where is your office?",
    a: "Mona Square, Karachi. Our office is open during office hours if you'd rather come in and talk to us in person.",
  },
] as const;

export function SiteFaq() {
  const items = faqs.map((f, i) => ({ id: String(i), question: f.q, answer: f.a }));
  const left = items.slice(0, 3);
  const right = items.slice(3);

  return (
    <Section className="border-t border-line">
      <Container>
        <Reveal>
          <p className="text-caption font-medium text-crimson">FAQ</p>
          <h2 className="font-display mt-1 text-h2">Frequently asked questions</h2>
        </Reveal>
        <div className="mt-8 grid gap-x-10 lg:grid-cols-2">
          <Accordion items={left} />
          <Accordion items={right} />
        </div>
      </Container>
    </Section>
  );
}
