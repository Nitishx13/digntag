"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: LayoutGrid },
  { href: "/services", label: "Services", icon: LayoutGrid },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            Digital Tag
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors hover:bg-zinc-100 ${active ? "bg-zinc-900 text-white hover:bg-zinc-900" : "text-zinc-700"}`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
