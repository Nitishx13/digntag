"use client";
import Link from "next/link";

const featuredInvites = [
  {
    id: "royal-affair",
    tag: "Wedding Invitation",
    headline: "You're invited to",
    title: "Dhruv & Harshi",
    subtitle: "Tuesday, Feb 11 · 06:00 PM",
    detail: "DNJ Road, Main Market · Noida",
    badge: "New",
    background: "linear-gradient(180deg, #FFE2EA 0%, #FFF6E7 48%, #F7D9F5 100%)",
    overlay: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,184,214,0.5), transparent 42%)",
    accent: "#FF6B92",
  },
  {
    id: "silver-jubilee",
    tag: "25th Anniversary",
    headline: "In honour of",
    title: "Sanjay & Payal",
    subtitle: "Monday, March 15 · 07:00 PM",
    detail: "DNJ Road, Main Market · Sector 22",
    badge: "1 Page",
    background: "linear-gradient(180deg, #E3F2FF 0%, #F7E8FF 60%, #FDECF7 100%)",
    overlay: "radial-gradient(circle at 10% 30%, rgba(124,58,237,0.35), transparent 40%), radial-gradient(circle at 70% 0%, rgba(255,255,255,0.6), transparent 45%)",
    accent: "#8B6CFF",
  },
  {
    id: "golden-bash",
    tag: "Birthday Gala",
    headline: "Let’s celebrate",
    title: "Yogesh Pathak",
    subtitle: "Sunday, July 20 · 09:00 AM",
    detail: "Harmony Ln, Catti Road · Sector 65",
    badge: "VIP",
    background: "linear-gradient(180deg, #FFF5D9 0%, #FFEBD0 55%, #F8E3FF 100%)",
    overlay: "radial-gradient(circle at 15% 15%, rgba(255,214,153,0.55), transparent 40%), radial-gradient(circle at 85% 10%, rgba(255,255,255,0.55), transparent 45%)",
    accent: "#F2B647",
  },
  {
    id: "boho-bliss",
    tag: "Sangeet Night",
    headline: "Dance with",
    title: "Ishaan & Nisha",
    subtitle: "Friday, Aug 22 · 08:00 PM",
    detail: "The Boheme Courtyard · Jaipur",
    badge: "Live",
    background: "linear-gradient(180deg, #FFE3F1 0%, #FFD9E8 50%, #FDE8D9 100%)",
    overlay: "radial-gradient(circle at 30% 10%, rgba(255,255,255,0.55), transparent 45%), radial-gradient(circle at 70% 20%, rgba(255,165,196,0.5), transparent 40%)",
    accent: "#E45491",
  },
  {
    id: "coastal-vows",
    tag: "Beach Wedding",
    headline: "Celebrate",
    title: "Reva & Kian",
    subtitle: "Saturday, Sep 14 · 05:30 PM",
    detail: "Azure Bay, Goa",
    badge: "Sunset",
    background: "linear-gradient(180deg, #DFF6FF 0%, #BEE7FF 55%, #F7F8FF 100%)",
    overlay: "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 80% 15%, rgba(126,210,255,0.5), transparent 42%)",
    accent: "#2F9ED9",
  },
  {
    id: "rose-ball",
    tag: "Anniversary",
    headline: "In honour of",
    title: "Aditi & Vivek",
    subtitle: "Wednesday, Nov 12 · 07:00 PM",
    detail: "Rosewood Palace, Udaipur",
    badge: "Gala",
    background: "linear-gradient(180deg, #FFE9F0 0%, #F7D4E4 45%, #FDE6F7 100%)",
    overlay: "radial-gradient(circle at 15% 30%, rgba(255,255,255,0.55), transparent 45%), radial-gradient(circle at 85% 5%, rgba(243,170,197,0.45), transparent 42%)",
    accent: "#C94B7E",
  },
  {
    id: "desert-promise",
    tag: "Haldi",
    headline: "Bless",
    title: "Meera & Kabir",
    subtitle: "Sunday, Oct 05 · 11:00 AM",
    detail: "Amber Dunes Retreat",
    badge: "Warm",
    background: "linear-gradient(180deg, #FFF2D6 0%, #FFE2B8 50%, #FFD8B5 100%)",
    overlay: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 80% 10%, rgba(255,197,132,0.45), transparent 40%)",
    accent: "#E39A38",
  },
  {
    id: "aurora-engagement",
    tag: "Engagement",
    headline: "Toast with",
    title: "Sameer & Kyra",
    subtitle: "Thursday, Dec 18 · 06:00 PM",
    detail: "Aurora Glasshouse · Mumbai",
    badge: "Sparkle",
    background: "linear-gradient(180deg, #E4E3FF 0%, #D1E3FF 45%, #F5E8FF 100%)",
    overlay: "radial-gradient(circle at 30% 15%, rgba(255,255,255,0.55), transparent 40%), radial-gradient(circle at 70% 5%, rgba(151,134,255,0.4), transparent 45%)",
    accent: "#7A69FF",
  },
  {
    id: "neon-launch",
    tag: "Brand Launch",
    headline: "Introducing",
    title: "Studio Flux",
    subtitle: "Monday, Jan 08 · 07:30 PM",
    detail: "Nightwave Hub · Bengaluru",
    badge: "Digital",
    background: "linear-gradient(180deg, #1C1B2E 0%, #2C1F3B 60%, #F763D8 100%)",
    overlay: "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 10%, rgba(246,99,216,0.4), transparent 35%)",
    accent: "#FF5BD6",
  },
  {
    id: "pastel-sangeet",
    tag: "Sangeet",
    headline: "Groove with",
    title: "Hrida & Aarush",
    subtitle: "Friday, Apr 11 · 09:00 PM",
    detail: "Pastel Pavilion · Pune",
    badge: "Music",
    background: "linear-gradient(180deg, #FDF2FF 0%, #FFE8FF 45%, #FFFBE8 100%)",
    overlay: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 40%), radial-gradient(circle at 70% 0%, rgba(255,180,220,0.45), transparent 38%)",
    accent: "#EA63A7",
  },
  {
    id: "midnight-soiree",
    tag: "Cocktail Night",
    headline: "Raise a glass",
    title: "Velvet Affair",
    subtitle: "Saturday, Feb 14 · 10:00 PM",
    detail: "Celeste Skybar · Delhi",
    badge: "VIP",
    background: "linear-gradient(180deg, #1F1B2E 0%, #302446 40%, #6225B4 100%)",
    overlay: "radial-gradient(circle at 25% 10%, rgba(255,255,255,0.2), transparent 35%), radial-gradient(circle at 85% 15%, rgba(155,111,255,0.35), transparent 40%)",
    accent: "#A678FF",
  },
  {
    id: "garden-baby",
    tag: "Baby Shower",
    headline: "We’re blooming",
    title: "Baby Kapoor",
    subtitle: "Sunday, May 18 · 04:00 PM",
    detail: "Olive Garden, Gurgaon",
    badge: "Joy",
    background: "linear-gradient(180deg, #E9FFE8 0%, #D2F9FF 50%, #F6F0FF 100%)",
    overlay: "radial-gradient(circle at 15% 25%, rgba(255,255,255,0.7), transparent 50%), radial-gradient(circle at 80% 5%, rgba(196,232,255,0.45), transparent 45%)",
    accent: "#5DBA8C",
  },
  {
    id: "cosmic-cocktail",
    tag: "After Party",
    headline: "Step into",
    title: "Neon Orbit",
    subtitle: "Friday, Jun 06 · 11:30 PM",
    detail: "Orbital Lounge · Hyderabad",
    badge: "Neon",
    background: "linear-gradient(180deg, #181C3A 0%, #281B4D 50%, #FF5EA8 100%)",
    overlay: "radial-gradient(circle at 30% 15%, rgba(255,255,255,0.2), transparent 40%), radial-gradient(circle at 75% 10%, rgba(255,94,168,0.4), transparent 38%)",
    accent: "#FF5EA8",
  },
  {
    id: "royal-jubilee",
    tag: "Silver Jubilee",
    headline: "Celebrating",
    title: "Mr & Mrs Rao",
    subtitle: "Tuesday, Aug 05 · 07:00 PM",
    detail: "Imperial Ballroom · Chennai",
    badge: "Classic",
    background: "linear-gradient(180deg, #F4F7FF 0%, #E3E9FF 50%, #FFF5F5 100%)",
    overlay: "radial-gradient(circle at 20% 25%, rgba(255,255,255,0.7), transparent 45%), radial-gradient(circle at 80% 5%, rgba(188,200,255,0.45), transparent 42%)",
    accent: "#4E62D6",
  },
  {
    id: "luxe-mehendi",
    tag: "Mehendi",
    headline: "Bloom for",
    title: "Sana & Ehan",
    subtitle: "Wednesday, Mar 19 · 03:00 PM",
    detail: "Jasmine Courtyard · Lucknow",
    badge: "Fresh",
    background: "linear-gradient(180deg, #F7FFE4 0%, #E7FFD4 50%, #FFF4E4 100%)",
    overlay: "radial-gradient(circle at 15% 30%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 75% 15%, rgba(190,255,196,0.45), transparent 42%)",
    accent: "#6BAF4B",
  },
  {
    id: "modern-shower",
    tag: "Bridal Shower",
    headline: "Celebrate",
    title: "Tara",
    subtitle: "Sunday, Sep 01 · 02:00 PM",
    detail: "Studio Bloom · Kolkata",
    badge: "Chic",
    background: "linear-gradient(180deg, #FFF5FA 0%, #FFE4F3 50%, #F2F9FF 100%)",
    overlay: "radial-gradient(circle at 25% 10%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 85% 5%, rgba(255,170,210,0.4), transparent 42%)",
    accent: "#FF589C",
  },
  {
    id: "golden-reception",
    tag: "Reception",
    headline: "Join us",
    title: "Nikhil & Rhea",
    subtitle: "Saturday, Jan 24 · 08:00 PM",
    detail: "Grand Meridian · Indore",
    badge: "Formal",
    background: "linear-gradient(180deg, #FFF7E3 0%, #FFECC1 45%, #FFE4D1 100%)",
    overlay: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.55), transparent 40%), radial-gradient(circle at 80% 15%, rgba(255,210,160,0.45), transparent 42%)",
    accent: "#D99031",
  },
  {
    id: "rustic-brunch",
    tag: "Post-Wed Brunch",
    headline: "Sip & savour",
    title: "Rekha & Arjun",
    subtitle: "Monday, Mar 30 · 11:30 AM",
    detail: "Mango Grove · Coorg",
    badge: "Fresh",
    background: "linear-gradient(180deg, #F6FFE8 0%, #F0FFE0 45%, #FFF6E0 100%)",
    overlay: "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.6), transparent 42%), radial-gradient(circle at 70% 10%, rgba(205,255,179,0.4), transparent 40%)",
    accent: "#7DB240",
  },
  {
    id: "carnival-birthday",
    tag: "Birthday Bash",
    headline: "Let’s celebrate",
    title: "Anaya@16",
    subtitle: "Friday, Jun 20 · 06:00 PM",
    detail: "Carnival Club · Chandigarh",
    badge: "Fun",
    background: "linear-gradient(180deg, #FFF2F2 0%, #FFE0F2 45%, #FFF3D9 100%)",
    overlay: "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 85% 10%, rgba(255,188,210,0.45), transparent 40%)",
    accent: "#FF5A7C",
  },
  {
    id: "heritage-anniv",
    tag: "Golden Anniversary",
    headline: "Honouring",
    title: "Kamla & Dev",
    subtitle: "Thursday, Apr 24 · 07:30 PM",
    detail: "Heritage Haveli · Bikaner",
    badge: "50 Yrs",
    background: "linear-gradient(180deg, #FFF2DA 0%, #FFE3BE 45%, #FFEDE1 100%)",
    overlay: "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.55), transparent 45%), radial-gradient(circle at 80% 10%, rgba(240,199,150,0.45), transparent 40%)",
    accent: "#C87E34",
  },
  {
    id: "regal-birthday",
    tag: "Milestone Birthday",
    headline: "Let’s toast",
    title: "Raghav @40",
    subtitle: "Saturday, Oct 18 · 08:30 PM",
    detail: "Regal Club · Ahmedabad",
    badge: "Grand",
    background: "linear-gradient(180deg, #F4F7FF 0%, #EAE0FF 50%, #FFDFF7 100%)",
    overlay: "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 75% 5%, rgba(196,174,255,0.45), transparent 38%)",
    accent: "#8A63E6",
  },
  {
    id: "sunset-proposal",
    tag: "Proposal",
    headline: "Say yes",
    title: "Marina Cliff",
    subtitle: "Sunday, Jul 13 · 06:45 PM",
    detail: "Sunset Point · Pondicherry",
    badge: "Romance",
    background: "linear-gradient(180deg, #FFDEE2 0%, #FFD5C2 45%, #FFECD9 100%)",
    overlay: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,175,170,0.4), transparent 40%)",
    accent: "#FF7F69",
  },
  {
    id: "festival-invite",
    tag: "Festive Card",
    headline: "Warm wishes",
    title: "Diwali Soirée",
    subtitle: "Thursday, Oct 30 · 07:00 PM",
    detail: "Radiant Manor · Surat",
    badge: "Joy",
    background: "linear-gradient(180deg, #FFF4DD 0%, #FFE9C0 45%, #FFF0F0 100%)",
    overlay: "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.6), transparent 45%), radial-gradient(circle at 85% 5%, rgba(255,205,150,0.45), transparent 40%)",
    accent: "#F18A32",
  },
  {
    id: "velvet-gala",
    tag: "Charity Gala",
    headline: "Join hands",
    title: "Velvet Hearts",
    subtitle: "Friday, Nov 28 · 08:00 PM",
    detail: "Galaxy Hall · Mumbai",
    badge: "Cause",
    background: "linear-gradient(180deg, #1E1633 0%, #3A1F4F 55%, #D96DD9 100%)",
    overlay: "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.2), transparent 35%), radial-gradient(circle at 80% 10%, rgba(217,109,217,0.4), transparent 40%)",
    accent: "#CC58C8",
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

      <section className="mx-auto mt-10 max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">Featured invites</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#3B1F1F]">Handpicked templates customers love</h2>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E78570]">Swipe to explore</span>
        </div>
        <div className="mt-6 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredInvites.map((card) => (
            <div
              key={card.id}
              className="relative flex h-[380px] w-[240px] flex-shrink-0 flex-col rounded-[32px] border border-white/40 p-6 text-white shadow-[0_25px_40px_rgba(59,31,31,0.18)]"
              style={{ background: card.background }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[32px] opacity-70"
                style={{ backgroundImage: card.overlay }}
              />
              <div className="relative flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.4em]">
                <span className="rounded-full bg-white/25 px-3 py-1 text-[9px] text-[#3B1F1F]">{card.tag}</span>
                <span className="rounded-full bg-white/90 px-3 py-1 text-[9px] text-[#3B1F1F]">{card.badge}</span>
              </div>
              <div className="relative mt-8 space-y-1 text-[#3B1F1F]">
                <p className="text-[11px] uppercase tracking-[0.5em] text-[#3B1F1F]/60">{card.headline}</p>
                <h3 className="text-[28px] font-serif font-bold text-[#3B1F1F]">{card.title}</h3>
                <p className="text-sm font-medium text-[#3B1F1F]/70">{card.subtitle}</p>
              </div>
              <div className="relative mt-auto">
                <div className="rounded-2xl border border-white/30 bg-white/40 px-4 py-3 text-sm text-[#3B1F1F]/80 backdrop-blur">
                  {card.detail}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href="/login"
                    className="text-sm font-semibold uppercase tracking-[0.3em]"
                    style={{ color: card.accent }}
                  >
                    Preview design
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
                    style={{ backgroundColor: card.accent }}
                    aria-label="Login to continue"
                  >
                    →
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
