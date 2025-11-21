'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

// Import Components
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 w-full min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-5"></div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-16 py-16 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white space-y-8 max-w-2xl"
            >
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Welcome to <span className="text-blue-400">DIGNTAG</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300">
                  Your one-stop solution for digital identity and business growth. 
                  Create, manage, and share your professional presence with ease.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#get-started"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  Get Started
                </a>
                <a
                  href="#google-play"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm.921 18.615L12 13.33l7.47 7.099A1.8 1.8 0 0 1 18 22H6a1.8 1.8 0 0 1-1.47-.571zM21 20.5v-17a1 1 0 0 0-1.6-.8L12 10.5 4.6 2.7a1 1 0 0 0-1.6.8v17a1 1 0 0 0 1.6.8l7.4-7.8 7.4 7.8a1 1 0 0 0 1.6-.8z"/>
                  </svg>
                  Google play
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
                  <div className="absolute inset-0 bg-gray-800 rounded-[40px] p-2 shadow-2xl border-8 border-gray-900">
                    <div className="relative w-full h-full bg-white rounded-[32px] overflow-hidden">
                      {/* Phone Content - PDF ID Card with Image Background */}
                      <div className="absolute inset-0">
                        {/* Image Background */}
                        <div className="absolute inset-0 overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                            alt="ID Card Background"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
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
                            <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
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

      <div className="w-full">
        <Features />
      </div>

      <div className="w-full">
        <Testimonials />
      </div>

      <div className="w-full">
        <CTA />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
