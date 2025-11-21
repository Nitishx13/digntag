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
    <footer className="bg-white border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="text-xl font-bold text-zinc-900">Digital Invite</Link>
            <p className="mt-4 text-sm text-zinc-500">
              Beautiful digital invitations for weddings, birthdays, and special events. Create, customize, and share in minutes.
            </p>
            <div className="mt-6 flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-zinc-400 hover:text-zinc-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Product</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.slice(0, 3).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-zinc-600 hover:text-zinc-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Resources</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.slice(3, 6).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-zinc-600 hover:text-zinc-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Legal</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.slice(6).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-zinc-600 hover:text-zinc-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-200 pt-8">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Digital Invite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
