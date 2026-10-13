import type { Metadata } from "next";
import { Container, CtaBand, PageIntro, PhotoSlot } from "@/components/ui";
import { steps } from "@/lib/process";

export const metadata: Metadata = {
  title: "How Our Design and Build Process Works",
  description:
    "From walkthrough to handover: how Red Door Revivals plans, designs, prices, and manages rental property renovations in Fernandina Beach.",
  alternates: { canonical: "/design-process/" },
};

export default function DesignProcess() {
  return (
    <>
      <PageIntro title="How our process works">
        <p>
          Most contractors hand you a bid and a list of decisions. We give you a complete package: professional
          design, a detailed scope, a fixed price, and a manager who sees it through.
        </p>
      </PageIntro>

      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <ol className="space-y-16">
            {steps.map((s, i) => (
              <li key={s.title} className="grid gap-6 md:grid-cols-[6rem_1fr_1fr] md:gap-10">
                <span className="display text-[3.5rem] leading-none text-door md:text-[4.5rem]">{i + 1}</span>
                <div>
                  <h2 className="display text-[2rem] md:text-[2.4rem]">{s.title}</h2>
                  <p className="measure mt-4 text-lg text-ink-soft">{s.long}</p>
                </div>
                {i === 1 || i === 3 ? (
                  <PhotoSlot label={i === 1 ? "Design board or finish selections" : "Progress photo, mid-build"} />
                ) : (
                  <div className="hidden md:block" />
                )}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-line bg-ink text-white">
        <Container className="grid gap-10 py-16 md:grid-cols-[1fr_1.3fr] md:py-24">
          <h2 className="display text-[2.2rem] md:text-[3rem]">Design is part of the job</h2>
          <div className="space-y-5 text-lg text-white/80">
            <p>
              Every project includes our award-winning design team. Layouts, finishes, fixtures, and colors are
              chosen together, written into the scope, and priced before work begins.
            </p>
            <p>
              Each selection comes with a spec sheet so the trades build exactly what was approved, and so you have
              a record of every finish for future repairs and turns.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
