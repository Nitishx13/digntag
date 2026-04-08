import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SiteHeaderSimple() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <>
      <header className="sticky top-0 z-[200] bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src="/assets/img/digntag_logo 1.png" alt="Digntag logo" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              
              <a 
                href="#features" 
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/#features') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                Features
              </a>
              
              <a 
                href="#tools" 
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/#tools') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                Tools
              </a>
              
              <a 
                href="#gift" 
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/#gift') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                Gift
              </a>
              
              <a 
                href="#blog" 
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/#blog') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                Blog
              </a>
              
              <a 
                href="#faq" 
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/#faq') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                FAQ
              </a>

              {/* Instagram Contact */}
              <a
                href="https://www.instagram.com/digntag"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
                <span className="hidden lg:inline">Instagram</span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m0 6h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[300] bg-black bg-opacity-50">
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <Link to="/" className="inline-flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/assets/img/digntag_logo 1.png" alt="Digntag logo" className="h-8 w-auto" />
                </Link>
                <button
                  type="button"
                  className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="px-4 py-4 space-y-2">
                <Link 
                  to="/" 
                  className={`block px-4 py-3 rounded-lg font-medium transition ${
                    isActive('/') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                <a 
                  href="#features" 
                  className={`block px-4 py-3 rounded-lg font-medium transition ${
                    isActive('/#features') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                
                <a 
                  href="#tools" 
                  className={`block px-4 py-3 rounded-lg font-medium transition ${
                    isActive('/#tools') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tools
                </a>
                
                <a 
                  href="#gift" 
                  className={`block px-4 py-3 rounded-lg font-medium transition ${
                    isActive('/#gift') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gift
                </a>
                
                <a 
                  href="#blog" 
                  className={`block px-4 py-3 rounded-lg font-medium transition ${
                    isActive('/#blog') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </a>
                
                <a 
                  href="#faq" 
                  className={`block px-4 py-3 rounded-lg font-medium transition ${
                    isActive('/#faq') ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                
                {/* Instagram Contact Mobile */}
                <a
                  href="https://www.instagram.com/digntag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition shadow-md hover:shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
