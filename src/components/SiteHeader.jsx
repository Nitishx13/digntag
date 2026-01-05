import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEventMegaOpen, setIsEventMegaOpen] = useState(false)
  const [eventMegaTab, setEventMegaTab] = useState('valentines')
  const [mobileSections, setMobileSections] = useState({ features: true, eventTypes: true, digital: false, tools: false })
  const megaCloseTimerRef = useRef(null)
  const megaTabTimerRef = useRef(null)
  const location = useLocation()
  const whatsappContactUrl = 'https://wa.me/918882816805?text=I%20want%20to%20know%20more'
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    return () => {
      if (megaCloseTimerRef.current) clearTimeout(megaCloseTimerRef.current)
      if (megaTabTimerRef.current) clearTimeout(megaTabTimerRef.current)
    }
  }, [])

  const openMega = () => {
    if (megaCloseTimerRef.current) clearTimeout(megaCloseTimerRef.current)
    setIsEventMegaOpen(true)
  }

  const closeMegaSoon = () => {
    if (megaCloseTimerRef.current) clearTimeout(megaCloseTimerRef.current)
    megaCloseTimerRef.current = setTimeout(() => {
      setIsEventMegaOpen(false)
    }, 160)
  }

  const setMegaTabSoon = (key) => {
    if (megaTabTimerRef.current) clearTimeout(megaTabTimerRef.current)
    megaTabTimerRef.current = setTimeout(() => {
      setEventMegaTab(key)
    }, 60)
  }

  const toggleMobileSection = (key) => {
    setMobileSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const eventMegaTabs = [
    { key: 'valentines', label: "Valentine's Day" },
    { key: 'newyears', label: "New Year's Cards" },
    { key: 'baby', label: 'Baby' },
    { key: 'kidsBirthday', label: "Kids' Birthday" },
    { key: 'adultBirthday', label: 'Adult Birthday' },
    { key: 'wedding', label: 'Wedding' },
    { key: 'business', label: 'Business' },
    { key: 'parties', label: 'Parties' },
  ]

  const eventMegaContent = {
    valentines: [
      {
        heading: 'Invitations',
        links: [
          { label: "Valentine's Day", href: '/events/valentines' },
          { label: "Galentine's Day", href: '/events/galentines-day' },
          { label: 'Greeting Cards', href: '/events/greeting-cards' },
        ],
      },
      {
        heading: 'Upload Your Own',
        links: [
          { label: 'Photo', href: '/upload/photo' },
          { label: 'Design', href: '/upload/design' },
          { label: 'Logo', href: '/upload/logo' },
        ],
      },
    ],
    newyears: [
      {
        heading: "New Year's Cards",
        links: [
          { label: "New Year's Cards", href: '/events/new-years-cards' },
          { label: 'Greeting Cards', href: '/events/greeting-cards' },
        ],
      },
      {
        heading: 'Upload Your Own',
        links: [
          { label: 'Photo', href: '/upload/photo' },
          { label: 'Design', href: '/upload/design' },
          { label: 'Logo', href: '/upload/logo' },
        ],
      },
    ],
    baby: [
      {
        heading: 'Baby',
        links: [
          { label: 'Baby', href: '/events/baby' },
          { label: 'Greeting Cards', href: '/events/greeting-cards' },
        ],
      },
      {
        heading: 'Digital invitations',
        links: [
          { label: 'Digital invitation templates', href: '/invitations/digital' },
          { label: 'Upload Your Own', href: '/upload' },
        ],
      },
    ],
    kidsBirthday: [
      {
        heading: "Kids' Birthday",
        links: [
          { label: "Kids' Birthday", href: '/events/kids-birthday' },
          { label: 'Birthday', href: '/events/birthday' },
        ],
      },
      {
        heading: 'Digital invitations',
        links: [
          { label: 'Digital invitation templates', href: '/invitations/digital' },
          { label: 'Upload Your Own', href: '/upload' },
        ],
      },
    ],
    adultBirthday: [
      {
        heading: 'Adult Birthday',
        links: [
          { label: 'Adult Birthday', href: '/events/adult-birthday' },
          { label: 'Birthday', href: '/events/birthday' },
        ],
      },
      {
        heading: 'Digital invitations',
        links: [
          { label: 'Digital invitation templates', href: '/invitations/digital' },
          { label: 'Upload Your Own', href: '/upload' },
        ],
      },
    ],
    wedding: [
      {
        heading: 'Wedding',
        links: [
          { label: 'Wedding', href: '/events/wedding' },
          { label: 'Save the date', href: '/invitations/save-the-date' },
        ],
      },
      {
        heading: 'Digital invitations',
        links: [
          { label: 'Digital invitation templates', href: '/invitations/digital' },
          { label: 'Upload Your Own', href: '/upload' },
        ],
      },
    ],
    business: [
      {
        heading: 'Business',
        links: [
          { label: 'Business', href: '/events/business' },
          { label: 'Corporate Events', href: '/events/corporate' },
          { label: 'Small business website', href: '/services/small-business-website' },
        ],
      },
      {
        heading: 'Digital invitations',
        links: [
          { label: 'Digital invitation templates', href: '/invitations/digital' },
          { label: 'Upload Your Own', href: '/upload' },
        ],
      },
    ],
    parties: [
      {
        heading: 'Parties',
        links: [
          { label: 'Parties', href: '/events/parties' },
          { label: 'Birthday', href: '/events/birthday' },
          { label: "New Year's Cards", href: '/events/new-years-cards' },
        ],
      },
      {
        heading: 'Digital invitations',
        links: [
          { label: 'Digital invitation templates', href: '/invitations/digital' },
          { label: 'Upload Your Own', href: '/upload' },
        ],
      },
    ],
  }

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <div className="bg-amber-50 text-amber-900 text-center text-sm font-extrabold py-2 px-4 border-b border-amber-200">
        🚧 Website Under Development - Some features may not be available 🚧
      </div>
      <header className="sticky top-0 z-[200] bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="/" className="inline-flex items-center gap-2">
          <img src="/assets/img/digntag_logo 1.png" alt="Digntag logo" className="h-10 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="relative group">
            <a href="/features" className="inline-flex items-center gap-1 text-gray-600 hover:text-primary transition duration-150 font-medium">
              <span>Features</span>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <a href="/features" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">All Features</a>
              <a href="/digital-growth-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Digital Growth Services
              </a>
            </div>
          </div>

          <div className="relative group">
            <a href="/gift-finder" className="inline-flex items-center gap-1 text-gray-600 hover:text-primary transition duration-150 font-medium">
              <span>Tools</span>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <a href="/gift-finder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Gift Finder</a>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={closeMegaSoon}
          >
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

            <div
              className={`fixed left-0 right-0 top-[72px] z-[210] transition duration-200 ease-out ${
                isEventMegaOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              onMouseEnter={openMega}
              onMouseLeave={closeMegaSoon}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                    <div className="bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 py-4 border-b border-gray-100">
                      <div className="px-4">
                        <div className="flex items-center gap-2 overflow-x-auto px-2 py-1 scroll-pl-6 scroll-pr-6">
                          {eventMegaTabs.map((t) => (
                            <button
                              key={t.key}
                              type="button"
                              onMouseEnter={() => setMegaTabSoon(t.key)}
                              onFocus={() => setEventMegaTab(t.key)}
                              className={`shrink-0 px-4 py-2 rounded-full text-sm font-extrabold transition ring-1 ${
                                eventMegaTab === t.key
                                  ? 'bg-primary text-white ring-primary shadow-sm'
                                  : 'bg-white text-primary ring-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 py-7">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(eventMegaContent[eventMegaTab] || []).map((col, idx) => (
                          <div
                            key={col.heading}
                            className={idx === 0 ? '' : 'lg:pl-6 lg:border-l lg:border-gray-100'}
                          >
                            <div className="text-xs font-extrabold text-gray-500 tracking-widest uppercase">{col.heading}</div>
                            <div className="mt-4 space-y-1">
                              {col.links.map((l) => (
                                <a
                                  key={l.href}
                                  href={l.href}
                                  className="block rounded-xl px-3 py-2.5 text-[15px] font-semibold text-gray-900 hover:bg-gray-50 hover:text-primary"
                                >
                                  {l.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="lg:pl-6 lg:border-l lg:border-gray-100">
                          <div className="text-xs font-extrabold text-gray-500 tracking-widest uppercase">Quick links</div>
                          <div className="mt-4 space-y-1">
                            <a href="/events" className="block rounded-xl px-3 py-2.5 text-[15px] font-semibold text-gray-900 hover:bg-gray-50 hover:text-primary">
                              All event types
                            </a>
                            <a
                              href="/events/custom-website-creation"
                              className="block rounded-xl px-3 py-2.5 text-[15px] font-semibold text-gray-900 hover:bg-gray-50 hover:text-primary"
                            >
                              Custom website creation
                            </a>
                            <a
                              href="/digital-growth-services"
                              className="block rounded-xl px-3 py-2.5 text-[15px] font-semibold text-gray-900 hover:bg-gray-50 hover:text-primary"
                            >
                              Digital Growth Services
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

            <div className="mt-3 rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileSection('features')}
                className="w-full flex items-center justify-between gap-4 px-4 py-3 text-gray-900 font-extrabold"
              >
                <span>Features</span>
                <span className="text-gray-500">{mobileSections.features ? '−' : '+'}</span>
              </button>
              <div className={`px-4 pb-3 transition-all duration-200 ${mobileSections.features ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <a
                  href="/features"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Features
                </a>
                <a
                  href="/digital-growth-services"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Digital Growth Services
                </a>
              </div>

              <div className="border-t border-gray-100" />

              <button
                type="button"
                onClick={() => toggleMobileSection('eventTypes')}
                className="w-full flex items-center justify-between gap-4 px-4 py-3 text-gray-900 font-extrabold"
              >
                <span>Event Types</span>
                <span className="text-gray-500">{mobileSections.eventTypes ? '−' : '+'}</span>
              </button>
              <div className={`px-4 pb-3 transition-all duration-200 ${mobileSections.eventTypes ? 'max-h-[560px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <a href="/events" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  All event types
                </a>
                <div className="mt-2 space-y-1">
                  <a href="/events/valentines" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Valentine's Day
                  </a>
                  <a href="/events/new-years-cards" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    New Year's Cards
                  </a>
                  <a href="/events/baby" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Baby
                  </a>
                  <a href="/events/kids-birthday" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Kids' Birthday
                  </a>
                  <a href="/events/adult-birthday" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Adult Birthday
                  </a>
                  <a href="/events/wedding" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Wedding
                  </a>
                  <a href="/events/business" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Business
                  </a>
                  <a href="/events/parties" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Parties
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <button
                type="button"
                onClick={() => toggleMobileSection('digital')}
                className="w-full flex items-center justify-between gap-4 px-4 py-3 text-gray-900 font-extrabold"
              >
                <span>Digital invitations</span>
                <span className="text-gray-500">{mobileSections.digital ? '−' : '+'}</span>
              </button>
              <div className={`px-4 pb-3 transition-all duration-200 ${mobileSections.digital ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <a href="/invitations/digital" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  Digital invitation templates
                </a>
                <a href="/upload" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  Upload Your Own
                </a>
                <a href="/services/small-business-website" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  Small business website
                </a>
              </div>

              <div className="border-t border-gray-100" />

              <button
                type="button"
                onClick={() => toggleMobileSection('tools')}
                className="w-full flex items-center justify-between gap-4 px-4 py-3 text-gray-900 font-extrabold"
              >
                <span>Tools</span>
                <span className="text-gray-500">{mobileSections.tools ? '−' : '+'}</span>
              </button>
              <div className={`px-4 pb-3 transition-all duration-200 ${mobileSections.tools ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <a href="/gift-finder" className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  Gift Finder
                </a>
              </div>

              <div className="border-t border-gray-100" />

              <a href="/how-it-works" className="block px-4 py-3 text-gray-900 font-extrabold hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="/pricing" className="block px-4 py-3 text-gray-900 font-extrabold hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
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
    </>
  )
}
