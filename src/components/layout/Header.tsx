import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-zinc-900">
            Digital Tag
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link href="/templates" className="text-sm font-medium text-zinc-700 hover:text-zinc-900">Templates</Link></li>
              <li><Link href="/features" className="text-sm font-medium text-zinc-700 hover:text-zinc-900">Features</Link></li>
              <li><Link href="/pricing" className="text-sm font-medium text-zinc-700 hover:text-zinc-900">Pricing</Link></li>
              <li><Link href="/login" className="text-sm font-medium text-zinc-700 hover:text-zinc-900">Login</Link></li>
              <li><Link href="/signup" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Store</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
