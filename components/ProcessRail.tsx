import Link from "next/link";
import { steps } from "@/lib/process";
import { RevealGroup } from "./Reveal";
import { ArrowRight } from "./icons";

// Compact 7-step rail for the home page. The full version lives on /design-process/.
export default function ProcessRail() {
  return (
    <RevealGroup as="ol" className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" stagger={70}>
      {steps.map((s, i) => (
        <li key={s.title} className="group relative border-t border-line pt-5">
          <span aria-hidden="true" className="absolute -top-px left-0 h-[2px] w-10 bg-door transition-[width] duration-700 ease-out-expo group-hover:w-full" />
          <span className="display text-[1.6rem] leading-none text-door">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-[1.08rem] font-semibold">{s.title}</h3>
          <p className="mt-2 text-[0.95rem] text-ink-soft">{s.short}</p>
        </li>
      ))}
      <li className="flex items-end border-t border-line pt-5">
        <Link href="/design-process/" className="arrow-nudge inline-flex items-center gap-2 font-medium text-door-deep">
          <span className="link-underline">See the full process</span>
          <ArrowRight size={16} />
        </Link>
      </li>
    </RevealGroup>
  );
}
