import type { Metadata } from "next";
import Link from "next/link";
import DoorScene from "@/components/DoorScene";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import MomentsRow from "@/components/MomentsRow";
import OwnersList from "@/components/OwnersList";
import Picture, { pictureAttrs } from "@/components/Picture";
import Reveal, { RevealGroup } from "@/components/Reveal";
import WorkStrips from "@/components/WorkStrips";
import { ButtonLink, TextLink } from "@/components/ui";
import { hero } from "@/lib/copy";
import { faqs } from "@/lib/faq";
import { found } from "@/lib/found";
import { doorRooms, frames, moments, owners, statement, strips } from "@/lib/home";
import { region, residential } from "@/lib/projects";
import { faqPage, graph } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Rental Property Renovation in Fernandina Beach | Red Door Revivals", description: site.description },
};

const homeFaqs = faqs.filter((f) => /first|designer|project plan|happening|bonded|outside the area/.test(f.q)).slice(0, 6);

export default function Home() {
  const heroPhoto = residential.gallery[0];
  return (
    <>
      {/* ---------- Hero: name under a photograph, the door as the lit object ---------- */}
      <section className="relative min-h-[100svh] bg-bg">
        <div className="relative h-[50svh] overflow-clip bg-surface lg:h-[58svh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...pictureAttrs(heroPhoto)}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
            style={{ filter: "brightness(0.5) saturate(0.8)" }}
          />
          {/* The door is the lit object; it fits under the navigation at every width. */}
          <div className="wrap relative flex h-full items-end justify-center pt-16 lg:justify-end lg:pr-[6vw] lg:pt-[72px]">
            <DoorScene rooms={doorRooms} region={region} className="hero-door" controls="hero-door-controls" />
          </div>
        </div>

        <div className="wrap flex min-h-[50svh] flex-col justify-between pb-7 pt-6 lg:min-h-[42svh]">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start lg:grid-cols-[minmax(0,44ch)_1fr_auto]">
            <p className="order-3 max-w-[44ch] md:order-none" data-rise style={{ "--i": 0 } as React.CSSProperties}>
              {hero.headline} Thirty years of residential and commercial building, now in {site.city}, Florida.
            </p>
            {/* Live thing: open the door, choose the room. The controls render here, under the door. */}
            <div id="hero-door-controls" className="order-1 md:order-none md:col-span-2 lg:col-span-1 lg:justify-self-center" data-rise style={{ "--i": 1 } as React.CSSProperties} />
            <div data-rise style={{ "--i": 2 } as React.CSSProperties} className="order-2 md:order-none md:col-start-2 md:row-start-1 lg:col-start-3">
              <ButtonLink href="/contact/">Request a consultation</ButtonLink>
            </div>
          </div>
          <h1 className="wordmark display mt-16 -ml-[0.04em] md:mt-10" data-rise style={{ "--i": 3 } as React.CSSProperties}>
            <span className="block md:inline">Red Door </span>
            <span className="block md:inline">Revivals</span>
          </h1>
        </div>
      </section>

      {/* ---------- Statement: the staircase ---------- */}
      <section className="wrap flex min-h-[100svh] flex-col justify-center py-section-sm">
        <div className="grid12 items-start">
          <RevealGroup as="div" className="col-span-12 md:col-span-9" stagger={110}>
            {statement.lines.map((line, i) => (
              <p
                key={line}
                className={`head max-w-none font-medium ${i % 2 ? "text-muted" : "text-ink"}`}
                style={{ paddingLeft: `calc(${i * 6}vw)` }}
              >
                {line}
              </p>
            ))}
          </RevealGroup>
          <div className="col-span-12 mt-10 grid grid-cols-2 gap-4 md:col-span-3 md:mt-0 md:grid-cols-1">
            <Reveal className="shutter">
              <Picture photo={residential.gallery[3]} sizes="(min-width: 768px) 20vw, 50vw" className="aspect-[3/2] overflow-hidden" imgClassName="h-full object-cover" />
            </Reveal>
            <Reveal className="shutter" delay={150}>
              <Picture photo={residential.gallery[8]} sizes="(min-width: 768px) 20vw, 50vw" className="aspect-[3/2] overflow-hidden" imgClassName="h-full object-cover" />
            </Reveal>
          </div>
        </div>
        <Reveal className="mt-14 md:mt-20">
          <p className="max-w-[40ch] small">{statement.note}</p>
        </Reveal>
      </section>

      {/* ---------- Showcase: three full-bleed rooms, a card each ---------- */}
      <section aria-labelledby="services-heading" className="mt-section-sm">
        <h2 id="services-heading" className="sr-only">What we do</h2>
        {frames.map((f, i) => (
          <div key={f.id} className="relative h-[100svh] overflow-hidden bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...pictureAttrs(f.photo)} sizes="100vw" alt={f.photo.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ filter: "brightness(0.62) contrast(1.05)" }} />
            <div className="wrap relative grid h-full grid-cols-4 items-center gap-[var(--spacing-gutter)] max-md:items-end max-md:pb-0">
              <Reveal variant="fade" className={`col-span-4 flex min-h-[46svh] flex-col gap-4 bg-ink p-5 text-light-ink md:col-span-1 md:min-h-[52svh] md:items-center md:p-6 md:text-center ${["md:col-start-2", "md:col-start-3", "md:col-start-4"][i]}`} id={`frame-${f.id}`}>
                <div className="flex items-start justify-between gap-4 md:block">
                  <p className="lead max-w-none">{f.title}</p>
                  <Picture photo={f.small} sizes="96px" className="w-24 shrink-0 md:hidden" imgClassName="aspect-[3/2] object-cover" />
                </div>
                <p className="text-light-muted">{f.line}</p>
                <p className="">{f.fact}</p>
                <Picture photo={f.small} sizes="22vw" className="hidden w-full md:block" imgClassName="aspect-[3/2] object-cover" />
                <Link href={`/services/#${f.id}`} className="btn mt-auto w-full">See the service</Link>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      {/* ---------- Work: one strip per project ---------- */}
      <section className="wrap mt-section" aria-label="Projects">
        <WorkStrips strips={strips} />
        <p className="small mt-8 text-muted">All projects shown are Red Door Revivals work in the {region}. Florida projects will join as they complete.</p>
      </section>

      {/* ---------- Process: drag row of moments ---------- */}
      <div className="mt-section">
        <MomentsRow heading="How a project runs" moments={moments} />
      </div>

      {/* ---------- Who we work with: sticky photograph, active list ---------- */}
      <div className="mt-section">
        <OwnersList heading="Who we work with" owners={owners} />
      </div>

      {/* ---------- Questions beside the Fairbanks House ---------- */}
      <section className="mt-section bg-surface" aria-labelledby="faq-heading">
        <div className="wrap grid12 py-section-sm md:pt-0">
          <div className="col-span-12 md:col-span-5 md:pt-section-sm">
            <h2 id="faq-heading" className="head">Before you call</h2>
            <ul className="mt-8 space-y-1">
              <li>
                <a href={`tel:${site.phone.tel}`} className="link">{site.phone.display}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link">{site.email}</a>
              </li>
              <li>{site.serviceArea.join(", ")}, Florida</li>
              <li>Bonded and insured</li>
            </ul>
            <div className="mt-10">
              <FAQ items={homeFaqs} />
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <ButtonLink href="/contact/">Request a consultation</ButtonLink>
              <TextLink href="/design-process/">The full process</TextLink>
            </div>
          </div>
          <div className="relative col-span-12 mt-14 md:col-span-6 md:col-start-7 md:mt-0 md:-translate-y-16 md:pb-20">
            <Reveal className="shutter drift">
              <Picture photo={found.fairbanksHouse} sizes="(min-width: 768px) 48vw, 100vw" className="aspect-[4/5] overflow-hidden md:aspect-[3/4]" imgClassName="h-full object-cover object-[60%_40%]" />
            </Reveal>
            <Reveal delay={200} className="absolute -bottom-10 right-0 w-[38%] md:bottom-10 md:-left-10 md:right-auto md:w-1/3">
              <Picture photo={found.centreStreet} sizes="(min-width: 768px) 16vw, 38vw" className="aspect-square overflow-hidden" imgClassName="h-full object-cover object-[20%_60%]" />
            </Reveal>
            <p className="small mt-14 text-muted md:absolute md:bottom-0 md:left-0 md:mt-0">
              The Fairbanks House and Centre Street, {site.city}. Pictures via Wikimedia Commons, credited below.
            </p>
          </div>
        </div>
        <JsonLd data={graph(faqPage(homeFaqs))} />
      </section>

      {/* ---------- Contact: the email as display type, inverted ---------- */}
      <section className="relative flex min-h-[100svh] flex-col justify-between bg-light px-[var(--spacing-margin)] pb-[12vh] pt-10 text-light-ink" aria-label="Write to us">
        <Reveal>
          <p className="lead max-w-[30ch]">Tell us about the property and what you want it to do.</p>
        </Reveal>
        <div>
          <Reveal>
            <a
              href={`mailto:${site.email}`}
              className="email-display block w-full whitespace-nowrap leading-[0.9] tracking-[-0.04em] transition-colors duration-300 hover:text-accent"
            >
              <span className="block md:inline">will@</span>
              <span className="block md:inline">reddoorrevivals.com</span>
            </a>
          </Reveal>
          <div className="mt-10 flex flex-col gap-3 small md:flex-row md:items-end md:justify-between">
            <p>
              <a href={`tel:${site.phone.tel}`} className="link">{site.phone.display}</a>
              <br />
              {site.city}, Florida
            </p>
            <p className="flex gap-6">
              <a href={site.social.instagram} className="link">Instagram</a>
              <a href={site.social.facebook} className="link">Facebook</a>
            </p>
          </div>
        </div>
      </section>
      <div className="h-[16svh]" aria-hidden="true" />
    </>
  );
}
