import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import FAQ from "@/components/FAQ";
import { site } from "@/lib/site";
import { steps } from "@/lib/process";
import { faqs } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, contactPage, graph } from "@/lib/schema";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import { found } from "@/lib/found";
import { region, residential } from "@/lib/projects";

const stepPhotos = [residential.gallery[0], residential.feature.before, residential.gallery[3]];

export const metadata = pageMeta({
  title: "Request a consultation",
  description: "Request a consultation for your rental, investment, or residential property in Fernandina Beach.",
  path: "/contact/",
  image: "/og/contact.jpg",
  imageAlt: "Living room with a fireplace, Red Door project",
});

const contactFaqs = faqs.filter((f) => /first|outside the area|Where do you work/.test(f.q));

export default function Contact() {
  return (
    <>
      <section className="wrap grid12 pt-10 md:pt-16">
        <div className="col-span-12 md:col-span-5 md:sticky md:top-[12vh] md:self-start">
          <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>Request a consultation</h1>
          <p className="lead mt-8 text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            {steps[0].intro[0]} {steps[0].listLead}
          </p>
          <ul className="mt-10 space-y-1" data-rise style={{ "--i": 2 } as React.CSSProperties}>
            <li>
              <a href={`tel:${site.phone.tel}`} className="link">{site.phone.display}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link">{site.email}</a>
            </li>
            <li>{site.serviceArea.join(", ")}, Florida</li>
          </ul>
          <Reveal className="mt-12 grid grid-cols-2 gap-2">
            <Picture photo={found.fairbanksHouse} sizes="20vw" className="aspect-[4/5] overflow-hidden" imgClassName="h-full object-cover object-[60%_30%]" />
            <Picture photo={residential.feature.after} sizes="20vw" className="aspect-[4/5] overflow-hidden" imgClassName="h-full object-cover object-[40%_top]" />
          </Reveal>
          <p className="small mt-3 text-muted">The Fairbanks House, {site.city}, and Historic Marietta, a Red Door project in the {region}.</p>
          <p className="mt-12" data-rise style={{ "--i": 3 } as React.CSSProperties}>What happens next</p>
          <ol className="mt-3 max-w-[44ch] space-y-4 text-muted">
            {steps.slice(0, 3).map((s, i) => (
              <li key={s.title} className="grid grid-cols-[72px_1fr] items-start gap-4">
                <Picture photo={stepPhotos[i]} sizes="72px" className="aspect-square overflow-hidden" imgClassName="h-full object-cover" />
                <span>
                  <span className="text-ink">{s.title}.</span> {s.short}
                </span>
              </li>
            ))}
          </ol>
          <p className="small mt-3 text-muted">Red Door projects, {region}.</p>
        </div>
        <Reveal variant="fade" className="col-span-12 mt-12 md:col-span-6 md:col-start-7 md:mt-0">
          <ContactForm />
        </Reveal>
      </section>

      <section className="wrap mt-section" aria-label="Fernandina Beach">
        <Reveal className="shutter">
          <Picture photo={found.centreStreet} sizes="100vw" className="aspect-[21/9] overflow-hidden" imgClassName="h-full object-cover object-[50%_55%]" />
        </Reveal>
        <p className="small mt-3 text-muted">Centre Street, {site.city}. Picture via Wikimedia Commons, credited below.</p>
      </section>

      <section className="wrap mt-section grid12">
        <Reveal className="col-span-12 md:col-span-4">
          <h2 className="head">Before we talk</h2>
          <Picture photo={residential.gallery[3]} sizes="(min-width: 768px) 30vw, 100vw" className="mt-8 aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover" />
          <p className="small mt-3 text-muted">Kitchen, a Red Door project in the {region}.</p>
        </Reveal>
        <Reveal className="col-span-12 mt-8 md:col-span-7 md:col-start-6 md:mt-0">
          <FAQ items={contactFaqs} />
        </Reveal>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "Contact", path: "/contact/" }]), contactPage())} />
    </>
  );
}
