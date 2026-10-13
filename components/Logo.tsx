import Link from "next/link";

// Red Door Revivals logo, rendered from the vector EPS Will sent Sept 17.
// The reverse file swaps the black ink for white, for use on dark backgrounds.
export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-4" aria-label="Red Door Revivals Florida, home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={inverse ? "/images/reddoor-logo-reverse.png" : "/images/reddoor-logo.png"}
        alt="Red Door Revivals"
        width={720}
        height={239}
        className="h-11 w-auto md:h-12"
      />
      <span
        className={`hidden border-l pl-4 text-[0.78rem] leading-tight tracking-[0.04em] sm:block ${
          inverse ? "border-white/25 text-white/70" : "border-line text-ink-soft"
        }`}
      >
        Fernandina Beach,
        <br />
        Florida
      </span>
    </Link>
  );
}
