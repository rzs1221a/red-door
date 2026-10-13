import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { closingPromise } from "@/lib/copy";
import type { Photo } from "@/lib/projects";
import Picture from "./Picture";
import Reveal from "./Reveal";
import { ArrowRight, Phone } from "./icons";

export function Container({
  children,
  className = "",
  size = "site",
}: {
  children: ReactNode;
  className?: string;
  size?: "site" | "wide" | "prose";
}) {
  const w = { site: "max-w-site", wide: "max-w-[96rem]", prose: "max-w-3xl" }[size];
  return <div className={`mx-auto ${w} px-5 md:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost-light" | "ink";
  size?: "md" | "lg";
  icon?: boolean | "phone";
  className?: string;
}) {
  const styles = {
    primary: "bg-door text-white hover:bg-door-deep shadow-[0_14px_30px_-16px_rgba(227,27,35,0.7)]",
    secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
    light: "bg-white text-ink hover:bg-cream",
    "ghost-light": "border border-white/50 text-white hover:bg-white/10",
    ink: "bg-ink text-paper hover:bg-ink-deep",
  }[variant];
  const dims = size === "lg" ? "px-7 py-4 text-[1.02rem]" : "px-6 py-3.5 text-[0.96rem]";
  const cls = `arrow-nudge inline-flex items-center justify-center gap-2.5 rounded-[3px] font-medium transition-colors duration-300 ${dims} ${styles} ${className}`;
  const inner = (
    <>
      {icon === "phone" && <Phone size={17} />}
      {children}
      {icon === true && <ArrowRight size={17} />}
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>{inner}</Link>
  ) : (
    <a href={href} className={cls}>{inner}</a>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const cls = `arrow-nudge inline-flex items-center gap-2 font-medium text-door-deep ${className}`;
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <ArrowRight size={16} />
    </>
  );
  return href.startsWith("/") ? <Link href={href} className={cls}>{inner}</Link> : <a href={href} className={cls}>{inner}</a>;
}

export function Eyebrow({ children, className = "", rule = true, tone = "default" }: { children: ReactNode; className?: string; rule?: boolean; tone?: "default" | "light" | "door" }) {
  const color = { default: "", light: "text-white/70", door: "text-door-deep" }[tone];
  const style = tone === "light" ? ({ "--eyebrow-rule": "rgba(255,255,255,0.6)" } as React.CSSProperties) : undefined;
  return <p className={`eyebrow ${rule ? "eyebrow-rule" : ""} ${color} ${className}`} style={style}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  action,
  tone = "default",
  className = "",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  action?: { href: string; label: string };
  tone?: "default" | "light";
  className?: string;
  align?: "left" | "split";
}) {
  const light = tone === "light";
  return (
    <Reveal className={`${align === "split" ? "flex flex-wrap items-end justify-between gap-x-10 gap-y-5" : ""} ${className}`}>
      <div>
        {eyebrow && <Eyebrow tone={light ? "light" : "default"}>{eyebrow}</Eyebrow>}
        <h2 className={`display mt-4 text-display-lg ${light ? "text-white" : ""}`}>{title}</h2>
        {lead && <div className={`measure mt-5 text-lede ${light ? "text-white/75" : "text-ink-soft"}`}>{lead}</div>}
      </div>
      {action && (
        <TextLink href={action.href} className={light ? "!text-white" : ""}>
          {action.label}
        </TextLink>
      )}
    </Reveal>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
  photo,
  photoCaption,
  actions,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  photo?: Photo;
  photoCaption?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <Container className={`grid gap-10 py-section-sm md:py-section ${photo ? "lg:grid-cols-[1.15fr_1fr] lg:items-center" : ""}`}>
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="display mt-5 max-w-4xl text-display-xl">{title}</h1>
          {children && <div className="measure mt-7 text-lede text-ink-soft">{children}</div>}
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {photo && (
          <figure className="relative">
            <Picture photo={photo} sizes="(min-width: 1024px) 42vw, 100vw" priority className="aspect-[4/3] overflow-hidden rounded-[3px] shadow-lift" imgClassName="h-full object-cover" />
            {photoCaption && <figcaption className="mt-3 text-[0.82rem] text-ink-soft">{photoCaption}</figcaption>}
            <span aria-hidden="true" className="absolute -left-3 -top-3 -z-10 h-24 w-24 border-l-2 border-t-2 border-door" />
          </figure>
        )}
      </Container>
    </section>
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
    <section className="grain relative overflow-hidden bg-door text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-lacquer/60 blur-3xl"
      />
      <Container className="relative grid gap-10 py-section-sm md:grid-cols-[1.3fr_1fr] md:items-end md:py-section">
        <Reveal>
          <Eyebrow tone="light">{closingPromise.title}</Eyebrow>
          <h2 className="display mt-4 text-display-lg">{title}</h2>
          <p className="measure mt-5 text-lede text-white/85">{body}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-wrap gap-3 md:justify-end">
          <ButtonLink href="/contact/" variant="light" size="lg" icon>
            Request a consultation
          </ButtonLink>
          <ButtonLink href={`tel:${site.phone.tel}`} variant="ghost-light" size="lg" icon="phone">
            {site.phone.display}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}

/** Thin dash bullet used across lists. */
export function Dash({ tone = "door" }: { tone?: "door" | "soft" | "light" }) {
  const c = { door: "bg-door", soft: "bg-ink-soft", light: "bg-white/60" }[tone];
  return <span className={`mt-[0.75em] h-px w-3.5 shrink-0 ${c}`} aria-hidden="true" />;
}

export function Numeral({ n, className = "" }: { n: number; className?: string }) {
  return <span className={`display tabular-nums text-door ${className}`}>{String(n).padStart(2, "0")}</span>;
}
