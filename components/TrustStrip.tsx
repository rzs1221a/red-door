import { why } from "@/lib/copy";
import { site } from "@/lib/site";
import { Award, Check } from "./icons";

const picks = ["30+ Years of Experience", "Design + Construction", "Bonded & Insured", "Transparent Communication"];

export default function TrustStrip() {
  const items = why.filter((w) => picks.includes(w.title)).map((w) => ({ label: w.title, icon: "check" as const }));
  const awards = site.awards.map((a) => ({ label: a.name, title: a.by, icon: "award" as const }));
  return (
    <div className="border-b border-line bg-cream">
      <ul className="mx-auto grid max-w-site grid-cols-2 items-center gap-x-6 gap-y-3 px-5 py-4 text-[0.86rem] font-medium text-ink sm:flex sm:flex-wrap sm:gap-x-9 md:px-8 lg:justify-between lg:px-10">
        {[...items, ...awards].map((it) => (
          <li key={it.label} className="inline-flex items-center gap-2.5" title={"title" in it ? it.title : undefined}>
            {it.icon === "award" ? <Award size={17} className="text-brass" /> : <Check size={16} className="text-door" />}
            <span>{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
