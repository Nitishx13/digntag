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
    <footer className="bg-[#ffe6f1] text-[#3b1f1f]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-wider text-[#3b1f1f]">DIGNTAG</Link>
            <p className="mt-4 text-sm text-[#7d3c54]">
              Digitally reinvent every interaction through beautiful ID cards, profiles, and networking experiences.
            </p>
            <div className="mt-6 flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-[#ff6ba0] hover:text-[#3b1f1f]" aria-label={item.name}>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#3b1f1f]">Product</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.slice(0, 3).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[#7d3c54] hover:text-[#3b1f1f]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#3b1f1f]">Resources</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.slice(3, 6).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[#7d3c54] hover:text-[#3b1f1f]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#3b1f1f]">Legal</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.slice(6).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[#7d3c54] hover:text-[#3b1f1f]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[#ffc3d9]/60 pt-8 text-[#7d3c54]">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Digntag. Crafted with love and pastel palettes.
          </p>
        </div>
      </div>
    </footer>
  );
}
