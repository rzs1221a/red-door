import type { Metadata } from "next";
import Door from "@/components/Door";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="border-b border-line bg-cream">
      <Container className="grid items-center gap-12 py-section md:grid-cols-[1.4fr_1fr]">
        <div>
          <Eyebrow>404</Eyebrow>
          <h1 className="display mt-5 text-display-xl">That door isn&rsquo;t here</h1>
          <p className="measure mt-6 text-lede text-ink-soft">
            The link may be old or mistyped. Start from the home page, browse our projects, or get in touch about your property.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/" icon>Go to the home page</ButtonLink>
            <ButtonLink href="/projects/" variant="secondary">Projects</ButtonLink>
            <ButtonLink href="/contact/" variant="secondary">Request a consultation</ButtonLink>
          </div>
        </div>
        <div className="mx-auto w-[55%] max-w-[260px] md:w-full">
          <Door idPrefix="nf" closed />
        </div>
      </Container>
    </section>
  );
}
