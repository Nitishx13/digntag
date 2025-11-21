"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCards } from "@/store/cards";

const templates = [
  {
    id: "wedding-classic",
    name: "Wedding Classic",
    category: "wedding",
    description: "Elegant blush tones with RSVP, schedule, venue map, and links.",
    previewClass: "from-[#FFF0F5] to-[#FAF5FF]",
    theme: { primary: "#6C47FF", background: "#ffffff", foreground: "#0a0a0a" },
  },
  {
    id: "business-minimal",
    name: "Business Minimal",
    category: "business",
    description: "Clean typography-forward card for professionals.",
    previewClass: "from-[#F8FAFC] to-[#EEF2FF]",
    theme: { primary: "#111827", background: "#ffffff", foreground: "#111827" },
  },
  {
    id: "creator-bio",
    name: "Creator Bio",
    category: "creator",
    description: "Link-in-bio layout with social and media embeds.",
    previewClass: "from-[#FFF7ED] to-[#FEF3C7]",
    theme: { primary: "#7C3AED", background: "#ffffff", foreground: "#111827" },
  },
  {
    id: "personal-clean",
    name: "Personal Clean",
    category: "personal",
    description: "Simple personal profile with links and about section.",
    previewClass: "from-[#F0FDF4] to-[#ECFEFF]",
    theme: { primary: "#0EA5E9", background: "#ffffff", foreground: "#111827" },
  },
];

export default function ShopPage() {
  const [filter, setFilter] = useState<string>("all");
  const { add } = useCards();
  const router = useRouter();

  const filtered = filter === "all" ? templates : templates.filter((t) => t.category === filter);

  function slugify(input: string) {
    return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }

  function useTemplate(t: typeof templates[number]) {
    const id = crypto.randomUUID();
    const title = `${t.name}`;
    const slug = slugify(`${t.name}-${id.slice(0, 6)}`);
    add({
      id,
      title,
      slug,
      template: t.category as any,
      theme: t.theme,
      sections: [
        { type: "hero", data: { heading: t.name, sub: t.category === "wedding" ? "Our Wedding" : "" } },
        { type: "links", data: [{ label: "Primary", url: "#" }] },
      ],
      stats: { views: 0, clicks: 0 },
    });
    router.push("/dashboard");
  }

  return (
    <main>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Shop cards</h1>
        <p className="text-zinc-600 text-sm mt-1">Browse and select a template to start your card.</p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        {[
          { key: "all", label: "All" },
          { key: "wedding", label: "Wedding" },
          { key: "business", label: "Business" },
          { key: "creator", label: "Creator" },
          { key: "personal", label: "Personal" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-md border px-3 py-1.5 ${
              filter === f.key ? "bg-zinc-900 text-white border-zinc-900" : "hover:bg-zinc-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((t) => (
          <div key={t.id} className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold tracking-tight">{t.name}</h3>
                <p className="text-xs capitalize text-zinc-500">{t.category}</p>
              </div>
              <button
                onClick={() => useTemplate(t)}
                className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-800"
              >
                Use template
              </button>
            </div>
            <p className="mt-2 text-sm text-zinc-600">{t.description}</p>
            <div className={`mt-4 h-28 rounded-md bg-gradient-to-br ${t.previewClass}`} />
          </div>
        ))}
      </div>
    </main>
  );
}
