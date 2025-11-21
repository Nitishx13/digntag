"use client";
import Link from "next/link";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useUsers } from "@/store/users";
import { useCards } from "@/store/cards";

export default function AdminPage() {
  const { users, addUser } = useUsers();
  const { add } = useCards();
  const stats = [
    { label: "Active users", value: "328", delta: "+18 this week" },
    { label: "Templates sold", value: "84", delta: "+6" },
    { label: "Avg. completion", value: "92%", delta: "On time" },
  ];

  const mockTemplates = [
    { id: "t1", name: "Wedding Classic", category: "wedding" },
    { id: "t2", name: "Business Minimal", category: "business" },
    { id: "t3", name: "Creator Bio", category: "creator" },
    { id: "t4", name: "Personal Clean", category: "personal" },
  ];

  const shopShowcase = [
    {
      id: "shop-wedding",
      name: "Wedding Classic",
      description: "Blush + gold layout with RSVP and venue details.",
      media: "/reel1.mp4",
    },
    {
      id: "shop-business",
      name: "Business Minimal",
      description: "Podcast-ready profile with CTA buttons.",
      media: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    },
  ];

  type TemplateItem = (typeof mockTemplates)[number];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function slugify(input: string) {
    return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }

  function handleCreateUser() {
    if (!name || !email) return;
    addUser({ name, email, role: "user" });
    setName("");
    setEmail("");
  }

  function handleCreateCardForUser(u: { id: string; name: string }) {
    const id = crypto.randomUUID();
    const baseSlug = slugify(`${u.name}-wedding`);
    add({
      id,
      userId: u.id,
      title: `${u.name} — Wedding Card`,
      slug: baseSlug,
      template: "wedding",
      theme: { primary: "#6C47FF", background: "#ffffff", foreground: "#0a0a0a" },
      sections: [
        { type: "hero", data: { heading: u.name, sub: "Our Wedding" } },
        { type: "links", data: [{ label: "RSVP", url: "#" }, { label: "Venue", url: "#" }] },
      ],
      stats: { views: 0, clicks: 0 },
    });
  }

  return (
    <main className="space-y-8 px-4 py-12 md:px-8">
      <div className="rounded-3xl border border-[#F6BCCE]/60 bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">Admin Console</p>
            <h1 className="text-3xl font-bold text-[#3B1F1F]">ShadCN-inspired cockpit</h1>
            <p className="text-sm text-[#3B1F1F]/70">Monitor users, templates, and ID approvals at a glance.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full border border-[#F6BCCE] px-4 py-2 text-sm font-semibold text-[#3B1F1F]">
              View logs
            </button>
            <button className="rounded-full bg-[#3B1F1F] px-4 py-2 text-sm font-semibold text-[#FFE0D0]">
              Invite admin
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#F6BCCE]/60 bg-gradient-to-br from-[#FFE8E2] to-[#FFFFFF] p-4 shadow">
              <p className="text-xs uppercase tracking-[0.3em] text-[#3B1F1F]/60">{stat.label}</p>
              <p className="text-2xl font-bold text-[#3B1F1F]">{stat.value}</p>
              <p className="text-xs text-[#3B1F1F]/70">{stat.delta}</p>
            </div>
          ))}
        </div>
        <Tabs.Root defaultValue="users" className="mt-6">
          <Tabs.List className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.4em]">
            {[
              { label: "Users", value: "users" },
              { label: "Templates", value: "templates" },
              { label: "Metrics", value: "metrics" },
              { label: "ID Pass", value: "id-pass" },
            ].map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="rounded-full border border-[#F6BCCE] px-4 py-1 hover:border-[#3B1F1F]"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-[#FFE0D0] bg-white p-6 shadow-lg">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#3B1F1F]">User management</h2>
              <div className="inline-flex gap-2 rounded-full border border-[#F6BCCE] px-4 py-1 text-xs uppercase tracking-[0.3em] text-[#3B1F1F]">
                {users.length} active
              </div>
            </header>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#3B1F1F]/60">Add user</p>
                <div className="mt-2 space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full rounded-2xl border border-[#F6BCCE] px-3 py-2 text-sm focus:border-[#3B1F1F] focus:outline-none"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    className="w-full rounded-2xl border border-[#F6BCCE] px-3 py-2 text-sm focus:border-[#3B1F1F] focus:outline-none"
                  />
                  <button
                    onClick={handleCreateUser}
                    className="w-full rounded-2xl bg-gradient-to-r from-[#F6BCCE] to-[#F9CFC3] px-3 py-2 text-sm font-semibold text-[#3B1F1F]"
                  >
                    Add user
                  </button>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#3B1F1F]/60">Active users</p>
                <div className="mt-3 rounded-2xl border border-[#F6BCCE] bg-[#fff5ef] p-4">
                  {users.length === 0 ? (
                    <p className="text-sm text-[#3B1F1F]/70">No users yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {users.map((u) => (
                        <div key={u.id} className="flex items-center justify-between rounded-2xl bg-white p-3">
                          <div>
                            <p className="font-semibold text-[#3B1F1F]">{u.name}</p>
                            <p className="text-xs text-[#3B1F1F]/70">{u.email}</p>
                          </div>
                          <button
                            onClick={() => handleCreateCardForUser(u)}
                            className="rounded-full border border-[#F6BCCE] px-3 py-1 text-xs uppercase tracking-[0.3em]"
                          >
                            Issue card
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#F6BCCE] bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#3B1F1F]">Shop templates</h2>
                <p className="text-sm text-[#3B1F1F]/70">Highlight a few ready-to-go looks for guests.</p>
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#F6BCCE]">Live</span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {shopShowcase.map((template) => (
                <div key={template.id} className="flex flex-col gap-3 rounded-2xl border border-[#FFE0D0] bg-[#fff8f5] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-[#3B1F1F]">{template.name}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#F6BCCE]">Shop</span>
                  </div>
                  <p className="text-sm text-[#3B1F1F]/70">{template.description}</p>
                  <div className="h-36 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#F6BCCE] to-[#FFF0F5]">
                    {template.media.endsWith(".mp4") ? (
                      <video
                        className="h-full w-full object-cover"
                        src={template.media}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={false}
                      />
                    ) : (
                      <img src={template.media} alt={template.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <button className="rounded-full border border-[#3B1F1F] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]">Feature</button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#F6BCCE] bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#3B1F1F]">Template operations</h2>
            <p className="mt-2 text-sm text-[#3B1F1F]/70">Preview, edit, or duplicate prebuilt templates for rapid launch.</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {mockTemplates.map((template) => (
                <div key={template.id} className="flex flex-col gap-2 rounded-2xl border border-[#FFE0D0] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#3B1F1F]">{template.name}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#3B1F1F]/70">{template.category}</p>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full border border-[#F6BCCE] px-3 py-0.5 text-xs uppercase tracking-[0.3em]">
                      template
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button className="rounded-full border px-3 py-1 hover:border-[#3B1F1F]">Preview</button>
                    <button className="rounded-full border px-3 py-1 hover:border-[#3B1F1F]">Edit</button>
                    <button className="rounded-full border px-3 py-1 hover:border-[#3B1F1F]">Duplicate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-[#FFE0D0] bg-[#fff5ef] p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#3B1F1F]">Dummy ID pass</h3>
            <div className="mt-4 rounded-2xl bg-white p-4 shadow-inner">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#3B1F1F]">Aarav & Siya</p>
                <span className="text-xs uppercase tracking-[0.3em] text-[#F6BCCE]">Wedding</span>
              </div>
              <p className="text-xs text-[#3B1F1F]/70">Template: Wedding Classic</p>
              <p className="mt-2 text-xs text-[#3B1F1F]/60">Valid: 31 Dec 2025</p>
              <div className="mt-4 h-24 rounded-2xl bg-gradient-to-br from-[#F6BCCE] to-[#F9CFC3]" />
            </div>
            <button className="mt-4 w-full rounded-2xl border border-dashed border-[#3B1F1F] px-3 py-2 text-sm font-semibold uppercase tracking-[0.3em]">
              Export pass
            </button>
          </div>

          <div className="rounded-3xl border border-dashed border-[#F6BCCE] bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-[#3B1F1F]">Quick metrics</h3>
            <div className="mt-4 space-y-3 text-sm text-[#3B1F1F]/70">
              <div className="flex justify-between"><span>Pending approvals</span><span>4</span></div>
              <div className="flex justify-between"><span>Upcoming launches</span><span>3</span></div>
              <div className="flex justify-between"><span>Revenue this month</span><span>₹1.2L</span></div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
