"use client";
import { useCards } from "@/store/cards";
import { CardTile } from "@/components/card-tile";
import { CreativeUpload } from "@/components/creative-upload";
import { useCreatives } from "@/store/creatives";
import { CreativeTile } from "@/components/creative-tile";

export default function DashboardPage() {
  const { cards } = useCards();
  const { creatives } = useCreatives();
  return (
    <main>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-zinc-600 text-sm mt-1">Upload wedding creatives, share links/QR, and track performance (design-only).</p>
      </div>

      {/* Creatives uploader */}
      <CreativeUpload />

      {/* Creatives list */}
      <section className="mt-6">
        <h2 className="text-sm font-medium text-zinc-600">Your creatives</h2>
        <div className="mt-3 grid grid-cols-1 gap-4">
          {creatives.length === 0 ? (
            <div className="rounded-xl border bg-white p-5 text-sm text-zinc-600">
              No creatives yet. Upload your first wedding creative above.
            </div>
          ) : (
            creatives.map((c) => <CreativeTile key={c.id} c={c} />)
          )}
        </div>
      </section>

      {/* Cards quick list (existing) */}
      <section className="mt-8">
        <h2 className="text-sm font-medium text-zinc-600">Your cards</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          {cards.map((c) => (
            <CardTile key={c.id} card={c} />
          ))}
        </div>
      </section>
    </main>
  );
}
