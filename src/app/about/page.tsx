import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Digntag',
  description: 'Learn more about Digntag and our mission to revolutionize digital identity management.',
};

export default function AboutPage() {
  const values = [
    {
      name: 'Innovation',
      description: 'We push boundaries to deliver cutting-edge solutions that feel personal and intentional.'
    },
    {
      name: 'Simplicity',
      description: 'Complex technology becomes effortless with thoughtful interactions and design.'
    },
    {
      name: 'Integrity',
      description: 'We build trust through transparency and by always putting you first.'
    }
  ];

  return (
    <main className="bg-[#FFE0D0] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#F6BCCE]/60 bg-white/80 p-10 shadow-xl backdrop-blur">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#3B1F1F]/60">About</p>
            <h1 className="mt-4 text-4xl font-extrabold text-[#3B1F1F] sm:text-5xl lg:text-6xl">
              Digntag <span className="text-[#F6BCCE]">in Detail</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-[#3B1F1F]/80">
              We’re building a pastel-first digital identity studio where everything from id cards to networking tools
              feels intentional, vibrant, and ready for your brand story.
            </p>
          </div>
        </section>

        <section className="grid gap-10 rounded-3xl border border-[#FFE0D0] bg-white p-8 shadow-xl md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-[#3B1F1F]">Our Story</h2>
            <p className="mt-4 text-[#3B1F1F]/80">
              Founded in 2023, Digntag was born from a simple idea: make digital identity management accessible to
              everyone. Your online presence should be as unique, beautiful, and professional as you are.
            </p>
            <p className="mt-4 text-[#3B1F1F]/80">
              Our team of designers and engineers craft experiences that feel thoughtful and effortless so you can
              share your brand confidently.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#3B1F1F]">Our Mission</h2>
            <p className="mt-4 text-[#3B1F1F]/80">
              We simplify digital identity so you can focus on what matters—building connections and growing your
              presence.
            </p>
            <p className="mt-4 text-[#3B1F1F]/80">
              Whether you’re a freelancer or a growing business, our platform keeps every touchpoint aligned and on brand.
            </p>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-[#F6BCCE]/60 bg-[#fff] p-8 shadow-lg md:grid-cols-3">
          {values.map((value) => (
            <div key={value.name} className="rounded-2xl border border-[#FFE0D0] bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F6BCCE] text-xl font-bold text-[#3B1F1F]">
                {value.name[0]}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#3B1F1F]">{value.name}</h3>
              <p className="text-sm text-[#3B1F1F]/80">{value.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-[#3B1F1F] bg-[#3B1F1F] p-10 text-[#FFE0D0] shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Ready to craft your pastel identity?</h2>
            <p className="mt-4 text-[#F9CFC3]">
              Join thousands of creators trusting Digntag for beautiful, memorable digital experiences.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-[#F6BCCE] px-6 py-3 text-sm font-semibold text-[#3B1F1F] shadow-lg transition hover:bg-[#F9CFC3]"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
