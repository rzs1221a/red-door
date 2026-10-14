import type { Faq } from "@/lib/faq";
import { RevealGroup } from "./Reveal";

// Questions as an accordion with no lines: 28px of space between rows, a chevron drawn from two strokes.
export default function FAQ({ items }: { items: Faq[] }) {
  return (
    <RevealGroup className="space-y-7" stagger={70}>
      {items.map((f) => (
        <details key={f.q} className="faq" name="faq">
          <summary className="leading-tight">
            <span>{f.q}</span>
            <span className="chev" aria-hidden="true" />
          </summary>
          <div className="faq-panel">
            <div>
              <p className="pt-3  text-muted">{f.a}</p>
            </div>
          </div>
        </details>
      ))}
    </RevealGroup>
  );
}
