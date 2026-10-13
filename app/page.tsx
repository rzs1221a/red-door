import type { Metadata } from "next";
import Link from "next/link";
import Door from "@/components/Door";
import HeroMedia from "@/components/HeroMedia";
import TrustStrip from "@/components/TrustStrip";
import BeforeAfter from "@/components/BeforeAfter";
import ProcessRail from "@/components/ProcessRail";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Picture from "@/components/Picture";
import Reveal, { RevealGroup } from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { ButtonLink, Container, CtaBand, Dash, Eyebrow, SectionHead, TextLink } from "@/components/ui";
import { ArrowDown, ArrowRight, Award, Check, Design, Plan, Shield, Speak, Years } from "@/components/icons";
import { featured, heroStills, region, residential } from "@/lib/projects";
import { site } from "@/lib/site";
import { difference, hero, idealCustomer, positioning, promise, services, why } from "@/lib/copy";
import { faqsShort } from "@/lib/faq";
import { faqPage, graph } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Rental Property Renovation in Fernandina Beach | Red Door Revivals", description: site.description },
};

const whyIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "30+ Years of Experience": Years,
  "Design + Construction": Design,
  "Detailed Project Plans": Plan,
  "Bonded & Insured": Shield,
  "Transparent Communication": Speak,
};

export default function Home() {
  const f = residential.feature;
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-ink-deep text-white lg:min-h-[100svh]">
        <HeroMedia stills={heroStills} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/55 to-ink-deep/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink-deep/70 via-ink-deep/20 to-transparent" />
        <div aria-hidden="true" className="grain absolute inset-0" />

        <Container className="relative w-full pb-14 pt-36 md:pb-16 md:pt-40">
          <div className="grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow tone="light">{hero.categories.join("  ·  ")}</Eyebrow>
              <h1 className="display mt-6 max-w-[15ch] text-display-xl text-white">{hero.headline}</h1>
              <p className="measure mt-7 max-w-xl text-lede text-white/80">{hero.lead}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact/" size="lg" icon>
                  Request a consultation
                </ButtonLink>
                <ButtonLink href={`tel:${site.phone.tel}`} variant="ghost-light" size="lg" icon="phone">
                  {site.phone.display}
                </ButtonLink>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[0.9rem] font-medium text-white/85">
                {hero.proof.split(". ").map((p) => (
                  <li key={p} className="inline-flex items-center gap-2">
                    <Check size={15} className="text-brass-soft" />
                    {p.replace(/\.$/, "")}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden justify-end lg:flex">
              <Door idPrefix="hero" tone="dark" className="w-[58%] max-w-[260px]" />
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between text-[0.78rem] text-white/50">
            <a href="#intro" className="inline-flex items-center gap-2 hover:text-white">
              <ArrowDown size={14} /> Scroll
            </a>
            <span>Red Door project, {region}</span>
          </div>
        </Container>
      </section>

      <TrustStrip />

      {/* ---------- The problem ---------- */}
      <section id="intro" className="scroll-mt-20 border-b border-line">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Why we exist</Eyebrow>
            <p className="display mt-6 text-display-md">{positioning.uncertainty}</p>
          </Reveal>
          <Reveal delay={150} className="lg:pt-14">
            <p className="text-lede text-ink-soft">{positioning.package}</p>
            <div className="mt-8">
              <TextLink href="/about/">About Red Door Revivals</TextLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------- Promise ---------- */}
      <section className="border-b border-line bg-paper-2">
        <Container className="grid gap-14 py-section-sm md:py-section lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{promise.eyebrow}</Eyebrow>
              <h2 className="display mt-4 text-display-lg">{promise.title}</h2>
              <p className="measure mt-6 text-lede text-ink-soft">{promise.answerLead}</p>
            </Reveal>
            <RevealGroup as="ol" className="mt-10 divide-y divide-line border-y border-line">
              {promise.answer.map((line, i) => (
                <li key={line} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 py-6">
                  <span className="display text-[2rem] leading-none text-door">0{i + 1}</span>
                  <p className="display text-display-sm">{line}</p>
                </li>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={120} className="rounded-[3px] bg-paper p-7 shadow-card md:p-9">
            <p className="font-medium">{promise.lead.join(" ")}</p>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 text-[0.95rem] text-ink-soft sm:grid-cols-2 lg:grid-cols-1">
              {promise.pains.map((p) => (
                <li key={p} className="flex gap-3">
                  <Dash tone="soft" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* ---------- Services ---------- */}
      <section className="border-b border-line">
        <Container className="py-section-sm md:py-section">
          <SectionHead eyebrow="What we do" title={site.tagline} action={{ href: "/services/", label: "Everything we do" }} align="split" />
          <div className="mt-14 grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            <RevealGroup as="ol" className="divide-y divide-line border-y border-line" stagger={70}>
              {services.map((s, i) => (
                <li key={s.id}>
                  <Link
                    href={`/services/#${s.id}`}
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-5 py-6 transition-colors hover:text-door-deep"
                  >
                    <span className="display text-[1.5rem] leading-none text-door">0{i + 1}</span>
                    <span>
                      <span className="display block text-display-sm">{s.title}</span>
                      <span className="mt-1.5 block max-w-xl text-[0.95rem] text-ink-soft">{s.lead.join(" ")}</span>
                    </span>
                    <span className="arrow-nudge rounded-full border border-line p-2.5 text-ink-soft transition-colors group-hover:border-door group-hover:text-door-deep">
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </li>
              ))}
            </RevealGroup>
            <Reveal variant="scale" className="lg:sticky lg:top-28 lg:self-start">
              <div className="grid grid-cols-2 gap-3">
                <Picture photo={residential.gallery[3]} sizes="(min-width: 1024px) 40vw, 100vw" className="col-span-2 zoom-media aspect-[4/3] overflow-hidden rounded-[3px]" imgClassName="h-full object-cover" />
                <Picture photo={residential.gallery[4]} sizes="(min-width: 1024px) 20vw, 50vw" className="zoom-media aspect-[4/3] overflow-hidden rounded-[3px]" imgClassName="h-full object-cover" />
                <Picture photo={residential.gallery[8]} sizes="(min-width: 1024px) 20vw, 50vw" className="zoom-media aspect-[4/3] overflow-hidden rounded-[3px]" imgClassName="h-full object-cover" />
              </div>
              <p className="mt-3 text-[0.82rem] text-ink-soft">Kitchens, living spaces, and porches. Red Door projects, {region}.</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Featured before / after ---------- */}
      <section className="border-b border-line bg-cream">
        <Container className="py-section-sm md:py-section">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:gap-16">
            <Reveal>
              <Eyebrow>Before and after</Eyebrow>
              <h2 className="display mt-4 text-display-lg">{f.headline}</h2>
              <p className="mt-3 text-[0.95rem] font-medium text-ink-soft">
                {f.name}, {region}
              </p>
              <p className="measure mt-5 text-lede text-ink-soft">{f.body}</p>
              <p className="mt-5 inline-flex items-center gap-2.5 text-[0.95rem]">
                <Award size={18} className="text-brass" /> {f.recognition}
              </p>
              <div className="mt-8">
                <TextLink href="/projects/">See all projects</TextLink>
              </div>
            </Reveal>
            <Reveal variant="scale" delay={100}>
              <BeforeAfter before={f.before} after={f.after} sizes="(min-width: 1024px) 60vw, 100vw" label="Drag to compare" cropBottom={0.12} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Process ---------- */}
      <section className="border-b border-line">
        <Container className="py-section-sm md:py-section">
          <SectionHead
            eyebrow="How we work"
            title="The Red Door Process"
            lead={
              <p>
                {positioning.differenceLead} {positioning.difference}
              </p>
            }
          />
          <div className="mt-14">
            <ProcessRail />
          </div>
        </Container>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="border-b border-line bg-ink text-white">
        <Container className="py-section-sm md:py-20">
          <Stats tone="light" />
        </Container>
      </section>

      {/* ---------- Recent work ---------- */}
      <section className="border-b border-line">
        <Container className="py-section-sm md:py-section">
          <SectionHead eyebrow="Recent work" title="Built to last, designed to be lived in" action={{ href: "/projects/", label: "All projects" }} align="split" />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-12" stagger={110}>
            {featured.map((w, i) => (
              <figure key={w.photo.src} className={i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12 lg:col-span-5 lg:col-start-8"}>
                <Picture
                  photo={w.photo}
                  sizes={i === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
                  className={`zoom-media overflow-hidden rounded-[3px] shadow-card ${i === 0 ? "aspect-[3/2]" : i === 1 ? "aspect-[4/3] md:aspect-[5/6]" : "aspect-[4/3]"}`}
                  imgClassName={`h-full object-cover ${i === 0 ? "object-top" : ""}`}
                />
                <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[0.92rem]">
                  <span className="font-medium">{w.caption}</span>
                  <span className="text-ink-soft">{region}</span>
                </figcaption>
              </figure>
            ))}
            <Reveal className="md:col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:-mt-[calc(100%*0.4)] lg:self-end lg:pr-16">
              <p className="display text-display-md">{residential.lead}</p>
            </Reveal>
          </RevealGroup>
        </Container>
      </section>

      {/* ---------- Why Red Door ---------- */}
      <section className="border-b border-line bg-paper-2">
        <Container className="py-section-sm md:py-section">
          <SectionHead eyebrow="Why Red Door Revivals" title="More than construction skills" />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ...why.map((w) => {
                const Icon = whyIcons[w.title] ?? Check;
                return (
                  <article key={w.title} className="flex flex-col rounded-[3px] bg-paper p-7 shadow-card">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-door/10 text-door-deep">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-5 text-[1.15rem] font-semibold">{w.title}</h3>
                    {w.body.map((b) => (
                      <p key={b} className="mt-3 text-[0.95rem] text-ink-soft">{b}</p>
                    ))}
                    {w.items && (
                      <ul className="mt-3 space-y-1 text-[0.95rem] text-ink-soft">
                        {w.items.map((it) => (
                          <li key={it} className="flex gap-3">
                            <Dash />
                            {it}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              }),
              <article key="recognition" className="flex flex-col rounded-[3px] bg-ink p-7 text-white shadow-card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-brass-soft">
                  <Award size={22} />
                </span>
                <h3 className="mt-5 text-[1.15rem] font-semibold">Recognition</h3>
                <ul className="mt-3 space-y-3">
                  {site.awards.map((a) => (
                    <li key={a.name}>
                      <span className="block font-medium">{a.name}</span>
                      <span className="text-[0.92rem] text-white/60">{a.by}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6">
                  <Link href="/about/" className="arrow-nudge inline-flex items-center gap-2 font-medium">
                    <span className="link-underline">About Red Door</span> <ArrowRight size={16} />
                  </Link>
                </p>
              </article>,
            ]}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------- Who we work with ---------- */}
      <section className="border-b border-line">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Who we work with</Eyebrow>
            <h2 className="display mt-4 text-display-lg">{idealCustomer.title}</h2>
            <p className="measure mt-5 text-lede text-ink-soft">{idealCustomer.valuesLead}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {idealCustomer.values.map((v) => (
                <li key={v} className="rounded-full border border-ink/20 px-3.5 py-1.5 text-[0.9rem] font-medium">
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-medium">{idealCustomer.forLead}</p>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {idealCustomer.for.map((f) => (
                <li key={f} className="flex items-center gap-4 py-3.5 text-[1.05rem]">
                  <Check size={17} className="shrink-0 text-door" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* ---------- The Red Door Difference ---------- */}
      <section className="grain border-b border-line bg-ink-deep text-white">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow tone="light">{difference.title}</Eyebrow>
            <p className="mt-6 text-lede text-white/70">{difference.lead}</p>
            <p className="display mt-6 text-display-md text-white/45 line-through decoration-door decoration-2">{difference.a}</p>
            <p className="display mt-4 text-display-lg">{difference.b}</p>
          </Reveal>
          <Reveal delay={150} className="lg:pt-14">
            <p className="text-lede text-white/80">{difference.body}</p>
            <ul className="mt-6 space-y-2.5">
              {difference.needs.map((n) => (
                <li key={n} className="flex items-center gap-3 text-white/85">
                  <Check size={16} className="shrink-0 text-brass-soft" />
                  {n}
                </li>
              ))}
            </ul>
            <p className="display mt-8 text-display-sm">{difference.close.join(" ")}</p>
          </Reveal>
        </Container>
      </section>

      <Testimonials />

      {/* ---------- FAQ ---------- */}
      <section className="border-b border-line">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="display mt-4 text-display-lg">Before you call</h2>
            <p className="measure mt-5 text-lede text-ink-soft">Straight answers about how a Red Door project runs. Anything else, ask us on the call.</p>
            <div className="mt-8">
              <TextLink href="/contact/">Request a consultation</TextLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <FAQ items={faqsShort} />
          </Reveal>
        </Container>
        <JsonLd data={graph(faqPage(faqsShort))} />
      </section>

      <CtaBand />
    </>
  );
}
