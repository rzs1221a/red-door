import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a walkthrough for your rental or investment property in Fernandina Beach or on Amelia Island.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <section>
      <Container className="grid gap-14 py-16 md:grid-cols-[1fr_1.3fr] md:py-24">
        <div>
          <h1 className="display text-[2.6rem] md:text-[4rem]">Request a walkthrough</h1>
          <p className="measure mt-6 text-lg text-ink-soft">
            Tell us about the property and what you want done. We&rsquo;ll reply within one business day to set
            up a time, in person or on video if you&rsquo;re out of town.
          </p>

          <dl className="mt-10 space-y-6 text-lg">
            <div>
              <dt className="text-[0.95rem] text-ink-soft">Call</dt>
              <dd>
                <a href={`tel:${site.phone.tel}`} className="display text-[2rem] text-door hover:underline">
                  {site.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.95rem] text-ink-soft">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.95rem] text-ink-soft">Where we work</dt>
              <dd>{site.serviceArea.join(", ")}, Florida</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-[3px] bg-paper-2 p-6 md:p-9">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
