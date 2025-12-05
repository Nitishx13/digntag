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

const services = [
  'Custom digital invitations that animate on any device.',
  'Full wedding suite design with print + digital versions.',
  'Luxe packaging guidance and fulfillment support.',
];

const products = [
  'Editable templates ready for instant download.',
  'Tailored design help with color, typography, and wording.',
  'High-resolution PDFs plus print-ready assets.',
];

const featuresList = [
  'Live editing with instant preview and QR sharing.',
  'Automated RSVP tracking and messaging.',
  'Secure hosting so every invite stays online for guests.',
];

const happyCustomers = [
  {
    quote: 'Digntag delivered our invites within 48 hours and guests swooned over the motion graphics.',
    name: 'Ananya & Karan',
  },
  {
    quote: 'The packaging team matched the blush palette perfectly—no detail was missed.',
    name: 'Riya & Soham',
  },
  {
    quote: 'Our RSVP dashboard made following guest replies effortless.',
    name: 'Saanvi',
  },
];

const faqs = [
  {
    question: 'How quickly can we launch an invite?',
    answer: 'Most couples go live within a week; rush timelines are supported with express artwork.',
  },
  {
    question: 'Can we still order printed versions?',
    answer: 'Yes, we coordinate with trusted printers and handle proofs to keep the palette perfect.',
  },
  {
    question: 'Is there a consultation before design starts?',
    answer: 'Always—book a virtual call so we can capture your tone, theme, and delivery preferences.',
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
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl">
                What do you want to design?
              </h1>
              <p className="text-lg text-gray-500">
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

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6 space-y-10">
          <article className="text-center space-y-4 bg-white p-8 rounded-[28px] border border-pink-border-light shadow-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-pink-1">About</p>
            <h2 className="text-3xl font-semibold text-pink-1">We choreograph unforgettable stationery experiences</h2>
            <p className="text-lg text-pink-2">
              Digntag is the studio that pairs cinematic digital invites with hand-finished packaging so your guests
              feel the narrative before they even arrive.
            </p>
          </article>

          <div className="grid gap-6 md:grid-cols-3">
            {[{ title: 'Services', items: services }, { title: 'Products', items: products }, { title: 'Features', items: featuresList }].map(
              (block) => (
                <article
                  key={block.title}
                  className="space-y-2 rounded-[28px] border border-pink-border-light bg-white p-6 text-center shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-pink-1">{block.title}</h3>
                  <ul className="space-y-2 text-sm text-pink-2">
                    {block.items.map((item) => (
                      <li key={item} className="relative pl-6">
                        <span className="absolute left-0 top-1 h-2 w-2 rounded-full bg-pink-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ),
            )}
          </div>

          <article className="rounded-[32px] border border-pink-border bg-white p-10 text-center shadow-[0_20px_45px_rgba(205,94,119,0.15)]">
            <p className="text-xs uppercase tracking-[0.4em] text-pink-1">Happy customers</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {happyCustomers.map((cust) => (
                <blockquote key={cust.name} className="space-y-2">
                  <p className="text-sm italic text-pink-3">“{cust.quote}”</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-1">{cust.name}</p>
                </blockquote>
              ))}
            </div>
          </article>

          <article className="space-y-4 rounded-[32px] border border-pink-border bg-white p-10 shadow-lg">
            <p className="text-xs uppercase tracking-[0.4em] text-pink-1">FAQ</p>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details className="rounded-2xl border border-pink-border-light bg-white p-4" key={faq.question}>
                  <summary className="cursor-pointer text-sm font-semibold text-pink-1">{faq.question}</summary>
                  <p className="mt-2 text-sm text-pink-2">{faq.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </div>
      </section>

    </div>
  );
}
