import { testimonials } from "@/lib/testimonials";
import { Container, SectionHead } from "./ui";
import { RevealGroup } from "./Reveal";

// Renders nothing until lib/testimonials.ts has real, attributed quotes.
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="border-b border-line bg-cream">
      <Container className="py-section-sm md:py-section">
        <SectionHead eyebrow="From our clients" title="What owners say" />
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.quote} className="flex flex-col rounded-[3px] bg-white p-7 shadow-card">
              <blockquote className="display text-[1.35rem] leading-snug">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-[0.9rem] text-ink-soft">
                <span className="font-medium text-ink">{t.name}</span>
                {t.role && <>, {t.role}</>}
                {t.place && <>, {t.place}</>}
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
