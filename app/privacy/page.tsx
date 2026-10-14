import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import Reveal, { RevealGroup } from "@/components/Reveal";
import { found } from "@/lib/found";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Privacy",
  description: "What Red Door Revivals Florida collects through this website, and how it is used.",
  path: "/privacy/",
  image: "/og/privacy.jpg",
});

const fields = ["name","phone","email","property address","property type","timeline","goal","budget range","message"];

export default function Privacy() {
  return (
    <>
      <section className="wrap pt-10 md:pt-16">
        <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>What we collect</h1>
        <p className="lead mt-8 text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>This site is a brochure for Red Door Revivals. It collects information only when you send it to us.</p>
      </section>
      <section className="wrap mt-section-sm grid12">
        <RevealGroup as="div" className="col-span-12 space-y-10 md:col-span-7 md:col-start-5" stagger={120}>
          <div>
            <h2 className="lead">The inquiry form</h2>
            <p className="mt-3 text-muted">
              When you request a consultation, the form sends us the fields you fill in: {fields.join(", ")}. We use them to reply about your project and to prepare for a consultation. Form submissions are processed by Netlify, which hosts this site, and delivered to our inbox.
            </p>
          </div>
          <div>
            <h2 className="lead">Calls and email</h2>
            <p className="mt-3 text-muted">If you call or email us directly, we keep what you send so we can follow up on your project.</p>
          </div>
          <div>
            <h2 className="lead">Analytics and cookies</h2>
            <p className="mt-3 text-muted">This site does not set tracking cookies and does not run advertising trackers. If we add analytics in the future, this page will say so.</p>
          </div>
          <div>
            <h2 className="lead">The client portal</h2>
            <p className="mt-3 text-muted">Clients use a separate portal during a build. It has its own account and its own privacy terms, provided by the portal’s vendor.</p>
          </div>
          <div>
            <h2 className="lead">Questions or removal</h2>
            <p className="mt-3 text-muted">
              To ask what we hold or to have it deleted, email <a href={`mailto:${site.email}`} className="link text-ink">{site.email}</a> or call {site.phone.display}.
            </p>
          </div>
        </RevealGroup>
      </section>
      <section className="wrap mt-section" aria-label="Amelia Island">
        <Reveal className="shutter">
          <Picture photo={found.lighthouse} sizes="100vw" className="aspect-[21/9] overflow-hidden" imgClassName="h-full object-cover" />
        </Reveal>
        <Reveal delay={150}>
          <p className="small mt-3 text-muted">The Amelia Island lighthouse over the marsh. Picture via Wikimedia Commons, credited below.</p>
        </Reveal>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "Privacy", path: "/privacy/" }]))} />
    </>
  );
}
