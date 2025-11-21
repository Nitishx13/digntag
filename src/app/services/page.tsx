export default function ServicesPage() {
  const packages = [
    {
      title: 'Logo Design',
      description: 'Unique wordmarks and icons with 2–3 concepts and revisions.',
      highlights: ['Discovery & moodboard', 'Primary + secondary logos', 'Color palette & typography'],
      accent: '#F6BCCE'
    },
    {
      title: 'Wedding Card Design',
      description: 'Digital invite + print-ready files in elegant themes.',
      highlights: ['Multiple concepts', 'RSVP & schedule layout', 'QR code placement'],
      accent: '#F9CFC3'
    },
    {
      title: 'Business Card Design',
      description: 'Minimal, premium business cards with on-brand details.',
      highlights: ['Front/back variants', 'Foil/emboss mockups', 'Print-ready export'],
      accent: '#FFE0D0'
    },
    {
      title: 'Brand Guidelines',
      description: 'A handy PDF with logo usage, colors, and type scales.',
      highlights: ['Typography', 'Color codes', 'Imagery direction'],
      accent: '#E9D3C2'
    }
  ];

  return (
    <main className="bg-[#FFE0D0]">
      <section className="rounded-3xl border border-[#F6BCCE]/60 bg-white/80 p-8 md:p-12 mx-auto max-w-6xl mt-12 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight text-[#3B1F1F]">Designing Services</h1>
        <p className="mt-3 max-w-3xl text-[#3B1F1F]/80 text-lg">
          Full-service digital identity studio for your brand. From elegant invite templates to business profiles, we craft
          visuals that feel timeless and personal.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <a
            href="/dashboard"
            className="rounded-lg bg-[#3B1F1F] px-5 py-3 text-sm font-semibold text-[#FFE0D0] shadow-lg transition hover:bg-[#4A1D1D]"
          >
            Start a project
          </a>
          <a
            href="#packages"
            className="rounded-lg border border-[#F6BCCE] px-5 py-3 text-sm font-semibold text-[#3B1F1F] bg-white/70 hover:bg-[#F9CFC3] transition"
          >
            View packages
          </a>
        </div>
      </section>

      <section
        id="packages"
        className="mx-auto mt-10 grid max-w-6xl gap-4 px-4 pb-12 md:grid-cols-2 auto-rows-fr"
      >
        {packages.map((packageItem) => (
          <div
            key={packageItem.title}
            className="flex h-full flex-col justify-between rounded-3xl border border-[#FFE0D0] bg-white p-6 shadow-lg transition hover:-translate-y-1"
          >
            <div>
              <div
                className="mb-4 h-12 w-12 rounded-xl"
                style={{ backgroundColor: packageItem.accent, color: '#3B1F1F' }}
              ></div>
              <h3 className="text-2xl font-semibold text-[#3B1F1F]">{packageItem.title}</h3>
              <p className="mt-2 text-sm text-[#3B1F1F]/70 flex-1">{packageItem.description}</p>
            </div>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[#3B1F1F]/80">
              {packageItem.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto mb-16 mt-8 max-w-6xl rounded-3xl border border-[#3B1F1F] bg-[#3B1F1F] p-8 text-[#FFE0D0] shadow-2xl">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-3xl font-semibold tracking-tight">Ready to design something beautiful?</h3>
            <p className="mt-2 text-[#F9CFC3]">
              Kick off a new digital identity with templates, cards, and profiles that look as unique as you are.
            </p>
          </div>
          <a
            href="/dashboard"
            className="mt-4 inline-flex rounded-lg bg-[#F6BCCE] px-6 py-3 text-sm font-semibold text-[#3B1F1F] shadow-lg transition hover:bg-[#F9CFC3] md:mt-0"
          >
            Start now
          </a>
        </div>
      </section>
    </main>
  );
}
