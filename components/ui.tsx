import Link from "next/link";
import type { ReactNode } from "react";

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`wrap ${className}`}>{children}</div>;
}

export function ButtonLink({
  href,
  children,
  variant = "accent",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "accent" | "light" | "ink" | "dark";
  className?: string;
}) {
  const cls = `btn ${variant === "light" ? "btn--light" : variant === "ink" ? "btn--ink" : variant === "dark" ? "btn--dark" : ""} ${className}`;
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>{children}</Link>
  ) : (
    <a href={href} className={cls}>{children}</a>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const cls = `link ${className}`;
  return href.startsWith("/") ? <Link href={href} className={cls}>{children}</Link> : <a href={href} className={cls}>{children}</a>;
}
