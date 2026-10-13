import type { Metadata } from "next";
import { ButtonLink, Container, PageIntro } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Log in to follow your Red Door Revivals project: schedule, photos, budget, selections, and messages.",
  alternates: { canonical: "/client-portal/" },
};

// Portal contents per the scope: documents, messages, and project status (CoConstruct).
const inside = [
  { title: "Project status", body: "Where the project stands during the build." },
  { title: "Messages", body: "Project messages, kept with the project." },
  { title: "Documents", body: "Project documents in one place." },
];

export default function ClientPortal() {
  return (
    <>
      <PageIntro title="Your project, from anywhere">
        <p>
          Owners receive regular updates throughout the project. Clients and trade partners find documents,
          messages, and project status in our client portal during a build.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.portalUrl}>Log in to the client portal</ButtonLink>
          <ButtonLink href="/contact/" variant="secondary">Start a project</ButtonLink>
        </div>
      </PageIntro>

      <section>
        <Container className="py-16 md:py-24">
          <h2 className="display text-[2.2rem] md:text-[3rem]">What&rsquo;s inside</h2>
          <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-3">
            {inside.map((item) => (
              <div key={item.title} className="border-t-2 border-ink pt-4">
                <dt className="text-xl font-semibold">{item.title}</dt>
                <dd className="mt-2 text-ink-soft">{item.body}</dd>
              </div>
            ))}
          </dl>
          <p className="measure mt-14 text-ink-soft">
            Can&rsquo;t log in? Call{" "}
            <a href={`tel:${site.phone.tel}`} className="font-medium text-door-deep underline underline-offset-4">
              {site.phone.display}
            </a>{" "}
            and we&rsquo;ll reset your access.
          </p>
        </Container>
      </section>
    </>
  );
}
