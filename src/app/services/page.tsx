export default function ServicesPage() {
  const packages = [
    {
      title: 'Wedding Invites',
      description: 'Signature save-the-date, main day, and reception layouts with premium typography.',
      highlights: ['Multiple style explorations', 'QR RSVP + schedule', 'Print + digital exports'],
      accent: '#F6BCCE'
    },
    {
      title: 'Engagement Cards',
      description: 'Elegant formal announcements with photo treatments and monograms.',
      highlights: ['Photo retouch & framing', 'Custom monogram lockups', 'Gold foil-ready files'],
      accent: '#F9CFC3'
    },
    {
      title: 'Festival Invites',
      description: 'Navratri, Diwali, Eid, and seasonal greetings tailored for family or corporate lists.',
      highlights: ['Regional language support', 'Animated + static options', 'Share-ready links & PDFs'],
      accent: '#FFE0D0'
    },
    {
      title: 'Video Invitations',
      description: 'Cinematic motion invites with your music, script, and transitions synced perfectly.',
      highlights: ['Storyboard assistance', 'Up to 5 event slides', 'HD MP4 + reel cuts'],
      accent: '#E9D3C2'
    },
    {
      title: 'Puja Invites',
      description: 'Traditional pooja and havan cards with sacred motifs and Sanskrit verse placement.',
      highlights: ['Temple illustration options', 'Prasad & dress code blocks', 'High-contrast print files'],
      accent: '#FCD9B8'
    },
    {
      title: 'Party Invites',
      description: 'Birthdays, cocktails, and milestones with bold layouts and RSVP tracking cues.',
      highlights: ['Spotify/YouTube embeds', 'Guest QR check-in', 'Animated stickers add-on'],
      accent: '#FEE5CB'
    },
    {
      title: 'Baby & Kids',
      description: 'Birth announcements, mundan, and naming ceremonies with playful illustration.',
      highlights: ['Custom mascot artwork', 'Photo grid variations', 'Thank-you card set'],
      accent: '#F5E0FF'
    },
    {
      title: 'Path / Welcome Boards',
      description: 'Directional signage, welcome arches, and itinerary boards for venue decor.',
      highlights: ['Large-format sizing', 'Foam/LED print specs', 'Venue map integration'],
      accent: '#FFE7E0'
    },
    {
      title: 'Digital Art & Bhog Invites',
      description: 'Custom devotional artworks with bhog / prasad schedules in printable posters.',
      highlights: ['Hand-illustrated deity art', 'High-res PNG & PDF', 'Framing suggestions'],
      accent: '#F2D3FF'
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
