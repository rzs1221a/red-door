import type { Metadata } from "next";
import DoorScene from "@/components/DoorScene";
import { ButtonLink, TextLink } from "@/components/ui";
import { doorRooms } from "@/lib/home";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="wrap grid12 items-center pt-10 md:min-h-[80svh] md:pt-0">
      <div className="col-span-12 md:col-span-6">
        <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>That door isn’t here</h1>
        <p className="lead mt-8 text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>The link may be old or mistyped. Start from the home page, see the projects, or write to us about your property.</p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <ButtonLink href="/">Go to the home page</ButtonLink>
          <TextLink href="/projects/">Projects</TextLink>
          <TextLink href="/contact/">Contact</TextLink>
        </div>
      </div>
      <div className="col-span-12 mt-10 overflow-x-clip pb-14 md:col-span-5 md:col-start-8 md:mt-0">
        <DoorScene rooms={doorRooms} caption />
      </div>
    </section>
  );
}
