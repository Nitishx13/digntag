import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - Digntag',
  description: 'High-quality work, transparent pricing, and lightning delivery—our entire focus.',
};

const highlights = [
  {
    title: 'High-quality work',
    description:
      'Senior designers obsess over typography, illustration, and motion so every invite feels premium and on-brand.',
    accent: '#F6BCCE',
  },
  {
    title: 'Affordable pricing',
    description:
      'Clear video + PDF packages mean you always know the cost before production starts—no surprise fees.',
    accent: '#F9CFC3',
  },
  {
    title: 'Fast delivery',
    description:
      'Tight workflows, shared checklists, and export-ready templates help us deliver PNG, JPEG, and PDF files fast.',
    accent: '#FFE0D0',
  },
];

export default function FeaturesPage() {
  return (
    <main className="bg-[#FFE0D0] py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#F6BCCE]/60 bg-white/95 p-10 text-center shadow-xl">
          <p className="text-sm uppercase tracking-[0.4em] text-[#3B1F1F]/60">Features</p>
          <h1 className="mt-4 text-4xl font-extrabold text-[#3B1F1F] sm:text-5xl">
            High quality. Affordable. Delivered fast.
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[#3B1F1F]/80">
            We trimmed the buzzwords and doubled down on what matters: craft you can see, prices you can trust, and turnarounds your clients love.
          </p>
        </section>

        <section className="grid gap-6 rounded-3xl border border-[#FFE0D0] bg-white p-8 shadow-lg md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-[#F6BCCE] bg-white/90 p-6 text-left shadow transition hover:-translate-y-1"
            >
              <div
                className="mb-4 h-11 w-11 rounded-xl"
                style={{ backgroundColor: item.accent, color: '#3B1F1F' }}
              ></div>
              <h2 className="text-2xl font-semibold text-[#3B1F1F]">{item.title}</h2>
              <p className="mt-3 text-sm text-[#3B1F1F]/80 flex-1">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
