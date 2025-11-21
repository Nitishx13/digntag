'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CreditCard, Share2, Activity, Download } from 'lucide-react';

import { homeSliderImages, homeFeaturedTemplates } from '@/data/home';

// Import Components
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

const sliderImages = homeSliderImages;
const featuredTemplates = homeFeaturedTemplates;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFE0D0] w-full">
      {/* Shared gallery slider */}
      <section className="relative w-full bg-[#FFF5F1] py-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-30"></div>
        <div className="relative flex w-full flex-col gap-0 px-0">

          <div className="relative w-full rounded-none border-y border-[#FFE0D0] bg-white/90 shadow-2xl">
            <div className="relative h-[80vh] overflow-hidden">
              {sliderImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0'} bg-[#1a1a1a]`}
                >
                  <img
                    src={src}
                    alt="Invitation design"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-transparent"></div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-[#3B1F1F]' : 'w-3 bg-[#E7C5BB]'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured invites */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-14">
        <div className="rounded-3xl border border-[#FFE0D0] bg-white/90 p-6 shadow-lg space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">Featured invites</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#3B1F1F]">Handpicked templates customers love</h2>
            </div>
            <Link
              href="/shop"
              className="rounded-full border border-[#3B1F1F] px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#3B1F1F] hover:bg-[#3B1F1F] hover:text-[#FFE0D0]"
            >
              See all
            </Link>
          </div>
          <p className="text-sm text-[#3B1F1F]/70">
            Browse cinematic wedding, anniversary, and business layouts. Each template is crafted with premium gradients and typography for instant wow.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredTemplates.map((template) => (
              <article key={template.id} className="rounded-2xl border border-[#FFE0D0] bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#3B1F1F]/60">
                  <span>{template.tag}</span>
                  <span
                    className="rounded-full bg-[#FFF1EB] px-2 py-1 text-[10px] font-semibold"
                    style={{ color: template.accent }}
                  >
                    Featured
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#3B1F1F]">{template.title}</h3>
                <p className="text-sm text-[#3B1F1F]/70">{template.subtitle}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href="/login"
                    className="text-xs font-semibold uppercase tracking-[0.3em]"
                    style={{ color: template.accent }}
                  >
                    Preview
                  </Link>
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white"
                    style={{ backgroundColor: template.accent }}
                  >
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Select / Share / Track callouts */}
      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
          {[
            {
              title: "Book Your Design",
              copy: "Select a curated design or brief us for something custom—either way you’re ready in seconds.",
              accent: "from-[#F6BCCE] to-[#F9CFC3]",
              icon: <CreditCard className="h-6 w-6" />,
              cta: "Learn more →",
            },
            {
              title: "Download",
              copy: "Deliver assets instantly—export in PNG, JPEG, or PDF so clients always get the right format.",
              accent: "from-[#FFE0D0] to-[#FDF1E4]",
              icon: <Download className="h-6 w-6" />,
              cta: "Deliver files →",
            },
            {
              title: "Share",
              copy: "Send links or QR codes so colleagues, clients, and guests can access designs on any device.",
              accent: "from-[#F9CFC3] to-[#FFE0D0]",
              icon: <Share2 className="h-6 w-6" />,
              cta: "Share what matters →",
            },
            {
              title: "Track",
              copy: "See who opened your card, which links were clicked, and when downloads happened.",
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
