import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - Digntag',
  description: 'Discover the powerful features of Digntag for managing your digital identity and business growth.',
};

export default function FeaturesPage() {
  const features = [
    {
      title: 'Digital ID Cards',
      description:
        'Share your identity with a pastel-first digital card that stays up to date automatically.',
      highlight: '#F6BCCE'
    },
    {
      title: 'Business Profiles',
      description:
        'Create a beautifully curated profile that showcases services, socials, and contact details in one place.',
      highlight: '#F9CFC3'
    },
    {
      title: 'Networking Tools',
      description:
        'Exchange cards, schedule follow-ups, and keep track of new relationships using Digntag networking tools.',
      highlight: '#FFE0D0'
    },
    {
      title: 'Analytics',
      description:
        'See who viewed you, which links convert, and what to focus on next with gentle visual reports.',
      highlight: '#F6EBCC'
    }
  ];

  return (
    <main className="bg-[#FFE0D0] py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#F6BCCE]/60 bg-white/90 p-10 shadow-xl backdrop-blur">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#3B1F1F]/60">Features</p>
            <h1 className="mt-4 text-4xl font-extrabold text-[#3B1F1F] sm:text-5xl lg:text-6xl">
              Everything you need for your digital identity
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-[#3B1F1F]/80">
              Digntag helps you share a cohesive identity across cards, profiles, and networks with a pastel polish.
            </p>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-[#FFE0D0] bg-white p-8 shadow-lg md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="relative flex h-full flex-col rounded-2xl border border-[#F6BCCE] bg-white p-6 shadow transition hover:-translate-y-1"
            >
              <div
                className="mb-4 h-12 w-12 rounded-xl"
                style={{ backgroundColor: feature.highlight, color: '#3B1F1F' }}
              ></div>
              <h2 className="text-2xl font-semibold text-[#3B1F1F]">{feature.title}</h2>
              <p className="mt-2 text-sm text-[#3B1F1F]/80 flex-1">{feature.description}</p>
              <div className="mt-6 text-sm font-semibold text-[#F6BCCE]">Learn more →</div>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-[#3B1F1F] bg-[#3B1F1F] p-10 text-[#FFE0D0] shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Ready to explore?</h2>
            <p className="mt-4 text-[#F9CFC3]">
              Start using Digntag for all your cards, profiles, and networking needs.
            </p>
            <a
              href="/signup"
              className="mt-6 inline-flex rounded-lg bg-[#F6BCCE] px-6 py-3 text-sm font-semibold text-[#3B1F1F] shadow-lg transition hover:bg-[#F9CFC3]"
            >
              Get Started Today
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
