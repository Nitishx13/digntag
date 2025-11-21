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
                  href="#get-started"
                  className="px-8 py-4 bg-[#3B1F1F] hover:bg-[#4A1D1D] text-[#FFE0D0] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  Start Selection
                </a>
                <a
                  href="#google-play"
                  className="px-8 py-4 bg-white/80 hover:bg-[#F9CFC3] text-[#3B1F1F] font-semibold rounded-lg border border-[#F6BCCE] transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  Share & Track
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
                        <div className="relative h-full flex flex-col justify-between p-6">
                          {/* Top Bar */}
                          <div className="flex justify-between items-center">
                            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Main Content */}
                          <div className="text-white mt-auto">
                            <div className="mb-4">
                              <h3 className="text-2xl font-bold mb-1">PDF Id Card</h3>
                              <p className="text-sm opacity-90">Create your digital ID in seconds</p>
                            </div>
                            <button className="w-full py-3 bg-[#FFE0D0] text-[#3B1F1F] font-semibold rounded-lg shadow-md hover:bg-[#F9CFC3] transition-all flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                              </svg>
                              CREATE NOW
                            </button>
                          </div>
                          
                          {/* Bottom Bar */}
                          <div className="flex justify-center mt-4 space-x-6">
                            <div className="text-center">
                              <svg className="w-6 h-6 mx-auto mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                              </svg>
                              <span className="text-xs text-white/80">Save</span>
                            </div>
                            <div className="text-center">
                              <svg className="w-6 h-6 mx-auto mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                              </svg>
                              <span className="text-xs text-white/80">Share</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-10 right-0 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Create New</p>
                    <p className="text-xs text-gray-400">Digital Card</p>
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
              title: 'Select Card',
              copy: 'Browse curated templates and pick the perfect digital ID in seconds.',
              accent: '#F6BCCE',
              icon: <CreditCard className="h-6 w-6" />
            },
            {
              title: 'Share',
              copy: 'Instantly send your profile to colleagues, clients, or guests via link or QR.',
              accent: '#F9CFC3',
              icon: <Share2 className="h-6 w-6" />
            },
            {
              title: 'Track',
              copy: 'See who opened your card, which links were clicked, and stay in the know.',
              accent: '#FFE0D0',
              icon: <Activity className="h-6 w-6" />
            },
          ].map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-3xl border border-[#FFE0D0] bg-white p-6 shadow-lg transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white"
                  style={{ boxShadow: `0 10px 20px -10px ${item.accent}` }}
                >
                  <span className="text-[#3B1F1F]">{item.icon}</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#3B1F1F]/60">Fast</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#3B1F1F]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#3B1F1F]/80 flex-1">{item.copy}</p>
              <div className="mt-6 text-sm font-semibold text-[#F6BCCE]">Learn more →</div>
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
