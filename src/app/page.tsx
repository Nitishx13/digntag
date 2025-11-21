'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, CreditCard, Share2, Activity } from 'lucide-react';

// Import Components
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFE0D0] w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[linear-gradient(180deg,#F6BCCE,#FFE0D0)]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-20"></div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-16 py-16 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[#3B1F1F] space-y-8 max-w-2xl"
            >
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Best digital tag platform in India
                </h1>
                
                <p className="text-lg md:text-xl text-[#3B1F1F]/90">
                  Curate the perfect card, send it instantly, and stay informed about every interaction that follows.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/shop"
                  className="px-8 py-4 bg-[#3B1F1F] hover:bg-[#4A1D1D] text-[#FFE0D0] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  Select design
                </a>
                <a
                  href="/features"
                  className="px-8 py-4 bg-white/80 hover:bg-[#F9CFC3] text-[#3B1F1F] font-semibold rounded-lg border border-[#F6BCCE] transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  Features
                </a>
              </div>
            </motion.div>

            {/* Right Content - Phone Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative h-[600px]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-md">
                  {/* Phone Frame */}
                  <div className="absolute inset-0 bg-[#3B1F1F] rounded-[40px] p-2 shadow-2xl border-8 border-[#F6BCCE]/70">
                    <div className="relative w-full h-full bg-[#FFE0D0] rounded-[32px] overflow-hidden">
                      {/* Phone Content - PDF ID Card with Image Background */}
                      <div className="absolute inset-0">
                        {/* Image Background */}
                        <div className="absolute inset-0 overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                            alt="ID Card Background"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#3B1F1F]/70 to-transparent"></div>
                        </div>
                        
                        {/* Content Overlay */}
                        <div className="relative h-full flex flex-col justify-between p-4">
                          <div className="flex justify-between items-center">
                            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                            </div>
                          </div>

                          <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/30 bg-black shadow-inner">
                            <video
                              className="h-full w-full object-cover"
                              src="/reel1.mp4"
                              autoPlay
                              loop
                              muted
                              playsInline
                              controls={false}
                            />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Select / Share / Track callouts */}
      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {[
            {
              title: "Select Card",
              copy: "Browse curated templates and pick the perfect digital ID in seconds.",
              accent: "from-[#F6BCCE] to-[#F9CFC3]",
              icon: <CreditCard className="h-6 w-6" />,
              cta: "Learn more →",
            },
            {
              title: "Share",
              copy: "Instantly send your profile to colleagues, clients, or guests via link or QR.",
              accent: "from-[#F9CFC3] to-[#FFE0D0]",
              icon: <Share2 className="h-6 w-6" />,
              cta: "Share what matters →",
            },
            {
              title: "Track",
              copy: "See who opened your card, which links were clicked, and stay in the know.",
              accent: "from-[#FFE0D0] to-[#F6EBCC]",
              icon: <Activity className="h-6 w-6" />,
              cta: "View insights →",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-3xl border border-[#FFE0D0] bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent}`}
                >
                  <span className="text-[#3B1F1F]">{item.icon}</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#3B1F1F]/60">Fast</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#3B1F1F]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#3B1F1F]/80 flex-1 leading-relaxed">{item.copy}</p>
              <div className="mt-6 text-sm font-semibold text-[#F6BCCE] hover:text-[#3B1F1F] transition-colors">
                {item.cta}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="w-full">
        <Features />
      </div>

      <div className="w-full">
        <Testimonials />
      </div>

      <div className="w-full">
        <CTA />
      </div>

    </div>
  );
}
