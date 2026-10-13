import type { Metadata } from "next";
import { Container, CtaBand, PageIntro, PhotoSlot } from "@/components/ui";

export const metadata: Metadata = {
  title: "Renovation for Rental Owners and Investors",
  description:
    "Restoration, rehab, and turnkey renovation management for rental and investment property in Fernandina Beach and Amelia Island, built for owners who are not on site.",
  alternates: { canonical: "/rental-owners/" },
};

const services = [
  {
    title: "Restoration",
    body:
      "Bring an older island home back to good condition without losing what makes it rent: original trim, floors, porches, and character, repaired and protected instead of torn out.",
  },
  {
    title: "Rehab and refresh",
    body:
      "Kitchens, baths, flooring, paint, lighting, and layout changes that raise your nightly or monthly rate. Scoped to the return you need, not to everything that could be done.",
  },
  {
    title: "Turnkey project management",
    body:
      "We run the whole job: design, permits, trades, inspections, deliveries, and clean-up. You approve the plan and the price, and we hand back a property ready for guests or tenants.",
  },
  {
    title: "Storm and wear repairs",
    body:
      "Water intrusion, rot, siding, roofing coordination, and the wear that salt air and steady turnover leave behind, documented with photos so you can see the work from wherever you are.",
  },
];

export default function RentalOwners() {
  return (
    <>
      <PageIntro title="Renovation for owners who aren't on site">
        <p>
          You shouldn&rsquo;t have to fly in to find out whether the tile went down. We plan the work, price it up
          front, manage every trade, and keep you current in one place.
        </p>
      </PageIntro>

      <section className="border-b border-line">
        <Container className="grid gap-x-14 gap-y-12 py-16 md:grid-cols-2 md:py-24">
          {services.map((s) => (
            <div key={s.title} className="border-t-2 border-ink pt-5">
              <h2 className="display text-[1.9rem]">{s.title}</h2>
              <p className="measure mt-3 text-lg text-ink-soft">{s.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-b border-line bg-paper-2">
        <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">What you can count on</h2>
            <ul className="mt-8 space-y-5 text-lg">
              <li className="border-l-2 border-door pl-5">
                A written scope and price before work starts. No surprise invoices.
              </li>
              <li className="border-l-2 border-door pl-5">
                One project manager who answers for the schedule and budget.
              </li>
              <li className="border-l-2 border-door pl-5">
                Progress photos, schedule, and costs in the client portal, any time.
              </li>
              <li className="border-l-2 border-door pl-5">
                Changes priced and approved in writing before they happen.
              </li>
              <li className="border-l-2 border-door pl-5">
                Finishes chosen to survive salt air, sand, and steady turnover.
              </li>
            </ul>
          </div>
          <PhotoSlot label="Project photo: rental living room, after" ratio="aspect-[4/5]" />
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <h2 className="display text-[2.2rem] md:text-[3rem]">Where we work</h2>
          <p className="measure mt-5 text-lg text-ink-soft">
            Fernandina Beach, Amelia Island, Yulee, and the rest of Nassau County. Historic district homes, beach
            condos, cottages, and single-family rentals.
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
