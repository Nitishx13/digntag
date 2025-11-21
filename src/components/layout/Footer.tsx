import Link from 'next/link';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Templates', href: '/templates' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#3B1F1F] text-[#FFE0D0]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-wider text-white">DIGNTAG</Link>
            <p className="mt-4 text-sm text-[#F9CFC3]">
              Digitally reinvent every interaction through beautiful ID cards, profiles, and networking experiences.
            </p>
            <div className="mt-6 flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-[#F6BCCE] hover:text-white" aria-label={item.name}>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.slice(0, 3).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[#F9CFC3] hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.slice(3, 6).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[#F9CFC3] hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.slice(6).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[#F9CFC3] hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[#F6BCCE]/60 pt-8 text-[#F6BCCE]">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Digntag. Crafted with love and pastel palettes.
          </p>
        </div>
      </div>
    </footer>
  );
}
