import { Star } from "lucide-react";
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "The most beautiful digital invitations I've ever seen! Our guests were blown away by the design and how easy it was to RSVP.",
    author: "Sarah & Michael",
    role: "Wedding, June 2023",
    stars: 5
  },
  {
    quote: "Saving so much time on guest management. The RSVP tracking is a game-changer for event planning!",
    author: "Jessica T.",
    role: "Event Planner",
    stars: 5
  },
  {
    quote: "The photo gallery feature let us share our engagement photos in such a beautiful way. Our family loved it!",
    author: "David & Emily",
    role: "Engagement, March 2023",
    stars: 5
  }
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-[#FFE0D0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-[#3B1F1F] sm:text-3xl md:text-4xl">
            Loved by Couples & Event Planners
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#3B1F1F]/80">
            Don't just take our word for it. Here's what our users say
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative z-10">
                <div className="flex text-[#F6BCCE]">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4">
                  <p className="text-[#3B1F1F]">"{testimonial.quote}"</p>
                </blockquote>
                <div className="mt-6">
                  <p className="font-medium text-[#3B1F1F]">{testimonial.author}</p>
                  <p className="text-sm text-[#3B1F1F]/70">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
