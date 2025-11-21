"use client";
import { create } from "zustand";

export type Creative = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string; // local object URL for now
  createdAt: number;
  stats: {
    views: number;
    clicks: number;
    timeline: Array<{ t: number; views: number; clicks: number }>;
  };
};

type State = {
  creatives: Creative[];
  addCreative: (c: Omit<Creative, "id" | "createdAt" | "stats">) => void;
  incrementView: (id: string) => void;
  incrementClick: (id: string) => void;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const useCreatives = create<State>((set) => ({
  creatives: [],
  addCreative: ({ title, slug, imageUrl }) =>
    set((s) => {
      const id = crypto.randomUUID();
      const now = Date.now();
      const safeSlug = slug || slugify(title || id);
      const base = {
        id,
        title: title || "Untitled creative",
        slug: safeSlug,
        imageUrl,
        createdAt: now,
        stats: { views: 0, clicks: 0, timeline: [] },
      } satisfies Creative;
      return { creatives: [base, ...s.creatives] };
    }),
  incrementView: (id) =>
    set((s) => ({
      creatives: s.creatives.map((c) =>
        c.id === id
          ? {
              ...c,
              stats: {
                views: c.stats.views + 1,
                clicks: c.stats.clicks,
                timeline: [
                  ...c.stats.timeline,
                  { t: Date.now(), views: c.stats.views + 1, clicks: c.stats.clicks },
                ],
              },
            }
          : c
      ),
    })),
  incrementClick: (id) =>
    set((s) => ({
      creatives: s.creatives.map((c) =>
        c.id === id
          ? {
              ...c,
              stats: {
                views: c.stats.views,
                clicks: c.stats.clicks + 1,
                timeline: [
                  ...c.stats.timeline,
                  { t: Date.now(), views: c.stats.views, clicks: c.stats.clicks + 1 },
                ],
              },
            }
          : c
      ),
    })),
}));
