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

  const filters = [
    { key: "all", label: "All" },
    { key: "wedding", label: "Wedding" },
    { key: "business", label: "Business" },
    { key: "creator", label: "Creator" },
    { key: "personal", label: "Personal" },
  ];

  return (
    <main className="bg-[#FFE0D0] py-12">
      <section className="mx-auto max-w-6xl rounded-3xl border border-[#F6BCCE]/60 bg-white/80 p-10 shadow-xl backdrop-blur">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[#3B1F1F]/60">Shop</p>
          <h1 className="mt-4 text-4xl font-bold text-[#3B1F1F]">Curated card templates</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[#3B1F1F]/70">
            Pick a layout, customize the colors, and publish your digital ID in minutes.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filter === f.key
                  ? "border-[#3B1F1F] bg-[#3B1F1F] text-[#FFE0D0]"
                  : "border-[#F6BCCE] text-[#3B1F1F] hover:border-[#3B1F1F] hover:bg-[#F9CFC3]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((t) => (
            <article
              key={t.id}
              className="flex h-full flex-col justify-between rounded-3xl border border-[#FFE0D0] bg-white p-6 shadow-lg transition hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#3B1F1F]">{t.name}</h3>
                    <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">{t.category}</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFE0D0] text-sm font-bold text-[#3B1F1F]">
                    {t.category.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[#3B1F1F]/70">{t.description}</p>
              </div>
              <div className="mt-6 rounded-2xl border border-[#F6BCCE] bg-gradient-to-br from-[#F6EBCC] to-[#FFF0F5] p-4">
                <div className={`h-24 w-full rounded-md bg-gradient-to-br ${t.previewClass}`} />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => useTemplate(t)}
                  className="rounded-full bg-[#3B1F1F] px-4 py-2 text-sm font-semibold text-[#FFE0D0] shadow-lg transition hover:bg-[#4A1D1D]"
                >
                  Use template
                </button>
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#F6BCCE]">Instant</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
