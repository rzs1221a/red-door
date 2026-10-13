import type { Metadata } from "next";
import { Container, CtaBand, PageIntro, PhotoSlot } from "@/components/ui";
import { steps } from "@/lib/process";
import { positioning, why } from "@/lib/copy";

export const metadata: Metadata = {
  title: "The Red Door Process",
  description:
    "Consultation, property assessment, design, a detailed project plan, project management, communication, and completion: how Red Door Revivals runs a renovation.",
  alternates: { canonical: "/design-process/" },
};

const designCombined = why.find((w) => w.title === "Design + Construction")!;

export default function DesignProcess() {
  return (
    <>
      <PageIntro title="The Red Door Process">
        <p>
          {positioning.differenceLead} {positioning.difference}
        </p>
      </PageIntro>

      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <ol className="space-y-16 md:space-y-20">
            {steps.map((s, i) => (
              <li key={s.title} className="grid gap-6 md:grid-cols-[6rem_1fr_1fr] md:gap-10">
                <span className="display text-[3.5rem] leading-none text-door md:text-[4.5rem]">{i + 1}</span>
                <div>
                  <p className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-ink-soft">Step {i + 1}</p>
                  <h2 className="display mt-1 text-[2rem] md:text-[2.4rem]">{s.title}</h2>
                  {s.intro.map((p) => (
                    <p key={p} className="measure mt-4 text-lg text-ink-soft">{p}</p>
                  ))}
                  {s.close?.map((c) => (
                    <p key={c} className="measure mt-4 text-lg font-medium">{c}</p>
                  ))}
                </div>
                <div>
                  {s.listLead && <p className="text-lg text-ink-soft">{s.listLead}</p>}
                  {s.items && (
                    <ul className={`${s.listLead ? "mt-3" : ""} grid gap-x-6 gap-y-1.5 ${s.items.length > 6 && s.items[0].length < 30 ? "sm:grid-cols-2" : ""}`}>
                      {s.items.map((it) => (
                        <li key={it} className="flex gap-3">
                          <span className="mt-[0.7em] h-px w-3 shrink-0 bg-door" aria-hidden="true" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {i === 2 && (
                    <div className="mt-6">
                      <PhotoSlot label="Design board or finish selections (Red Door project)" />
                    </div>
                  )}
                  {i === 4 && (
                    <div className="mt-6">
                      <PhotoSlot label="Progress photo, mid-build (Red Door project)" />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-line bg-ink text-white">
        <Container className="grid gap-10 py-16 md:grid-cols-[1fr_1.3fr] md:py-24">
          <h2 className="display text-[2.2rem] md:text-[3rem]">{designCombined.title}</h2>
          <div className="space-y-5 text-lg text-white/80">
            {designCombined.body.map((b) => <p key={b}>{b}</p>)}
            <p>{steps[2].close?.[0]}</p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
