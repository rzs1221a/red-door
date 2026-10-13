import JsonLd from "@/components/JsonLd";
import { Container, PageIntro } from "@/components/ui";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Privacy",
  description: "What Red Door Revivals Florida collects through this website, and how it is used.",
  path: "/privacy/",
  image: "/og/privacy.jpg",
});

const fields = ["name", "phone", "email", "property address", "property type", "timeline", "goal", "budget range", "message"];

export default function Privacy() {
  return (
    <>
      <PageIntro eyebrow="Privacy" title="What we collect, and why">
        <p>This site is a brochure for Red Door Revivals. It collects information only when you send it to us.</p>
      </PageIntro>
      <section className="border-b border-line">
        <Container size="prose" className="prose-site py-section-sm text-[1.05rem] text-ink-soft md:py-section">
          <h2 className="display text-display-md text-ink">The inquiry form</h2>
          <p>
            When you request a consultation, the form sends us the fields you fill in: {fields.join(", ")}. We use them to
            reply about your project and to prepare for a consultation. Form submissions are processed by Netlify, which
            hosts this site, and delivered to our inbox.
          </p>
          <h2 className="display mt-12 text-display-md text-ink">Calls and email</h2>
          <p>
            If you call or email us directly, we keep what you send so we can follow up on your project.
          </p>
          <h2 className="display mt-12 text-display-md text-ink">Analytics and cookies</h2>
          <p>
            This site does not set tracking cookies and does not run advertising trackers. If we add analytics in the
            future, this page will say so.
          </p>
          <h2 className="display mt-12 text-display-md text-ink">The client portal</h2>
          <p>
            Clients use a separate portal during a build. It has its own account and its own privacy terms, provided by
            the portal&rsquo;s vendor.
          </p>
          <h2 className="display mt-12 text-display-md text-ink">Questions or removal</h2>
          <p>
            To ask what we hold or to have it deleted, email{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-door-deep underline underline-offset-4">
              {site.email}
            </a>{" "}
            or call {site.phone.display}.
          </p>
        </Container>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "Privacy", path: "/privacy/" }]))} />
    </>
  );
}
