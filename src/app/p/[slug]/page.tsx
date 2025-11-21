"use client";
import { useParams, useRouter } from "next/navigation";
import { useCards } from "@/store/cards";
import { Hero } from "@/components/sections/Hero";
import { LinksSection } from "@/components/sections/Links";

export default function PublicCardPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { getBySlug } = useCards();
  const card = getBySlug(params.slug);

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
    <main className="space-y-4">
      {card.sections.map((s, i) => {
        if (s.type === "hero") {
          return (
            <Hero key={i} heading={s.data.heading} sub={s.data.sub} accent={card.theme.primary} />
          );
        }
        if (s.type === "links") {
          return <LinksSection key={i} items={s.data} />;
        }
        return null;
      })}
    </main>
  );
}
