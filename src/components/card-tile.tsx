"use client";
import Link from "next/link";
import { type Card } from "@/lib/mock";

export function CardTile({ card }: { card: Card }) {
  const mediaSection = card.sections.find((s) => s.type === "media");
  const media = mediaSection?.data;
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
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
        <span>{card.template}</span>
        {mediaSection ? (
          <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[120px]">
            {mediaSection.data.label ?? mediaSection.data.type}
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-zinc-600">
        <span>{card.stats?.views ?? 0} views</span>
        <span>•</span>
        <span>{card.stats?.clicks ?? 0} clicks</span>
      </div>
      {media ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-dashed border-[#EFEFEF] bg-zinc-50">
          {media.type === "video" ? (
            <video
              className="h-32 w-full object-cover"
              src={media.src}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
            />
          ) : media.type === "image" ? (
            <img src={media.src} alt={media.label ?? "media preview"} className="h-32 w-full object-cover" />
          ) : (
            <div className="px-3 py-2 text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">
              {media.label ?? media.type}
            </div>
          )}
        </div>
      ) : null}
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
