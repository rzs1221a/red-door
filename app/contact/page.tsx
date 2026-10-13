import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { Mail, Phone, Pin } from "@/components/icons";
import { site } from "@/lib/site";
import { steps } from "@/lib/process";
import { faqs } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, contactPage, graph } from "@/lib/schema";

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
      <section className="border-b border-line bg-cream">
        <Container className="grid gap-14 py-section-sm md:py-section lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="display mt-5 text-display-xl">Request a consultation</h1>
              <p className="measure mt-6 text-lede text-ink-soft">
                {steps[0].intro[0]} {steps[0].listLead}
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-10 space-y-5">
              <a href={`tel:${site.phone.tel}`} className="group flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-door/10 text-door-deep">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="block text-[0.82rem] text-ink-soft">Call</span>
                  <span className="display text-[1.6rem] leading-none text-ink group-hover:text-door-deep">{site.phone.display}</span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-door/10 text-door-deep">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-[0.82rem] text-ink-soft">Email</span>
                  <span className="font-medium group-hover:text-door-deep">{site.email}</span>
                </span>
              </a>
              <p className="flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-door/10 text-door-deep">
                  <Pin size={18} />
                </span>
                <span>
                  <span className="block text-[0.82rem] text-ink-soft">Where we work</span>
                  <span className="font-medium">{site.serviceArea.join(", ")}, Florida</span>
                </span>
              </p>
            </Reveal>

            <Reveal delay={160} className="mt-12">
              <p className="eyebrow eyebrow-rule">What happens next</p>
              <ol className="mt-5 space-y-4">
                {steps.slice(0, 3).map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="display text-[1.5rem] leading-none text-door">0{i + 1}</span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-[0.95rem] text-ink-soft">{s.short}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={80} className="rounded-[3px] border-t-4 border-door bg-paper-2 p-6 shadow-card md:p-9">
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Good to know</Eyebrow>
            <h2 className="display mt-4 text-display-lg">Before we talk</h2>
          </Reveal>
          <Reveal delay={120}>
            <FAQ items={contactFaqs} />
          </Reveal>
        </Container>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "Contact", path: "/contact/" }]), contactPage())} />
    </>
  );
}
