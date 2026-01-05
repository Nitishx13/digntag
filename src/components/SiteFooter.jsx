import React from 'react'

export default function SiteFooter() {
  const whatsappContactUrl = 'https://wa.me/918882816805?text=I%20want%20to%20know%20more'

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/20 pb-10">
          <div className="lg:col-span-4">
            <div className="tracking-wider">
              <img src="/assets/img/digntag_logo 1.png" alt="Digntag" className="h-10 w-auto" />
            </div>
            <p className="mt-4 text-sm text-white/80 max-w-sm">
              Designing moments, crafted for you. Digital invitations, smart sharing, and RSVP tracking for every
              celebration.
            </p>
            <div className="mt-6">
              <a
                href={whatsappContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-cta text-white font-bold rounded-xl shadow-lg hover:bg-cta/90 transition duration-150"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-lg font-bold mb-4">Explore</h5>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="/services" className="hover:text-cta transition duration-150">
                  Services
                </a>
              </li>
              <li>
                <a href="/digital-growth-services" className="hover:text-cta transition duration-150">
                  Digital Growth Services
                </a>
              </li>
              <li>
                <a href="/gift-finder" className="hover:text-cta transition duration-150">
                  Gift Finder
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="hover:text-cta transition duration-150">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-cta transition duration-150">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-lg font-bold mb-4">Event Types</h5>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="/events/wedding" className="hover:text-cta transition duration-150">
                  Wedding
                </a>
              </li>
              <li>
                <a href="/events/birthday" className="hover:text-cta transition duration-150">
                  Birthday
                </a>
              </li>
              <li>
                <a href="/events/baby" className="hover:text-cta transition duration-150">
                  Baby Events
                </a>
              </li>
              <li>
                <a href="/events/corporate" className="hover:text-cta transition duration-150">
                  Corporate Events
                </a>
              </li>
              <li>
                <a href="/events/valentines" className="hover:text-cta transition duration-150">
                  Valentine's Day
                </a>
              </li>
              <li>
                <a href="/events/custom-website-creation" className="hover:text-cta transition duration-150">
                  Custom website creation
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-lg font-bold mb-4">Support</h5>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a
                  href={whatsappContactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cta transition duration-150"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-cta transition duration-150">
                  Plans
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-lg font-bold mb-4">Connect</h5>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/digntag.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/90 hover:text-cta transition duration-150"
                aria-label="Instagram"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5C19.42 2 22 4.58 22 7.75v8.5C22 19.42 19.42 22 16.25 22h-8.5C4.58 22 2 19.42 2 16.25v-8.5C2 4.58 4.58 2 7.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5z" />
                    <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </span>
                <span className="text-sm font-semibold">Instagram</span>
              </a>

              <a
                href={whatsappContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/90 hover:text-cta transition duration-150"
                aria-label="WhatsApp"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                    <path d="M19.11 17.53c-.28-.14-1.63-.8-1.88-.89-.25-.09-.43-.14-.61.14-.18.28-.7.89-.86 1.08-.16.18-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.43-.48.14-.16.18-.28.28-.46.09-.18.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.46.07-.7.36-.25.28-.93.91-.93 2.22s.95 2.58 1.08 2.76c.14.18 1.87 2.85 4.52 3.99.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.63-.66 1.86-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32z" />
                    <path d="M16.02 3C8.85 3 3.02 8.83 3.02 16c0 2.3.6 4.46 1.64 6.33L3 29l6.86-1.8c1.8.98 3.86 1.54 6.16 1.54 7.17 0 13-5.83 13-13S23.19 3 16.02 3zm0 23.1c-2.09 0-4.03-.6-5.67-1.64l-.41-.25-4.07 1.07 1.09-3.96-.27-.41A10.93 10.93 0 015.09 16c0-6.03 4.9-10.93 10.93-10.93S26.95 9.97 26.95 16 22.05 26.1 16.02 26.1z" />
                  </svg>
                </span>
                <span className="text-sm font-semibold">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <div>
            &copy; <span id="current-year"></span> Digntag. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="/services" className="hover:text-white transition duration-150">
              Services
            </a>
            <a href="/pricing" className="hover:text-white transition duration-150">
              Pricing
            </a>
            <a
              href={whatsappContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-150"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
