import Link from "next/link";

// Red Door Revivals logo, rendered from the vector EPS. The reverse file swaps black ink for white.
export default function Logo({
  inverse = false,
  size = "md",
  withPlace = true,
  placeFrom = "sm",
}: {
  inverse?: boolean;
  size?: "sm" | "md";
  withPlace?: boolean;
  /** Breakpoint at which the "Fernandina Beach, Florida" lockup appears. */
  placeFrom?: "sm" | "xl";
}) {
  const place = placeFrom === "xl" ? "xl:block" : "sm:block";
  const h = size === "sm" ? "h-9 md:h-10" : "h-10 md:h-12";
  return (
    <Link href="/" className="inline-flex items-center gap-4" aria-label="Red Door Revivals Florida, home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={inverse ? "/images/reddoor-logo-reverse-2x.png" : "/images/reddoor-logo-2x.png"}
        alt="Red Door Revivals"
        width={313}
        height={104}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className={`${h} w-auto`}
      />
      {withPlace && (
        <span
          className={`hidden border-l pl-4 text-[0.74rem] leading-tight tracking-[0.06em] uppercase ${place} ${
            inverse ? "border-white/25 text-white/70" : "border-line text-ink-soft"
          }`}
        >
          Fernandina Beach
          <br />
          Florida
        </span>
      )}
    </Link>
  );
}
