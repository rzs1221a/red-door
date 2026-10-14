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
  return (
    <>
      {/* ---------- Hero: the doorway is the first screen; the finished room is seen through it ---------- */}
      <section className="hero relative overflow-x-clip bg-bg">
        <div className="hero-stage wrap grid12 items-center">
          <div className="order-2 col-span-12 flex flex-col pt-14 lg:order-1 lg:col-span-4 lg:col-start-1 lg:pt-0">
            <p className="lead max-w-[22ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>
              {hero.headline}
            </p>
            {/* On phones the sentence comes last, so the name below it follows a paragraph, not a button. */}
            <div className="order-2 mt-7 lg:order-3 lg:mt-8" data-rise style={{ "--i": 2 } as React.CSSProperties}>
              <ButtonLink href="/contact/">Request a consultation</ButtonLink>
            </div>
            <p className="order-3 mt-7 max-w-[34ch] text-muted lg:order-2 lg:mt-5" data-rise style={{ "--i": 1 } as React.CSSProperties}>
              Thirty years of residential and commercial building, now in {site.city}, Florida.
            </p>
          </div>
          {/* The door at the scale it was drawn for: nearly a screen tall, on the dark ground, the room lit behind it. */}
          <div className="order-1 col-span-12 flex justify-center lg:order-2 lg:col-span-7 lg:col-start-6">
            <DoorScene rooms={doorRooms} region={region} className="hero-door" caption scroll />
          </div>
        </div>

        <div className="wrap pb-7 pt-12 lg:pt-2">
          <h1 className="wordmark display -ml-[0.04em]" data-rise style={{ "--i": 3 } as React.CSSProperties}>
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
              <Picture photo={residential.gallery[3]} sizes="(min-width: 768px) 20vw, 50vw" className="aspect-[4/5] overflow-hidden md:aspect-[3/2]" imgClassName="h-full object-cover" />
            </Reveal>
            <Reveal className="shutter" delay={150}>
              <Picture photo={residential.gallery[8]} sizes="(min-width: 768px) 20vw, 50vw" className="aspect-[4/5] overflow-hidden md:aspect-[3/2]" imgClassName="h-full object-cover" />
            </Reveal>
          </div>
        </div>
        <Reveal className="mt-14 md:mt-20">
          <p className="note max-w-[40ch]">{statement.note}</p>
        </Reveal>
      </section>

      {/* ---------- Showcase: three full-bleed rooms, a card each ---------- */}
      <section aria-labelledby="services-heading" className="mt-section-sm">
        <h2 id="services-heading" className="sr-only">What we do</h2>
        {frames.map((f, i) => (
          <div key={f.id} className="relative bg-surface lg:h-[100svh] lg:overflow-hidden">
            <div className="relative h-[62svh] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img {...pictureAttrs(f.photo)} sizes="100vw" alt={f.photo.alt} loading="lazy" decoding="async" className="drift-img absolute inset-0 h-full w-full object-cover" style={{ filter: "brightness(0.62) contrast(1.05)" }} />
            </div>
            {/* On the phone the card stands across the bottom edge of the picture, as the door does in the hero. */}
            <div className="wrap relative -mt-[18svh] pb-12 lg:mt-0 lg:grid lg:h-full lg:grid-cols-4 lg:items-center lg:gap-[var(--spacing-gutter)] lg:pb-0">
              <Reveal variant="fade" className={`flex flex-col gap-4 bg-ink p-5 text-light-ink lg:col-span-1 lg:min-h-[52svh] lg:items-center lg:p-6 lg:text-center ${["lg:col-start-2", "lg:col-start-3", "lg:col-start-4"][i]}`} id={`frame-${f.id}`}>
                <div className="flex items-start justify-between gap-4 lg:block">
                  <p className="lead max-w-none">{f.title}</p>
                  <Picture photo={f.small} sizes="96px" className="w-24 shrink-0 lg:hidden" imgClassName="aspect-[3/2] object-cover" />
                </div>
                <p className="text-light-muted">{f.line}</p>
                <p className="">{f.fact}</p>
                <Picture photo={f.small} sizes="22vw" className="hidden w-full lg:block" imgClassName="aspect-[3/2] object-cover" />
                <Link href={`/services/#${f.id}`} className="btn mt-2 w-full lg:mt-auto">See the service</Link>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      {/* ---------- Work: one strip per project ---------- */}
      <section className="wrap mt-section" aria-label="Projects">
        <WorkStrips strips={strips} />
        <p className="note mt-8 text-muted">All projects shown are Red Door Revivals work in the {region}. Florida projects will join as they complete.</p>
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
                <a href={`tel:${site.phone.tel}`} className="link inline-block py-2.5">{site.phone.display}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link inline-block py-2.5">{site.email}</a>
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
            <Reveal delay={200} className="absolute -bottom-8 right-0 w-[38%] md:bottom-10 md:-left-10 md:right-auto md:w-1/3">
              <Picture photo={found.centreStreet} sizes="(min-width: 768px) 16vw, 38vw" className="aspect-square overflow-hidden" imgClassName="h-full object-cover object-[20%_60%]" />
            </Reveal>
            <p className="small mt-6 max-w-[56%] text-muted md:absolute md:bottom-0 md:left-0 md:mt-0 md:max-w-none">
              The Fairbanks House and Centre Street, {site.city}. Pictures via Wikimedia Commons, credited below.
            </p>
          </div>
        </div>
        <JsonLd data={graph(faqPage(homeFaqs))} />
      </section>

      {/* ---------- Contact: the email as display type, inverted ---------- */}
      <section className="relative flex min-h-[74svh] flex-col justify-between bg-light px-[var(--spacing-margin)] pb-14 pt-10 text-light-ink md:min-h-[100svh] md:pb-[12vh]" aria-label="Write to us" data-hide-bar>
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
              <a href={`tel:${site.phone.tel}`} className="link inline-block py-3 md:py-0">{site.phone.display}</a>
              <br />
              {site.city}, Florida
            </p>
            <p className="flex gap-6">
              <a href={site.social.instagram} className="link inline-block py-3 md:py-0">Instagram</a>
              <a href={site.social.facebook} className="link inline-block py-3 md:py-0">Facebook</a>
            </p>
          </div>
        </div>
      </section>
      <div className="h-[6svh] md:h-[16svh]" aria-hidden="true" />
    </>
  );
}
