import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Ready to Create Your Perfect Digital Invitation?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100"
          >
            Join thousands of happy couples and event planners who trust us to make their special moments even more memorable.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="/signup"
              className="rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm transition-all duration-300 hover:bg-zinc-100 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get Started for Free
            </a>
            <a
              href="/templates"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-white/20 hover:shadow-md"
            >
              Browse Templates <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
