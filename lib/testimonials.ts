// Client testimonials. Leave empty until Red Door supplies real, attributed quotes;
// the Testimonials section renders nothing while this list is empty. Never invent one.
export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Vacation-rental owner" */
  role?: string;
  /** e.g. "Fernandina Beach" */
  place?: string;
};

export const testimonials: Testimonial[] = [];
