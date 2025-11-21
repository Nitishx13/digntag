"use client";
import Link from "next/link";
import { type Card } from "@/lib/mock";

export function CardTile({ card }: { card: Card }) {
  return (
    <div className="group rounded-xl border bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-tight">{card.title}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">/{card.slug}</p>
        </div>
        <div
          className="h-8 w-8 rounded-full border"
          style={{ backgroundColor: card.theme.primary }}
          aria-hidden
        />
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-zinc-600">
        <span>{card.stats?.views ?? 0} views</span>
        <span>•</span>
        <span>{card.stats?.clicks ?? 0} clicks</span>
      </div>
      <div className="mt-5 flex gap-2">
        <Link
          href={`/editor/${card.id}`}
          className="rounded-md bg-zinc-900 px-3 py-1.5 text-white text-sm hover:bg-zinc-800"
        >
          Edit
        </Link>
        <Link
          href={`/p/${card.slug}`}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50"
        >
          View
        </Link>
      </div>
    </div>
  );
}
