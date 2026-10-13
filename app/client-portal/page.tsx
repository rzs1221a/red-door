import JsonLd from "@/components/JsonLd";
import { RevealGroup } from "@/components/Reveal";
import { ButtonLink, Container, PageIntro, SectionHead } from "@/components/ui";
import { Doc, Speak, Status } from "@/components/icons";
import { site } from "@/lib/site";
import { interiors, region } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Client Portal",
  description: "Log in to follow your Red Door Revivals project: schedule, photos, budget, selections, and messages.",
  path: "/client-portal/",
  image: "/og/client-portal.jpg",
  imageAlt: "Creative office interior by Red Door Revivals",
});

// Portal contents per the scope: documents, messages, and project status (CoConstruct).
const inside = [
  { title: "Project status", body: "Where the project stands during the build.", icon: Status },
  { title: "Messages", body: "Project messages, kept with the project.", icon: Speak },
  { title: "Documents", body: "Project documents in one place.", icon: Doc },
];

export default function ClientPortal() {
  return (
    <>
      <PageIntro
        eyebrow="Client portal"
        title="Your project, from anywhere"
        photo={interiors.photos[2]}
        photoCaption={`Creative office, Red Door project, ${region}`}
        actions={
          <>
            <ButtonLink href={site.portalUrl} size="lg" icon>Log in to the client portal</ButtonLink>
            <ButtonLink href="/contact/" variant="secondary" size="lg">Start a project</ButtonLink>
          </>
        }
      >
        <p>
          Owners receive regular updates throughout the project. Clients and trade partners find documents, messages, and
          project status in our client portal during a build.
        </p>
      </PageIntro>

      <section className="border-b border-line">
        <Container className="py-section-sm md:py-section">
          <SectionHead eyebrow="Inside" title="What you'll find" />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {inside.map((item) => (
              <div key={item.title} className="rounded-[3px] bg-cream p-7 shadow-card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-door/10 text-door-deep">
                  <item.icon size={22} />
                </span>
                <p className="mt-5 text-[1.15rem] font-semibold">{item.title}</p>
                <p className="mt-2 text-ink-soft">{item.body}</p>
              </div>
            ))}
          </RevealGroup>
          <p className="measure mt-14 text-ink-soft">
            Can&rsquo;t log in? Call{" "}
            <a href={`tel:${site.phone.tel}`} className="font-medium text-door-deep underline underline-offset-4">
              {site.phone.display}
            </a>{" "}
            and we&rsquo;ll reset your access.
          </p>
        </Container>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "Client portal", path: "/client-portal/" }]))} />
    </>
  );
}
