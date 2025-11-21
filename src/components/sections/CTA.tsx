import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-16 sm:py-24" style={{ background: 'linear-gradient(140deg, #F6BCCE, #F9CFC3)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-[#3B1F1F] sm:text-4xl"
          >
            Ready to Create Your Perfect Digital Invitation?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#3B1F1F]"
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
              className="rounded-lg bg-[#FFE0D0] px-6 py-3.5 text-sm font-semibold text-[#3B1F1F] shadow-sm transition-all duration-300 hover:bg-[#F6EBCC] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B1F1F]"
            >
              Get Started for Free
            </a>
            <a
              href="/shop"
              className="rounded-lg border border-[#FFE0D0] bg-[#F6EBCC]/80 px-6 py-3.5 text-sm font-semibold text-[#3B1F1F] shadow-sm transition-all duration-300 hover:bg-[#F6BCCE] hover:shadow-md"
            >
              Browse Templates <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
