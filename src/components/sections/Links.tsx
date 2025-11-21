"use client";
import React from "react";

type LinkItem = { label: string; url: string };
export function LinksSection({ items }: { items: LinkItem[] }) {
  return (
    <section className="w-full rounded-xl border bg-white p-4 md:p-5">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((it, i) => (
          <a
            key={`${it.label}-${i}`}
            href={it.url}
            className="rounded-md border px-4 py-2 text-sm hover:bg-zinc-50"
          >
            {it.label}
          </a>
        ))}
      </div>
    </section>
  );
}
