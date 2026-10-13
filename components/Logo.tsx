import Link from "next/link";

// Placeholder wordmark. Swap for /images/reddoor_logo.png (from Will, Sept 17) when the file is added.
export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Red Door Revivals Florida, home">
      <svg viewBox="0 0 20 30" className="h-8 w-[22px] shrink-0" aria-hidden="true">
        <rect x="0" y="0" width="20" height="30" fill={inverse ? "#fff" : "#1d2b2f"} />
        <rect x="3" y="3" width="14" height="27" fill="#9e1b17" />
        <circle cx="14.5" cy="17" r="1.2" fill="#d9bb72" />
      </svg>
      <span className="leading-none">
        <span className={`display block text-[1.35rem] ${inverse ? "text-white" : "text-ink"}`}>Red Door Revivals</span>
        <span className={`mt-1 block text-[0.78rem] tracking-[0.04em] ${inverse ? "text-white/70" : "text-ink-soft"}`}>
          Fernandina Beach, Florida
        </span>
      </span>
    </Link>
  );
}
