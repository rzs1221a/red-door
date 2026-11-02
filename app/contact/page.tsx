import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import FAQ from "@/components/FAQ";
import StepIcon from "@/components/StepIcons";
import { licenseLine, site } from "@/lib/site";
import { steps } from "@/lib/process";
import { faqsContact } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, contactPage, faqPage, graph } from "@/lib/schema";
import Reveal, { RevealGroup } from "@/components/Reveal";

export const metadata = pageMeta({
  title: "Request a consultation",
  description: "Request a consultation for your rental, investment, or residential property in Fernandina Beach.",
  path: "/contact/",
  image: "/og/contact.jpg",
  imageAlt: "Living room with a fireplace, Red Door project",
});

export default function Contact() {
  const license = licenseLine();
  return (
    <>
      <section className="wrap grid12 pt-10 md:pt-16">
        <div className="col-span-12 md:col-span-5 md:sticky md:top-[12vh] md:self-start">
          <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>Request a consultation</h1>
          <p className="lead mt-8 text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            {steps[0].intro[0]} {steps[0].listLead}
          </p>
          {/* The facts owners check first: how to reach us, where we work, and the protections in place. */}
          <ul className="mt-10 space-y-1" data-rise style={{ "--i": 2 } as React.CSSProperties}>
            <li>
              <a href={`tel:${site.phone.tel}`} className="link inline-block py-2.5">{site.phone.display}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link inline-block py-2.5">{site.email}</a>
            </li>
            <li>{site.serviceArea.join(", ")}, Florida</li>
            <li>Bonded and insured</li>
            {license && <li>{license}</li>}
          </ul>
          <p className="mt-12" data-rise style={{ "--i": 3 } as React.CSSProperties}>What happens next</p>
          <RevealGroup as="ol" className="mt-4 max-w-[44ch] space-y-4 text-muted" stagger={70}>
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[44px_1fr] items-start gap-4">
                <span className="flex size-11 items-center justify-center bg-surface text-ink" aria-hidden="true">
                  <StepIcon index={i} size={22} />
                </span>
                <span className="pt-2">
                  <span className="text-ink">{s.title}.</span> {s.short}
                </span>
              </li>
            ))}
          </RevealGroup>
        </div>
        <Reveal variant="fade" className="col-span-12 mt-12 md:col-span-6 md:col-start-7 md:mt-0">
          <ContactForm />
        </Reveal>
      </section>

      <section className="wrap mt-section grid12" aria-labelledby="faq-h">
        <Reveal className="col-span-12 md:col-span-4">
          <h2 id="faq-h" className="head">Frequently asked questions</h2>
          <p className="mt-6 max-w-[30ch] text-muted">
            Not answered here? Call <a href={`tel:${site.phone.tel}`} className="link text-ink">{site.phone.display}</a>.
          </p>
        </Reveal>
        <Reveal className="col-span-12 mt-8 md:col-span-7 md:col-start-6 md:mt-0">
          <FAQ items={faqsContact} />
        </Reveal>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "Contact", path: "/contact/" }]), contactPage(), faqPage(faqsContact))} />
    </>
  );
}
