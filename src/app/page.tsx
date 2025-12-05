'use client';

type Card = {
  image: string;
  title: string;
  subtitle?: string;
  cta?: string;
  badge?: string;
  note?: string;
};

const digitalInvites: Card[] = [
  {
    image: 'https://images.unsplash.com/photo-1519791883280-d1eaffa5ae5c?auto=format&fit=crop&w=1200&q=60',
    title: 'Royal Wedding Invite',
    subtitle: 'Digital invitation • 3 pages',
    cta: 'Shop invite',
  },
  {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60',
    title: 'Floral Light Pink',
    subtitle: 'Digital invitation • Download only',
    cta: 'Shop invite',
  },
  {
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=60',
    title: 'Gulabi Heritage',
    subtitle: 'Digital invitation • QR shareable',
    cta: 'Shop invite',
  },
];

const complements: Card[] = [
  {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=60',
    title: 'Custom Favor Tags',
    subtitle: 'Tie-on tags that match every suite',
    cta: 'Shop now',
  },
  {
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1000&q=60',
    title: 'Thank You Stationery',
    subtitle: 'Luxury paper stock & foil',
    cta: 'Shop now',
  },
  {
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=60',
    title: 'Small Menu / Program Cards',
    subtitle: '60 lb uncoated, double-sided',
    cta: 'Shop now',
  },
  {
    image: 'https://images.unsplash.com/photo-1456428199391-1d72e1b7d6a9?auto=format&fit=crop&w=1000&q=60',
    title: 'Custom Envelope Seals',
    subtitle: 'Matte gold, blush, or white seals',
    cta: 'Shop now',
  },
];

const giftPicks: Card[] = [
  {
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=60',
    title: 'For the Couple',
    subtitle: 'Trio of blush stationery sets',
    cta: 'See pick',
  },
  {
    image: 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=1000&q=60',
    title: 'For Her Table',
    subtitle: 'Soft neutrals & ribbon',
    cta: 'See pick',
  },
  {
    image: 'https://images.unsplash.com/photo-1505253758473-11c28f7246a1?auto=format&fit=crop&w=1000&q=60',
    title: 'For Fine Friends',
    subtitle: 'Personalized thank you cards',
    cta: 'See pick',
  },
];

const packagingEssentials: Card[] = [
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=60',
    title: 'Custom Tissue Paper',
    subtitle: 'Blush & cream stock',
    cta: 'Browse this pack',
  },
  {
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=60',
    title: 'Ribbon & Twine',
    subtitle: 'Three cord textures',
    cta: 'Browse this pack',
  },
  {
    image: 'https://images.unsplash.com/photo-1455146634373-84e1f163b6c7?auto=format&fit=crop&w=1000&q=60',
    title: 'Gift Boxes',
    subtitle: 'Custom embossing available',
    cta: 'Browse this pack',
  },
  {
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1000&q=60',
    title: 'Stamps & Stickers',
    subtitle: 'Gold foil or matte',
    cta: 'Browse this pack',
  },
];

const reviews = [
  {
    text: '"Digntag took our wedding stationery to another level—without the stress."',
    author: 'Ananya & Karan',
  },
  {
    text: '"Every package was curated beautifully. Guests took photos before opening."',
    author: 'Riya & Soham',
  },
  {
    text: '"The custom favors and gift boxes arrived looking like they belonged in a magazine."',
    author: 'Saanvi',
  },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-[#F3F3F3] min-h-screen pb-16">
      <section className="relative bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.6em] text-gray-500">Limited drop</p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-5xl">
                What do you want to design?
              </h1>
              <p className="text-lg text-gray-700">
                From digital invites to luxe event complements, we craft stationery that feels like you—every hue,
                every fold.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg"
                >
                  Get started
                </a>
                <button className="inline-flex items-center justify-center rounded-full border border-gray-900 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-900">
                  Book a chat
                </button>
              </div>
            </div>
            <div className="h-[370px] w-full rounded-[32px] border pink-border bg-[var(--pink-5)] shadow-lg">
              <div
                className="h-full w-full rounded-[32px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=60')",
                }}
              >
                <div className="flex h-full w-full flex-col items-start justify-end rounded-[32px] bg-gradient-to-t from-[rgba(205,94,119,0.85)] to-transparent p-6 text-pink-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-5">Digntag</p>
                  <p className="text-sm font-normal text-pink-5">Handmade embellishment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
