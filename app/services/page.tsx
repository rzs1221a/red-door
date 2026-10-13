import type { Metadata } from "next";
import { Container, CtaBand, PageIntro } from "@/components/ui";
import { positioning, services } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Rental and Investment Property Renovation",
  description:
    "Rental property, investment property, whole-property, kitchen, and bathroom renovations in Fernandina Beach, professionally planned and managed by Red Door Revivals.",
  alternates: { canonical: "/services/" },
};

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span className="mt-[0.7em] h-px w-3 shrink-0 bg-door" aria-hidden="true" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Services() {
  return (
    <>
      <PageIntro title={positioning.title}>
        {positioning.body.map((p) => <p key={p}>{p}</p>)}
      </PageIntro>

      <nav aria-label="Services" className="border-b border-line">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 py-5 text-[0.95rem]">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-door-deep underline-offset-4 hover:underline">
              {s.title}
            </a>
          ))}
        </Container>
      </nav>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={`scroll-mt-24 border-b border-line ${i % 2 ? "bg-paper-2" : ""}`}>
          <Container className="grid gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:py-20">
            <div>
              <h2 className="display text-[2.1rem] md:text-[2.8rem]">{s.title}</h2>
              {s.lead.map((l) => (
                <p key={l} className="measure mt-4 text-lg text-ink-soft">{l}</p>
              ))}
            </div>
            <div className="text-lg">
              {s.body && (
                <div className="space-y-2 text-ink-soft">
                  {s.body.map((b) => (
                    <p key={b} className={b.includes("+") ? "font-medium text-ink" : ""}>{b}</p>
                  ))}
                </div>
              )}
              {s.listLead && <p className={`${s.body ? "mt-6" : ""} text-ink-soft`}>{s.listLead}</p>}
              {s.items && <List items={s.items} />}
              {s.defs && (
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {s.defs.map((d) => (
                    <div key={d.term} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-6">
                      <dt className="font-semibold">{d.term}</dt>
                      <dd className="text-ink-soft">{d.desc}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {s.close?.map((c) => (
                <p key={c} className="mt-6 font-medium">{c}</p>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
