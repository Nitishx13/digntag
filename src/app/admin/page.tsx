"use client";
import Link from "next/link";
import { useState } from "react";
import { useUsers } from "@/store/users";
import { useCards } from "@/store/cards";

const mockTemplates = [
  { id: "t1", name: "Wedding Classic", category: "wedding" },
  { id: "t2", name: "Business Minimal", category: "business" },
  { id: "t3", name: "Creator Bio", category: "creator" },
  { id: "t4", name: "Personal Clean", category: "personal" },
];

export default function AdminPage() {
  const { users, addUser } = useUsers();
  const { add } = useCards();

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
    <main>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
          <p className="text-zinc-600 text-sm mt-1">Manage users and templates (design-only).</p>
        </div>
        <button className="rounded-md bg-zinc-900 px-3 py-1.5 text-white text-sm hover:bg-zinc-800">
          New Template
        </button>
      </div>

      {/* Users management */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 md:col-span-1">
          <h2 className="text-base font-semibold tracking-tight">Add user</h2>
          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Aarav"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com"
              />
            </div>
            <button
              className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-800"
              onClick={handleCreateUser}
            >
              Create user
            </button>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 md:col-span-2">
          <h2 className="text-base font-semibold tracking-tight">Users</h2>
          <div className="mt-3 divide-y">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-zinc-600">{u.email}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50"
                    onClick={() => handleCreateCardForUser(u)}
                  >
                    Create card for user
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-8">
        {mockTemplates.map((t) => (
          <div key={t.id} className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold tracking-tight">{t.name}</h3>
                <p className="text-xs text-zinc-500 mt-0.5 capitalize">{t.category}</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50">Edit</button>
                <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50">Duplicate</button>
              </div>
            </div>
            <div className="mt-4 text-sm text-zinc-600">
              <p>Schema: sections for hero, links, gallery (mock)</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-zinc-600">
        <p>
          Note: This is a design-only admin view. Hook these controls to your API in the
          future.
        </p>
      </div>
      <div className="mt-6">
        <Link href="/" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50">
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
