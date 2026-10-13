import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { closingPromise } from "@/lib/copy";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
}) {
  const styles = {
    primary: "bg-door text-white hover:bg-door-deep",
    secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
    light: "bg-white text-door-deep hover:bg-paper",
  }[variant];
  const cls = `inline-flex items-center justify-center rounded-[3px] px-6 py-3.5 text-[0.98rem] font-medium transition-colors ${styles}`;
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>{children}</Link>
  ) : (
    <a href={href} className={cls}>{children}</a>
  );
}

export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="border-b border-line">
      <Container className="py-16 md:py-24">
        <h1 className="display max-w-4xl text-[2.6rem] md:text-[4.2rem]">{title}</h1>
        {children && <div className="measure mt-6 text-lg text-ink-soft md:text-xl">{children}</div>}
      </Container>
    </section>
  );
}

// Labeled stand-in for a project photo until Red Door's own project photos arrive. Never fill with stock or another firm's work.
export function PhotoSlot({ label, ratio = "aspect-[4/3]" }: { label: string; ratio?: string }) {
  return (
    <figure
      className={`${ratio} relative flex items-end overflow-hidden rounded-[2px] bg-paper-2 ring-1 ring-line`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(85,104,92,0.10) 0 1px, transparent 1px 14px)",
      }}
    >
      <figcaption className="m-3 rounded-[2px] bg-paper/90 px-2.5 py-1.5 text-[0.82rem] text-ink-soft">
        {label}
      </figcaption>
    </figure>
  );
}

export function CtaBand({
  title = closingPromise.lead,
  body = closingPromise.verbs.join(" "),
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-door text-white">
      <Container className="grid gap-8 py-16 md:grid-cols-[1.3fr_1fr] md:items-end md:py-20">
        <div>
          <h2 className="display text-[2.3rem] md:text-[3.2rem]">{title}</h2>
          <p className="measure mt-4 text-lg text-white/85">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <ButtonLink href="/contact/" variant="light">Request a consultation</ButtonLink>
          <a
            href={`tel:${site.phone.tel}`}
            className="inline-flex items-center rounded-[3px] border border-white/60 px-6 py-3.5 font-medium hover:bg-white/10"
          >
            Call {site.phone.display}
          </a>
        </div>
      </Container>
    </section>
  );
}
