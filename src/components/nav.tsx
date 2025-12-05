"use client";
import Image from "next/image";
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
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Pricing",
    href: "/pricing",
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-[#1f1f1f] border-b border-[#F4C2C2] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/digntag_logo.png" alt="Digntag logo" width={150} height={40} priority />
              <span className="text-xs tracking-[0.4em] text-[#CD5E77]"></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium uppercase tracking-[0.3em] ${
                  pathname === item.href ? 'text-[#CD5E77]' : 'text-[#1f1f1f]'
                } hover:text-[#CD5E77] transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium uppercase tracking-[0.3em] text-[#1f1f1f] hover:text-[#CD5E77]"
            >
              Login
            </a>
            <a
              href="/shop"
              className="rounded-full bg-gradient-to-r from-[#CD5E77] via-[#EE959E] to-[#EBA7AC] px-5 py-2 text-sm font-semibold tracking-[0.3em] uppercase text-white shadow"
            >
              Store
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1f1f1f] hover:text-[#CD5E77] focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#F4C2C2]">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-[#1f1f1f] hover:text-[#CD5E77] uppercase tracking-[0.3em]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#F4C2C2]">
              <a
                href="/login"
                className="block text-sm font-medium uppercase tracking-[0.3em] text-[#1f1f1f] hover:text-[#CD5E77]"
              >
                Login
              </a>
              <a
                href="/shop"
                className="mt-2 inline-flex w-full justify-center rounded-full bg-gradient-to-r from-[#CD5E77] via-[#EE959E] to-[#EBA7AC] px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white"
              >
                Store
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
