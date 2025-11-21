export default function ServicesPage() {
  return (
    <main>
      <section className="rounded-2xl border bg-gradient-to-b from-[#FFF7FA] to-white p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Designing Services</h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Full‑service design studio for your event and brand. From elegant wedding invitations to distinctive
          logos and business cards — we craft visuals that feel timeless and personal.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="/dashboard" className="rounded-md bg-zinc-900 px-4 py-2.5 text-sm text-white hover:bg-zinc-800">Start a project</a>
          <a href="#packages" className="rounded-md border px-4 py-2.5 text-sm hover:bg-zinc-50">View packages</a>
        </div>
      </section>

      <section id="packages" className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <h3 className="font-semibold tracking-tight">Logo Design</h3>
          <p className="mt-2 text-sm text-zinc-600">Unique wordmarks and icons with 2–3 concepts and revisions.</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>Discovery & moodboard</li>
            <li>Primary + secondary logos</li>
            <li>Color palette & typography</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <h3 className="font-semibold tracking-tight">Wedding Card Design</h3>
          <p className="mt-2 text-sm text-zinc-600">Digital invite + print‑ready files in elegant themes.</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>Multiple concepts</li>
            <li>RSVP & schedule layout</li>
            <li>QR code placement</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <h3 className="font-semibold tracking-tight">Business Card Design</h3>
          <p className="mt-2 text-sm text-zinc-600">Minimal, premium business cards with on‑brand details.</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>Front/back variants</li>
            <li>Foil/emboss mockups</li>
            <li>Print‑ready export</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-5 md:col-span-2">
          <h3 className="font-semibold tracking-tight">Social Media Kit</h3>
          <p className="mt-2 text-sm text-zinc-600">Profile, cover, story highlights, and post templates.</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <h3 className="font-semibold tracking-tight">Brand Guidelines</h3>
          <p className="mt-2 text-sm text-zinc-600">A handy PDF with logo usage, colors, and type scales.</p>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border bg-zinc-900 p-8 text-white">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Ready to design something beautiful?</h3>
            <p className="mt-2 text-zinc-300">Kick off with a logo, a wedding card, or a complete brand kit.</p>
          </div>
          <a href="/dashboard" className="mt-4 inline-flex rounded-md bg-white px-4 py-2.5 text-sm text-zinc-900 hover:bg-zinc-100 md:mt-0">
            Start now
          </a>
        </div>
      </section>
    </main>
  );
}
