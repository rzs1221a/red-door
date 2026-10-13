"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { steps } from "@/lib/process";
import { ArrowRight, Phone } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 block w-full rounded-[3px] border border-line bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink-soft/55 transition-colors focus:border-ink focus:outline-none aria-[invalid=true]:border-door";
const label = "block text-[0.92rem] font-medium";
const hint = "mt-1.5 text-[0.85rem] text-door-deep";

type Errors = Partial<Record<"name" | "email" | "phone" | "property-type" | "message", string>>;

function validate(data: FormData): Errors {
  const e: Errors = {};
  const v = (k: string) => String(data.get(k) ?? "").trim();
  if (!v("name")) e.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "Enter an email address we can reply to.";
  if (v("phone") && v("phone").replace(/\D/g, "").length < 10) e.phone = "Enter a phone number with area code.";
  if (!v("property-type")) e["property-type"] = "Choose the kind of property.";
  if (v("message").length < 10) e.message = "A sentence or two helps us prepare for the call.";
  return e;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      // Netlify Forms: the static copy of this form lives in /public/__forms.html.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[3px] border-l-4 border-door bg-white p-8 shadow-card">
        <p className="eyebrow eyebrow-rule">Request received</p>
        <h2 ref={doneRef} tabIndex={-1} className="display mt-4 text-display-md outline-none">
          Thanks. We&rsquo;ll be in touch.
        </h2>
        <p className="measure mt-4 text-lede text-ink-soft">
          We&rsquo;ll reach out to set up a consultation. {steps[0].short} If it&rsquo;s urgent, call{" "}
          <a href={`tel:${site.phone.tel}`} className="font-medium text-door-deep underline underline-offset-4">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-error` } : {};

  return (
    <form name="inquiry" onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="hidden" name="form-name" value="inquiry" />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Your name
          <input className={field} name="name" autoComplete="name" required enterKeyHint="next" {...err("name")} />
          {errors.name && <span id="name-error" className={hint}>{errors.name}</span>}
        </label>
        <label className={label}>
          Phone <span className="font-normal text-ink-soft">(optional)</span>
          <input className={field} name="phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" {...err("phone")} />
          {errors.phone && <span id="phone-error" className={hint}>{errors.phone}</span>}
        </label>
      </div>

      <label className={label}>
        Email
        <input className={field} name="email" type="email" inputMode="email" autoComplete="email" required enterKeyHint="next" {...err("email")} />
        {errors.email && <span id="email-error" className={hint}>{errors.email}</span>}
      </label>

      <label className={label}>
        Property address <span className="font-normal text-ink-soft">(optional)</span>
        <input className={field} name="property" autoComplete="street-address" placeholder="Street and city, or the neighborhood" enterKeyHint="next" />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Property type
          <select className={field} name="property-type" defaultValue="" required {...err("property-type")}>
            <option value="" disabled>Choose one</option>
            <option>Vacation rental</option>
            <option>Long-term rental</option>
            <option>Investment property</option>
            <option>Second home</option>
            <option>Home renovation</option>
            <option>Other</option>
          </select>
          {errors["property-type"] && <span id="property-type-error" className={hint}>{errors["property-type"]}</span>}
        </label>
        <label className={label}>
          When do you want to start?
          <select className={field} name="timeline" defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>As soon as possible</option>
            <option>In 1 to 3 months</option>
            <option>In 3 to 6 months</option>
            <option>Just planning</option>
          </select>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          {steps[0].listLead}
          <select className={field} name="goal" defaultValue="">
            <option value="" disabled>Choose one</option>
            {steps[0].items!.map((g) => (
              <option key={g}>{g.replace("?", "")}</option>
            ))}
            <option>Something else</option>
          </select>
        </label>
        <label className={label}>
          Budget range <span className="font-normal text-ink-soft">(optional)</span>
          <select className={field} name="budget" defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>Under $25,000</option>
            <option>$25,000 to $75,000</option>
            <option>$75,000 to $150,000</option>
            <option>Over $150,000</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>

      <label className={label}>
        What do you have in mind?
        <textarea
          className={`${field} min-h-36`}
          name="message"
          placeholder="Rooms, repairs, anything we should know"
          required
          {...err("message")}
        />
        {errors.message && <span id="message-error" className={hint}>{errors.message}</span>}
      </label>

      {status === "error" && (
        <p role="alert" className="rounded-[3px] border-l-4 border-door bg-door/10 px-4 py-3 text-door-deep">
          The request didn&rsquo;t go through. Check your connection and send it again, or call {site.phone.display}.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="arrow-nudge inline-flex items-center gap-2.5 rounded-[3px] bg-door px-7 py-4 font-medium text-white transition-colors hover:bg-door-deep disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send request"}
          <ArrowRight size={17} />
        </button>
        <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink hover:text-door-deep">
          <Phone size={16} /> or call {site.phone.display}
        </a>
      </div>
      <p className="text-[0.82rem] text-ink-soft">
        We use what you send only to reply about your project. See our{" "}
        <Link href="/privacy/" className="underline underline-offset-4 hover:text-ink">privacy notice</Link>.
      </p>
    </form>
  );
}
