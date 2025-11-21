"use client";
import { useCards } from "@/store/cards";
import { CardTile } from "@/components/card-tile";
import { useRouter } from "next/navigation";

const shopTemplates = [
  {
    id: "wedding-classic",
    name: "Wedding Classic",
    category: "Wedding",
    description: "Elegant blush tones with RSVP, schedule, venue map, and links.",
    media: { type: "video", src: "/reel1.mp4", label: "Wedding reel" },
  },
  {
    id: "business-minimal",
    name: "Business Minimal",
    category: "Business",
    description: "Clean typographic layout for founders and freelancers.",
    media: { type: "image", src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80", label: "Business preview" },
  },
  {
    id: "creator-bio",
    name: "Creator Bio",
    category: "Creator",
    description: "Bold profile and social callouts for creators and artists.",
    media: { type: "image", src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80", label: "Creator preview" },
  },
];

const purchasedTemplates = [
  { title: "Lakshmi & Arjun", status: "Delivered", date: "Dec 2, 2025" },
  { title: "Rise Studio", status: "In design", date: "Nov 28, 2025" },
];

const payments = [
  { label: "Wedding Classic", amount: "₹4,999", date: "Oct 30, 2025", status: "Paid" },
  { label: "Business Minimal", amount: "₹2,199", date: "Oct 12, 2025", status: "Paid" },
];

export default function DashboardPage() {
  const { cards, add } = useCards();
  const router = useRouter();

  function slugify(input: string) {
    return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }

  function handleSelectTemplate(template: typeof shopTemplates[number]) {
    const id = crypto.randomUUID();
    const title = template.name;
    const slug = slugify(`${template.name}-${id.slice(0, 6)}`);
    add({
      id,
      title,
      slug,
      template: template.category.toLowerCase() as any,
      theme: { primary: "#3B1F1F", background: "#fff", foreground: "#111" },
      sections: [
        { type: "hero", data: { heading: template.name, sub: template.category } },
        { type: "media", data: template.media },
        { type: "links", data: [{ label: "View template", url: "#" }] },
      ],
      stats: { views: 0, clicks: 0 },
    });
    router.push("/dashboard");
  }

  return (
    <main className="bg-[#fff7f2] min-h-screen py-12">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <header className="flex flex-col gap-4 rounded-3xl border border-[#F6BCCE]/60 bg-white/90 p-6 shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Dashboard</p>
            <h1 className="text-3xl font-bold text-[#3B1F1F]">Your creative HQ</h1>
            <p className="mt-2 text-sm text-[#3B1F1F]/70">See templates, creations, purchases, and payments all in one place.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-[#3B1F1F] px-4 py-2 text-sm font-semibold text-[#3B1F1F]">Help</button>
            <button className="rounded-full bg-[#3B1F1F] px-4 py-2 text-sm font-semibold text-[#FFE0D0]">Logout</button>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#3B1F1F]">Shop templates</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-[#F6BCCE]">Live</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {shopTemplates.map((template) => (
              <article key={template.id} className="flex flex-col gap-3 rounded-2xl border border-[#FFE0D0] bg-white p-4 shadow">
                <div className="text-sm text-[#3B1F1F]/80">{template.category}</div>
                <h3 className="text-lg font-semibold text-[#3B1F1F]">{template.name}</h3>
                <p className="text-sm text-[#3B1F1F]/70">{template.description}</p>
                <div className="rounded-xl border border-dashed border-[#F6BCCE] bg-[#FFF0F5] p-1">
                  {template.media.type === "video" ? (
                    <video
                      className="h-32 w-full rounded-xl object-cover"
                      src={template.media.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls={false}
                    />
                  ) : (
                    <img
                      src={template.media.src}
                      alt={template.media.label}
                      className="h-32 w-full rounded-xl object-cover"
                    />
                  )}
                </div>
                <button
                  onClick={() => handleSelectTemplate(template)}
                  className="mt-2 rounded-full bg-gradient-to-r from-[#F6BCCE] to-[#F9CFC3] px-4 py-2 text-sm font-semibold text-[#3B1F1F] shadow-inner"
                >
                  I want this
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <article className="rounded-3xl border border-[#FFE0D0] bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#3B1F1F]">My templates</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-[#F6BCCE]">Saved</span>
            </div>
            <div className="mt-4 space-y-4">
              {cards.map((card) => (
                <CardTile key={card.id} card={card} />
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-[#F6BCCE] bg-[#ffece5] p-6 shadow-lg space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#3B1F1F]">Purchased templates</h3>
              <p className="text-sm text-[#3B1F1F]/70">Recent orders you’ve requested.</p>
            </div>
            <div className="space-y-3">
              {purchasedTemplates.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#F6BCCE] bg-white/90 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#3B1F1F]">{item.title}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#F6BCCE]">{item.status}</span>
                  </div>
                  <p className="text-xs text-[#3B1F1F]/70">{item.date}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#3B1F1F]">Payment details</h3>
              <div className="mt-3 space-y-3 text-sm text-[#3B1F1F]/70">
                {payments.map((payment) => (
                  <div key={payment.label} className="flex items-center justify-between text-[#3B1F1F]">
                    <span>{payment.label}</span>
                    <span className="font-semibold">{payment.amount}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#F6BCCE]">{payment.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
