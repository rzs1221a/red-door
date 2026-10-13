import { steps } from "@/lib/process";
import { RevealGroup } from "./Reveal";

// Only facts already stated elsewhere on the site.
const stats = [
  { value: "30+", label: "Years of residential and commercial experience" },
  { value: String(steps.length), label: "Steps in the Red Door Process, from consultation to completion" },
  { value: "1", label: "Team that brings design and construction management together" },
  { value: "2000", label: "Our principals have worked together since" },
];

export default function Stats({ tone = "default" }: { tone?: "default" | "light" }) {
  const light = tone === "light";
  return (
    <RevealGroup as="ul" className={`grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 ${light ? "text-white" : ""}`}>
      {stats.map((s) => (
        <li key={s.label} className={`border-l pl-6 ${light ? "border-white/20" : "border-line"}`}>
          <p className={`display text-[3.2rem] leading-none md:text-[4rem] ${light ? "text-white" : "text-ink"}`}>{s.value}</p>
          <p className={`mt-3 max-w-[16rem] text-[0.95rem] ${light ? "text-white/65" : "text-ink-soft"}`}>{s.label}</p>
        </li>
      ))}
    </RevealGroup>
  );
}
