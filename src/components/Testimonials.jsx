import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Saiful Hasan",
    feedback:
      "This platform helped me launch my product successfully! The community support is amazing.",
  },
  {
    id: 2,
    name: "Akash Ahmed",
    feedback:
      "A great place to discover new and innovative products. Highly recommend!",
  },
  {
    id: 3,
    name: "Rahat Hossain",
    feedback:
      "Upvoting and reviewing products has never been easier. Love this website!",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto my-12 w-11/12 max-w-screen-xl">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col items-center rounded-lg border p-6 dark:border-gray-700"
          >
            <FaQuoteLeft className="text-4xl text-gray-400" />
            <p className="mt-3 text-center italic">
              &quot;{testimonial.feedback}&quot;
            </p>
            <h3 className="mt-2 text-lg font-semibold">{testimonial.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
