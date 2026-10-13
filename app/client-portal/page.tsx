import type { Metadata } from "next";
import { ButtonLink, Container, PageIntro } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Log in to follow your Red Door Revivals project: schedule, photos, budget, selections, and messages.",
  alternates: { canonical: "/client-portal/" },
};

const inside = [
  { title: "Schedule", body: "What's happening this week and what's next." },
  { title: "Photos", body: "Progress photos from the site, posted as work moves." },
  { title: "Budget", body: "Approved price, change orders, and cost against budget." },
  { title: "Selections", body: "Every finish and fixture, with reminders when a decision is due." },
  { title: "Messages", body: "One thread with your project manager, kept with the project." },
  { title: "Documents", body: "Scope, contracts, permits, warranties, and spec sheets." },
];

export default function ClientPortal() {
  return (
    <>
      <PageIntro title="Your project, from anywhere">
        <p>
          Clients follow their project in our online portal, open 24 hours a day. Log in with the email we set up
          when your project started.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.portalUrl}>Log in to the client portal</ButtonLink>
          <ButtonLink href="/contact/" variant="secondary">Start a project</ButtonLink>
        </div>
      </PageIntro>

      <section>
        <Container className="py-16 md:py-24">
          <h2 className="display text-[2.2rem] md:text-[3rem]">What&rsquo;s inside</h2>
          <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {inside.map((item) => (
              <div key={item.title} className="border-t-2 border-ink pt-4">
                <dt className="text-xl font-semibold">{item.title}</dt>
                <dd className="mt-2 text-ink-soft">{item.body}</dd>
              </div>
            ))}
          </dl>
          <p className="measure mt-14 text-ink-soft">
            Can&rsquo;t log in? Call{" "}
            <a href={`tel:${site.phone.tel}`} className="font-medium text-door underline underline-offset-4">
              {site.phone.display}
            </a>{" "}
            and we&rsquo;ll reset your access.
          </p>
        </Container>
      </section>
    </>
  );
}
