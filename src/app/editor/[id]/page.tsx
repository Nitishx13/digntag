"use client";
import { useParams, useRouter } from "next/navigation";
import { useCards } from "@/store/cards";
import { Hero } from "@/components/sections/Hero";
import { LinksSection } from "@/components/sections/Links";
import { useState } from "react";

export default function EditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, update } = useCards();
  const card = getById(params.id);

  const [title, setTitle] = useState(card?.title ?? "");
  const [primary, setPrimary] = useState(card?.theme.primary ?? "#6C47FF");

  if (!card) {
    return (
      <main>
        <h1 className="text-xl font-semibold">Card not found</h1>
        <button
          className="mt-4 rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50"
          onClick={() => router.push("/")}
        >
          Back to Dashboard
        </button>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 gap-6 md:grid-cols-5">
      <section className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Editor</h1>

        <div className="rounded-xl border bg-white p-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="rounded-xl border bg-white p-4">
          <label className="block text-sm font-medium">Primary color</label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="color"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              aria-label="Primary color"
            />
            <input
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="rounded-md bg-zinc-900 px-3 py-1.5 text-white text-sm hover:bg-zinc-800"
            onClick={() =>
              update(card.id, (c) => ({
                ...c,
                title: title || c.title,
                theme: { ...c.theme, primary },
              }))
            }
          >
            Save changes (mock)
          </button>
          <button
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50"
            onClick={() => router.push(`/p/${card.slug}`)}
          >
            Preview
          </button>
        </div>
      </section>

      <section className="md:col-span-3 space-y-4">
        <h2 className="text-sm font-medium text-zinc-600">Preview</h2>
        <div className="rounded-xl border bg-zinc-50 p-4">
          {card.sections.map((s, i) => {
            if (s.type === "hero") {
              return (
                <Hero
                  key={i}
                  heading={s.data.heading}
                  sub={s.data.sub}
                  accent={primary}
                />
              );
            }
            if (s.type === "links") {
              return <LinksSection key={i} items={s.data} />;
            }
            return null;
          })}
        </div>
      </section>
    </main>
  );
}
