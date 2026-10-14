"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { steps } from "@/lib/process";

type Status ="idle" |"sending" |"sent" |"error";
type Errors = Partial<Record<"name" |"email" |"phone" |"property-type" |"message", string>>;

const label ="block";
const hint ="mt-1.5 block small text-accent";

function validate(data: FormData): Errors {
  const e: Errors = {};
  const v = (k: string) => String(data.get(k) ??"").trim();
  if (!v("name")) e.name ="Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email ="Enter an email address we can reply to.";
  if (v("phone") && v("phone").replace(/\D/g,"").length < 10) e.phone ="Enter a phone number with area code.";
  if (!v("property-type")) e["property-type"] ="Choose the kind of property.";
  if (v("message").length < 10) e.message ="A sentence or two helps us prepare for the call.";
  return e;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status ==="sent") doneRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      // Netlify Forms: the static copy of this form lives in /public/__forms.html.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: {"Content-Type":"application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status ==="sent") {
    return (
      <div role="status" className="bg-surface p-8">
        <h2 ref={doneRef} tabIndex={-1} className="head outline-none">Thanks. We’ll be in touch.</h2>
        <p className="lead mt-5 text-muted">
          We’ll reach out to set up a consultation. {steps[0].short} If it’s urgent, call{" "}
          <a href={`tel:${site.phone.tel}`} className="link text-ink">{site.phone.display}</a>.
        </p>
      </div>
    );
  }

  const err = (k: keyof Errors) => (errors[k] ? {"aria-invalid": true as const,"aria-describedby": `${k}-error` } : {});

  return (
    <form
      name="inquiry"
      onSubmit={onSubmit}
      onBlur={(e) => {
        // Check the field just left, in plain words under it.
        const t = e.target as unknown as { name?: string };
        if (!t.name || !["name", "email", "phone", "property-type", "message"].includes(t.name)) return;
        const errs = validate(new FormData(e.currentTarget));
        const k = t.name as keyof Errors;
        setErrors((prev) => {
          const next = { ...prev };
          if (errs[k]) next[k] = errs[k];
          else delete next[k];
          return next;
        });
      }}
      noValidate
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="inquiry" />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={label}>
          Your name
          <input className="field mt-2" name="name" autoComplete="name" required enterKeyHint="next" {...err("name")} />
          {errors.name && <span id="name-error" className={hint}>{errors.name}</span>}
        </label>
        <label className={label}>
          Phone, if you’d rather we call
          <input className="field mt-2" name="phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" {...err("phone")} />
          {errors.phone && <span id="phone-error" className={hint}>{errors.phone}</span>}
        </label>
      </div>

      <label className={label}>
        Email
        <input className="field mt-2" name="email" type="email" inputMode="email" autoComplete="email" required enterKeyHint="next" {...err("email")} />
        {errors.email && <span id="email-error" className={hint}>{errors.email}</span>}
      </label>

      <label className={label}>
        Property address, or the neighborhood
        <input className="field mt-2" name="property" autoComplete="street-address" enterKeyHint="next" />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={label}>
          Property type
          <select className="field mt-2" name="property-type" defaultValue="" required {...err("property-type")}>
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
          <select className="field mt-2" name="timeline" defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>As soon as possible</option>
            <option>In 1 to 3 months</option>
            <option>In 3 to 6 months</option>
            <option>Just planning</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={label}>
          {steps[0].listLead}
          <select className="field mt-2" name="goal" defaultValue="">
            <option value="" disabled>Choose one</option>
            {steps[0].items!.map((g) => (
              <option key={g}>{g.replace("?","")}</option>
            ))}
            <option>Something else</option>
          </select>
        </label>
        <label className={label}>
          Budget range, if you have one
          <select className="field mt-2" name="budget" defaultValue="">
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
        <textarea className="field mt-2 min-h-36" name="message" required {...err("message")} />
        {errors.message && <span id="message-error" className={hint}>{errors.message}</span>}
      </label>

      {status ==="error" && (
        <p role="alert" className="bg-surface px-4 py-3">
          The request didn’t go through. Check your connection and send it again, or call {site.phone.display}.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" disabled={status ==="sending"} className="btn w-full min-h-12 disabled:opacity-60 sm:w-auto">
          {status ==="sending" ? "Sending…" : "Send request"}
        </button>
        <a href={`tel:${site.phone.tel}`} className="link inline-block py-2.5 md:py-0">or call {site.phone.display}</a>
      </div>
      <p className="small text-muted">
        We use what you send only to reply about your project. <Link href="/privacy/" className="link text-ink">Privacy</Link>
      </p>
    </form>
  );
}
