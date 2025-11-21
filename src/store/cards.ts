"use client";
import { create } from "zustand";
import { mockCards, type Card } from "@/lib/mock";

type State = {
  cards: Card[];
  getById: (id: string) => Card | undefined;
  getBySlug: (slug: string) => Card | undefined;
  update: (id: string, updater: (c: Card) => Card) => void;
  add: (c: Card) => void;
};

export const useCards = create<State>((set, get) => ({
  cards: mockCards,
  getById: (id) => get().cards.find((c) => c.id === id),
  getBySlug: (slug) => get().cards.find((c) => c.slug === slug),
  update: (id, updater) =>
    set((s) => ({ cards: s.cards.map((c) => (c.id === id ? updater(c) : c)) })),
  add: (c) => set((s) => ({ cards: [c, ...s.cards] })),
}));
