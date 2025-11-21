import { Award, Wallet, Timer } from "lucide-react";
import { motion } from 'framer-motion';

const features = [
  {
    icon: Award,
    title: "High-quality craft",
    description: "Senior designers obsess over typography, illustration, and motion so every invite feels premium.",
    accent: '#F6BCCE'
  },
  {
    icon: Wallet,
    title: "Affordable packages",
    description: "Transparent pricing tiers keep bespoke experiences within reach for every celebration.",
    accent: '#F9CFC3'
  },
  {
    icon: Timer,
    title: "Fast delivery",
    description: "Streamlined workflows mean final PNG, JPEG, and PDF files land in your inbox quickly.",
    accent: '#FFE0D0'
  }
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="bg-zinc-50 py-16 sm:py-24" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Premium quality, honest pricing, lightning delivery
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
            Three reasons clients keep coming back—craft, affordability, and timelines you can trust.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-[#FFE0D0] bg-[#FFFFFF] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: feature.accent, color: '#3B1F1F' }}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#3B1F1F]">{feature.title}</h3>
              <p className="text-sm text-[#3B1F1F]/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
