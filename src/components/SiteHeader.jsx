import React from 'react'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
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
        
          <a
            href="https://wa.me/918882816805"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition duration-150 font-medium"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <a
            href="https://wa.me/918882816805"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-6 py-2 bg-cta text-white font-bold rounded-full shadow-xl hover:bg-cta/90 transition duration-150"
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  )
}
