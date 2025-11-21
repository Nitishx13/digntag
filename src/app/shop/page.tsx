"use client";
import Link from "next/link";

const featuredInvites = [
  {
    id: "radha-krishna",
    caption: "Digital Radha Krishna Wedding Card — Editable Online Invitation",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "lotus-floral",
    caption: "Lotus Floral Wedding E-Invite — Editable Digital Template",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "modern-minimal",
    caption: "Modern Minimalist Wedding Invitation — Digital Download",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "pink-card",
    caption: "Pink Wedding Invitation Card — Editable Digital Template",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "royal-marigold",
    caption: "Royal Marigold Baraat Invite — Rich Gold Foil Accents",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "emerald-vows",
    caption: "Emerald Vows Video Reel — Boho Garden Theme",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "saffron-sangeet",
    caption: "Saffron Sangeet Invite — Folk Illustrations Included",
    image: "https://images.unsplash.com/photo-1520854223477-739df4b49404?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "pastel-soiree",
    caption: "Pastel Soirée Carousel — Editable Instagram Reel",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "haldi-hues",
    caption: "Haldi Hues Digital Card — Vibrant Turmeric Palette",
    image: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "ivory-vintage",
    caption: "Ivory Vintage E-Invite — Textured Paper Feel",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "sunset-mehendi",
    caption: "Sunset Mehendi Reel — Hand-drawn Henna Motifs",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "pearl-cocktail",
    caption: "Pearl Cocktail Invite — Chic Midnight Palette",
    image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "garden-brunch",
    caption: "Garden Brunch Flyer — Illustration + RSVP QR",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "neon-afterparty",
    caption: "Neon Afterparty Reel — Glow Motion Graphics",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "heritage-vows",
    caption: "Heritage Palace Wedding Card — Mirror Foil Finish",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "floral-engagement",
    caption: "Floral Engagement Invite — Editable Canva Layers",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "blue-turban",
    caption: "Blue Turban Reception Reel — Punjabi Folk Style",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "rose-quartz",
    caption: "Rose Quartz Save-the-Date — Minimal Serif Layout",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "desert-elopement",
    caption: "Desert Elopement Video Template — Cinematic Frames",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "jasmine-fusion",
    caption: "Jasmine Fusion Invite — Indo-Western Typography",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "copper-classic",
    caption: "Copper Classic Reception Card — Texture + Foil",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=60",
  },
];

export default function ShopPage() {
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
      </section>

      <section className="w-full mt-10 px-4 sm:px-8 lg:px-16">
        <div className="rounded-3xl border border-[#FFE0D0] bg-white/90 p-8 shadow-lg space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">Featured invites</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#3B1F1F]">Browse wedding reels like these</h2>
            </div>
            <Link
              href="/"
              className="rounded-full border border-[#3B1F1F] px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#3B1F1F] hover:bg-[#3B1F1F] hover:text-[#FFE0D0]"
            >
              Home feature
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredInvites.map((card) => (
              <article
                key={card.id}
                className="flex flex-col rounded-[32px] border border-[#FFE0D0] bg-gradient-to-b from-[#FFF3EA] via-[#FFE8DC] to-[#FFE0D0] p-4 text-center shadow-[0_20px_40px_rgba(59,31,31,0.15)]"
              >
                <div className="w-full overflow-hidden rounded-[28px] border border-white/60 bg-white/30">
                  <img src={card.image} alt={card.caption} className="h-[320px] w-full object-cover" />
                </div>
                <p className="mt-4 text-[13px] font-medium text-[#3B1F1F]">{card.caption}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        <div className="rounded-3xl border border-[#FFE0D0] bg-white/80 p-10 text-center shadow-lg">
          <p className="text-sm uppercase tracking-[0.4em] text-[#F6BCCE]">Need something custom?</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#3B1F1F]">Tell us what you’d like to see next.</h2>
          <p className="mt-3 text-base text-[#3B1F1F]/70">
            Our team can craft bespoke digital invitations, portfolios, or bio pages on request.
            Reach out for curated recommendations tailored to your celebration or brand story.
          </p>
          <button className="mt-6 rounded-full bg-[#3B1F1F] px-5 py-2 text-sm font-semibold text-[#FFE0D0] shadow-md hover:bg-[#4A1D1D]">
            Contact support
          </button>
        </div>
      </section>
    </main>
  );
}
