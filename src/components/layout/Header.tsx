import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-[#CD5E77]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="logo-link">
            <span className="sr-only">Digntag</span>
            <div className="logo-mark" aria-hidden="true" />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link href="/templates" className="text-sm font-medium text-[#1f1f1f] hover:text-[#CD5E77]">Templates</Link></li>
              <li><Link href="/features" className="text-sm font-medium text-[#1f1f1f] hover:text-[#CD5E77]">Features</Link></li>
              <li><Link href="/pricing" className="text-sm font-medium text-[#1f1f1f] hover:text-[#CD5E77]">Pricing</Link></li>
              <li><Link href="/login" className="text-sm font-medium text-[#1f1f1f] hover:text-[#CD5E77]">Login</Link></li>
              <li><Link href="/signup" className="rounded-md bg-[#CD5E77] px-4 py-2 text-sm font-medium text-white hover:bg-[#EE959E]">Store</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
