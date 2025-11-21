"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

interface NavLinkProps {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: Array<{ label: string; href: string }>;
}

const navLinks: NavLinkProps[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#3B1F1F] text-[#FFE0D0] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
              DIGNTAG
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`text-white hover:text-gray-300 transition-colors ${
                    pathname === item.href ? 'font-medium' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#signup"
              className="px-4 py-2 text-sm font-medium text-[#FFE0D0] hover:text-[#F6BCCE] transition-colors"
            >
              Sign Up Free
            </a>
            <a
              href="#getstarted"
              className="px-4 py-2 bg-[#F6BCCE] hover:bg-[#F9CFC3] text-[#3B1F1F] text-sm font-medium rounded-md transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#3B1F1F]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-[#FFE0D0] hover:text-[#F6BCCE] rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-[#F6BCCE]/70">
              <a
                href="#signup"
                className="block w-full text-left px-3 py-2 text-base font-medium text-[#FFE0D0] hover:text-[#F6BCCE] rounded-md mb-2"
              >
                Sign Up Free
              </a>
              <a
                href="#getstarted"
                className="block w-full text-center px-3 py-2 bg-[#F6BCCE] text-[#3B1F1F] font-medium rounded-md hover:bg-[#F9CFC3]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
