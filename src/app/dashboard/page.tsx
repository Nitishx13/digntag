"use client";
import { useState } from "react";

type UniversalCategory = "all" | "wedding" | "business" | "creator" | "personal";

const universalFormConfig: Record<UniversalCategory, {
  title: string;
  subtitle: string;
  checklist: string[];
  accent: string;
  fields: { label: string; placeholder: string; type?: "text" | "textarea" | "date" | "number" }[];
}> = {
  all: {
    title: "Universal project brief",
    subtitle: "Capture essentials for weddings, launches, creators, or personal events in one place.",
    accent: "#FF6B92",
    checklist: ["Primary contact details", "Event timeline", "Deliverables & links"],
    fields: [
      { label: "Project / Event name", placeholder: "Eg. Aarav & Siya Wedding" },
      { label: "Primary contact email", placeholder: "name@brand.com" },
      { label: "Key goals", placeholder: "Describe success metrics", type: "textarea" },
    ],
  },
  wedding: {
    title: "Wedding invitation brief",
    subtitle: "Guests, rituals, and hospitality details in a single submission.",
    accent: "#DD4477",
    checklist: ["Couple story", "Ceremony schedule", "Accommodation"],
    fields: [
      { label: "Couple names", placeholder: "Aarav & Siya" },
      { label: "Wedding date", placeholder: "2026-02-11", type: "date" },
      { label: "Venue & rituals", placeholder: "List venues, pheras, sangeet", type: "textarea" },
    ],
  },
  business: {
    title: "Business profile brief",
    subtitle: "Share the elevator pitch and assets for your brand card.",
    accent: "#3B82F6",
    checklist: ["USP & tagline", "Offerings", "Call-to-action"],
    fields: [
      { label: "Company / Studio name", placeholder: "Rise Studio" },
      { label: "Website or portfolio", placeholder: "https://" },
      { label: "Services overview", placeholder: "What do you offer?", type: "textarea" },
    ],
  },
  creator: {
    title: "Creator media brief",
    subtitle: "Map your socials, content pillars, and collaborations.",
    accent: "#8B5CF6",
    checklist: ["Primary platform", "Audience bio", "Featured collaborations"],
    fields: [
      { label: "Creator handle", placeholder: "@designwithzara" },
      { label: "Primary platform", placeholder: "Instagram / YouTube / Behance" },
      { label: "Collab brief", placeholder: "Share preferred brand categories", type: "textarea" },
    ],
  },
  personal: {
    title: "Personal card brief",
    subtitle: "Collect hobbies, links, and introductions for a personal profile.",
    accent: "#0EA5E9",
    checklist: ["Intro paragraph", "Hobbies", "Important links"],
    fields: [
      { label: "Full name", placeholder: "Harini Gupta" },
      { label: "Preferred greeting", placeholder: "Eg. Designer · Traveller" },
      { label: "About you", placeholder: "Share a short bio", type: "textarea" },
    ],
  },
};

const formCategories: { key: UniversalCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "wedding", label: "Wedding" },
  { key: "business", label: "Business" },
  { key: "creator", label: "Creator" },
  { key: "personal", label: "Personal" },
];

const payments = [
  { label: "Wedding Classic", amount: "₹4,999", date: "Oct 30, 2025", status: "Paid" },
  { label: "Business Minimal", amount: "₹2,199", date: "Oct 12, 2025", status: "Paid" },
];

export default function DashboardPage() {
  const [formCategory, setFormCategory] = useState<UniversalCategory>("all");

  return (
    <main className="bg-[#fff7f2] min-h-screen py-12">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <header className="flex flex-col gap-4 rounded-3xl border border-[#F6BCCE]/60 bg-white/90 p-6 shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Dashboard</p>
            <h1 className="text-3xl font-bold text-[#3B1F1F]">Your creative HQ</h1>
            <p className="mt-2 text-sm text-[#3B1F1F]/70">See templates, creations, purchases, and payments all in one place.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-full border border-[#3B1F1F]/40 px-4 py-2 text-sm font-semibold text-[#3B1F1F] hover:border-[#3B1F1F]">
              Download
            </button>
            <button className="rounded-full border border-[#3B1F1F]/40 px-4 py-2 text-sm font-semibold text-[#3B1F1F] hover:border-[#3B1F1F]">
              Orders
            </button>
            <button className="rounded-full border border-[#3B1F1F]/40 px-4 py-2 text-sm font-semibold text-[#3B1F1F] hover:border-[#3B1F1F]">
              Live tracking
            </button>
            <button className="rounded-full border border-[#3B1F1F] px-4 py-2 text-sm font-semibold text-[#3B1F1F]">Help</button>
            <button className="rounded-full bg-[#3B1F1F] px-4 py-2 text-sm font-semibold text-[#FFE0D0]">Logout</button>
          </div>
        </header>

        <section className="rounded-3xl border border-[#FFE0D0] bg-white p-6 shadow-lg">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                {formCategories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setFormCategory(category.key)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      formCategory === category.key
                        ? "border-[#3B1F1F] bg-[#3B1F1F] text-[#FFE0D0]"
                        : "border-[#F6BCCE] text-[#3B1F1F] hover:border-[#3B1F1F] hover:bg-[#FFF4EE]"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.4em] text-[#F6BCCE]">Universal form</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#3B1F1F]">{universalFormConfig[formCategory].title}</h2>
                <p className="mt-2 text-sm text-[#3B1F1F]/70">{universalFormConfig[formCategory].subtitle}</p>
              </div>
              <form className="mt-6 space-y-4">
                {universalFormConfig[formCategory].fields.map((field) => (
                  <div key={field.label}>
                    <label className="text-sm font-medium text-[#3B1F1F]">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        placeholder={field.placeholder}
                        className="mt-2 w-full rounded-2xl border border-[#F6BCCE] px-5 py-3 text-sm text-[#3B1F1F] placeholder:text-[#C8A8A8] focus:border-[#FF6B92] focus:outline-none"
                        rows={4}
                      />
                    ) : (
                      <input
                        type={field.type ?? "text"}
                        placeholder={field.placeholder}
                        className="mt-2 w-full rounded-full border border-[#F6BCCE] px-5 py-3 text-sm text-[#3B1F1F] placeholder:text-[#C8A8A8] focus:border-[#FF6B92] focus:outline-none"
                      />
                    )}
                  </div>
                ))}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    className="rounded-full border border-[#FF8FB1] px-6 py-2 text-sm font-semibold text-[#FF6B92]"
                  >
                    Save draft
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-gradient-to-r from-[#FF8FB1] to-[#FF6B92] px-8 py-2 text-sm font-semibold text-white shadow-lg"
                  >
                    Share brief →
                  </button>
                </div>
              </form>
            </div>
            <div className="rounded-3xl border border-[#FFE0D0] bg-[#FFF7F3] p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">Checklist</p>
              <h3 className="mt-2 text-xl font-semibold text-[#3B1F1F]">What we’ll organise</h3>
              <ul className="mt-6 space-y-3 text-sm text-[#3B1F1F]/80">
                {universalFormConfig[formCategory].checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold"
                      style={{ backgroundColor: `${universalFormConfig[formCategory].accent}15`, color: universalFormConfig[formCategory].accent }}
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-dashed border-[#F6BCCE] bg-white/80 p-4 text-sm text-[#3B1F1F]/80">
                <p className="font-semibold" style={{ color: universalFormConfig[formCategory].accent }}>
                  Tip
                </p>
                <p className="mt-2">
                  Switch categories to auto-adjust the questions. Each brief is optimised for {formCategory} needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </main>
  );
}
