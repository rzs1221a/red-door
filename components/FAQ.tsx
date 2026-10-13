import type { Faq } from "@/lib/faq";
import { ChevronDown } from "./icons";

export default function FAQ({ items, tone = "default" }: { items: Faq[]; tone?: "default" | "light" }) {
  const light = tone === "light";
  return (
    <div className={`divide-y border-y ${light ? "divide-white/10 border-white/10" : "divide-line border-line"}`}>
      {items.map((f) => (
        <details key={f.q} className="faq group" name="faq">
          <summary className="flex items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-medium md:text-[1.15rem]">
            {f.q}
            <span className={`faq-chevron shrink-0 rounded-full border p-1.5 ${light ? "border-white/25" : "border-line text-ink-soft"}`}>
              <ChevronDown size={16} />
            </span>
          </summary>
          <p className={`measure pb-6 ${light ? "text-white/75" : "text-ink-soft"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
