import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import Door from "@/components/Door";
import { Container, CtaBand, Dash, Eyebrow, PageIntro, SectionHead } from "@/components/ui";
import { region, residential } from "@/lib/projects";
import { steps } from "@/lib/process";
import { positioning, why } from "@/lib/copy";
import { faqs } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "The Red Door Process",
  description:
    "Consultation, property assessment, design, a detailed project plan, project management, communication, and completion: how Red Door Revivals runs a renovation.",
  path: "/design-process/",
  image: "/og/design-process.jpg",
  imageAlt: "Kitchen with painted cabinets and dark ceiling beams",
});

const designCombined = why.find((w) => w.title === "Design + Construction")!;
const processFaqs = faqs.filter((f) => /first|decide|designer|project plan|happening|end of the project/.test(f.q));

export default function DesignProcess() {
  return (
    <>
      <PageIntro eyebrow="How we work" title="The Red Door Process" photo={residential.gallery[4]} photoCaption={`Kitchen, Red Door project, ${region}`}>
        <p>
          {positioning.differenceLead} {positioning.difference}
        </p>
      </PageIntro>

      <section className="border-b border-line">
        <Container className="py-section-sm md:py-section">
          <ol className="relative">
            {steps.map((s, i) => (
              <li key={s.title} className="grid gap-6 border-t border-line py-12 md:grid-cols-[7rem_1fr_1fr] md:gap-10 md:py-16 lg:grid-cols-[9rem_1fr_1fr]">
                <Reveal className="md:sticky md:top-28 md:self-start">
                  <span className="display block text-[4rem] leading-none text-door md:text-[5.5rem]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="eyebrow mt-3">Step {i + 1} of {steps.length}</span>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="display text-display-md">{s.title}</h2>
                  {s.intro.map((p) => (
                    <p key={p} className="measure mt-4 text-lede text-ink-soft">{p}</p>
                  ))}
                  {s.close?.map((c) => (
                    <p key={c} className="measure mt-5 flex gap-3 text-[1.05rem] font-medium">
                      <Dash />
                      {c}
                    </p>
                  ))}
                </Reveal>
                <Reveal delay={160}>
                  {s.listLead && <p className="text-[1.05rem] text-ink-soft">{s.listLead}</p>}
                  {s.items && (
                    <ul className={`${s.listLead ? "mt-4" : ""} ${s.items.length > 6 && s.items[0].length < 30 ? "flex flex-wrap gap-2" : "space-y-2"}`}>
                      {s.items.map((it) =>
                        s.items!.length > 6 && s.items![0].length < 30 ? (
                          <li key={it} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[0.9rem]">{it}</li>
                        ) : (
                          <li key={it} className="flex gap-3 text-[1.02rem]">
                            <Dash />
                            <span>{it}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                  {i === 2 && (
                    <figure className="mt-8">
                      <Picture photo={residential.gallery[3]} sizes="(min-width: 768px) 34vw, 100vw" className="zoom-media aspect-[4/3] overflow-hidden rounded-[3px] shadow-card" imgClassName="h-full object-cover" />
                      <figcaption className="mt-2.5 text-[0.82rem] text-ink-soft">Finishes chosen before construction. Red Door project, {region}.</figcaption>
                    </figure>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="grain border-b border-line bg-ink-deep text-white">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-[1fr_1.3fr_auto] lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow tone="light">One team</Eyebrow>
            <h2 className="display mt-4 text-display-lg">{designCombined.title}</h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lede text-white/80">
            {designCombined.body.map((b) => (
              <p key={b}>{b}</p>
            ))}
            <p className="font-medium text-white">{steps[2].close?.[0]}</p>
          </Reveal>
          <Reveal variant="scale" delay={200} className="hidden lg:block">
            <Door idPrefix="process" tone="dark" className="w-[180px]" />
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHead eyebrow="Questions" title="About the process" />
          <Reveal delay={120}>
            <FAQ items={processFaqs} />
          </Reveal>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={graph(breadcrumbs([{ name: "Our process", path: "/design-process/" }]))} />
    </>
  );
}
