import React from 'react'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[200] bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="inline-flex items-center gap-2">
            <img src="/assets/img/digntag_logo 1.png" alt="Digntag logo" className="h-10 w-auto" />
          </a>
        </div>
      </div>
    </header>
  )
}
