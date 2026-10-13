"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 block w-full rounded-[3px] border border-line bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none";
const label = "block text-[0.95rem] font-medium";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
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
      <div role="status" className="rounded-[3px] border-l-4 border-door bg-white p-7">
        <h2 className="display text-[2rem]">Request sent</h2>
        <p className="mt-3 text-lg text-ink-soft">
          Thanks. We&rsquo;ll reply within one business day to set up a walkthrough. If it&rsquo;s urgent, call{" "}
          <a href={`tel:${site.phone.tel}`} className="font-medium text-door underline">{site.phone.display}</a>.
        </p>
      </div>
    );
  }

  return (
    <form name="inquiry" onSubmit={onSubmit} className="space-y-5">
      <input type="hidden" name="form-name" value="inquiry" />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Your name
          <input className={field} name="name" autoComplete="name" required />
        </label>
        <label className={label}>
          Phone
          <input className={field} name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>

      <label className={label}>
        Email
        <input className={field} name="email" type="email" autoComplete="email" required />
      </label>

      <label className={label}>
        Property address
        <input className={field} name="property" placeholder="Street and city, or the neighborhood" />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Property type
          <select className={field} name="property-type" defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>Vacation rental</option>
            <option>Long-term rental</option>
            <option>Investment purchase</option>
            <option>Second home</option>
            <option>Other</option>
          </select>
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

      <label className={label}>
        What do you have in mind?
        <textarea
          className={`${field} min-h-36`}
          name="message"
          placeholder="Rooms, repairs, budget range, anything we should know"
          required
        />
      </label>

      {status === "error" && (
        <p role="alert" className="rounded-[3px] bg-door/10 px-4 py-3 text-door-deep">
          The request didn&rsquo;t go through. Check your connection and send it again, or call {site.phone.display}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-[3px] bg-door px-7 py-3.5 font-medium text-white hover:bg-door-deep disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
