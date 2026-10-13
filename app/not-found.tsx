import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <h1 className="display text-[2.6rem] md:text-[4rem]">That page isn&rsquo;t here</h1>
      <p className="measure mt-5 text-lg text-ink-soft">
        The link may be old or mistyped. Start from the home page, or get in touch about your property.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/contact/" variant="secondary">Request a consultation</ButtonLink>
      </div>
    </Container>
  );
}
