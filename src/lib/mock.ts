export type Card = {
  id: string;
  title: string;
  slug: string;
  template: "wedding" | "business" | "creator" | "personal";
  userId?: string;
  theme: {
    primary: string;
    background: string;
    foreground: string;
  };
  sections: Array<{ type: string; data: any }>;
  stats?: {
    views: number;
    clicks: number;
  };
};

export const mockCards: Card[] = [
  {
    id: "1",
    title: "Aarav & Siya Wedding",
    slug: "aarav-siya",
    template: "wedding",
    theme: { primary: "#6C47FF", background: "#ffffff", foreground: "#0a0a0a" },
    sections: [
      { type: "hero", data: { heading: "Aarav & Siya", sub: "Dec 20, 2025 • Jaipur" } },
      { type: "links", data: [{ label: "RSVP", url: "#" }, { label: "Venue", url: "#" }] },
    ],
    stats: { views: 1284, clicks: 342 },
  },
  {
    id: "2",
    title: "Zara Malik — Designer",
    slug: "zara-design",
    template: "creator",
    theme: { primary: "#111827", background: "#ffffff", foreground: "#111827" },
    sections: [
      { type: "hero", data: { heading: "Zara Malik", sub: "Product Designer" } },
      { type: "links", data: [{ label: "Portfolio", url: "#" }, { label: "Contact", url: "#" }] },
    ],
    stats: { views: 622, clicks: 91 },
  },
];
