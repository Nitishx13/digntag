"use client";
import Link from "next/link";
import { useCreatives, type Creative } from "@/store/creatives";
import { QrCode, Share2, Eye, MousePointer } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

export function CreativeTile({ c }: { c: Creative }) {
  const { incrementView, incrementClick } = useCreatives();

  const data = c.stats.timeline.length
    ? c.stats.timeline.map((d) => ({ name: new Date(d.t).toLocaleTimeString(), views: d.views, clicks: d.clicks }))
    : [
        { name: "", views: c.stats.views, clicks: c.stats.clicks },
        { name: "now", views: c.stats.views, clicks: c.stats.clicks },
      ];

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${c.slug || "aarav-siya"}`;

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-start gap-4">
        <div className="w-28 shrink-0 overflow-hidden rounded-md border bg-zinc-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.imageUrl} alt={c.title} className="h-20 w-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold tracking-tight">{c.title}</h3>
              <p className="text-xs text-zinc-500">/{c.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs hover:bg-zinc-50"
                onClick={() => incrementView(c.id)}
                title="Simulate view"
              >
                <Eye size={14} /> View
              </button>
              <button
                className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs hover:bg-zinc-50"
                onClick={() => incrementClick(c.id)}
                title="Simulate click"
              >
                <MousePointer size={14} /> Click
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 items-center gap-3 md:grid-cols-5">
            <div className="md:col-span-3">
              <div className="h-16 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                    <Tooltip cursor={{ stroke: "#e5e7eb" }} contentStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="views" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="clicks" stroke="#22c55e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-zinc-600">
                <span>{c.stats.views} views</span>
                <span>•</span>
                <span>{c.stats.clicks} clicks</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="grid h-16 w-16 place-items-center rounded-md border text-zinc-600">
                  <QrCode size={28} />
                </div>
                <div className="text-xs">
                  <div className="font-medium">Share link</div>
                  <div className="truncate text-zinc-600" title={shareUrl}>{shareUrl}</div>
                  <div className="mt-1">
                    <button
                      className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs text-white hover:bg-zinc-800"
                      onClick={() => navigator.clipboard?.writeText(shareUrl)}
                    >
                      <Share2 size={14} /> Copy link
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-zinc-500">QR is a placeholder in design-only mode.</div>
            </div>
          </div>

          <div className="mt-3">
            <Link href={`/p/${c.slug || "aarav-siya"}`} className="text-xs text-zinc-700 underline underline-offset-4">
              View public card →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
