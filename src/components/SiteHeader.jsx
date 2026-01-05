import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const whatsappContactUrl = 'https://wa.me/918882816805?text=I%20want%20to%20know%20more'
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 z-[200] bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="/" className="inline-flex items-center gap-2">
          <img src="/assets/img/digntag_logo 1.png" alt="Digntag logo" className="h-10 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="/features" className="text-gray-600 hover:text-primary transition duration-150 font-medium">Features</a>
          <div className="relative group">
            <a href="/events" className="inline-flex items-center gap-1 text-gray-600 hover:text-primary transition duration-150 font-medium">
              <span>Event Types</span>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <a href="/events/wedding" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Wedding</a>
              <a href="/events/birthday" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Birthday</a>
              <a href="/events/baby" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Baby Events</a>
              <a href="/events/corporate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Corporate Events</a>
            </div>
          </div>
          <a href="/how-it-works" className="text-gray-600 hover:text-primary transition duration-150 font-medium">How It Works</a>
          <a href="/pricing" className="text-gray-600 hover:text-primary transition duration-150 font-medium">Pricing</a>

          {isAdmin ? (
            <a href="/admin/whatsapp" className="text-gray-600 hover:text-primary transition duration-150 font-medium">
              WhatsApp notify
            </a>
          ) : null}
        
          <a
            href={whatsappContactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition duration-150 font-medium"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="inline-flex md:hidden items-center justify-center h-11 w-11 rounded-xl border border-gray-100 bg-white text-primary shadow-sm hover:bg-gray-50 transition"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>

          <a
            href={whatsappContactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-6 py-2 bg-cta text-white font-bold rounded-full shadow-xl hover:bg-cta/90 transition duration-150"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[300] md:hidden ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Close menu"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          id="mobile-menu"
          className={`absolute left-0 top-0 z-[310] h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
            <a href="/" className="inline-flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/assets/img/digntag_logo 1.png" alt="Digntag logo" className="h-9 w-auto" />
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-100 bg-white text-primary hover:bg-gray-50 transition"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="px-5 py-5">
            {isAdmin ? (
              <a
                href="/admin/whatsapp"
                className="block px-4 py-3 rounded-2xl bg-gray-50 text-gray-900 font-semibold ring-1 ring-gray-100 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                WhatsApp notify
              </a>
            ) : null}
            <div className="mt-3 rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm">
              <a
                href="/features"
                className="block px-4 py-3 rounded-2xl text-gray-900 font-semibold hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>

              <div className="px-4 pb-3">
                <a
                  href="/events"
                  className="block px-3 py-2 rounded-xl text-gray-900 font-semibold bg-gray-50 ring-1 ring-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Event Types
                </a>

                <div className="mt-2 pl-2 space-y-1 border-l border-gray-100">
                  <a
                    href="/events/wedding"
                    className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Wedding
                  </a>
                  <a
                    href="/events/birthday"
                    className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Birthday
                  </a>
                  <a
                    href="/events/baby"
                    className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Baby Events
                  </a>
                  <a
                    href="/events/corporate"
                    className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Corporate Events
                  </a>
                  <a
                    href="/events/valentines"
                    className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Valentine's Day
                  </a>
                </div>
              </div>

              <a
                href="/how-it-works"
                className="block px-4 py-3 rounded-2xl text-gray-900 font-semibold hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="/pricing"
                className="block px-4 py-3 rounded-2xl text-gray-900 font-semibold hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
            </div>
          </nav>

          <div className="px-5 pb-6">
            <a
              href={whatsappContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-5 py-3 bg-cta text-white font-bold rounded-xl shadow-lg hover:bg-cta/90 transition duration-150"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
