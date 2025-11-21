import { Heart, Calendar, MapPin, Images, QrCode, Sparkles, Star, CheckCircle, LayoutGrid, Share2, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      {/* Hero (Wedding aesthetic) */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#FFF7FA] to-[#FFFAF7] p-8 md:p-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-zinc-700">
            <Sparkles size={14} /> Perfect for Weddings & Events
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Elegant digital cards, made in minutes.
          </h1>
          <p className="mt-4 text-zinc-600 text-lg">
            Craft a modern invite with RSVP, schedule, venue map, and photo gallery. Share via link or QR and
            follow every view and click.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="/shop" className="rounded-md bg-zinc-900 px-4 py-2.5 text-white text-sm hover:bg-zinc-800">
              Select your card
            </a>
            <a href="#features" className="rounded-md border px-4 py-2.5 text-sm hover:bg-zinc-50">
              See Features
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute right-[-60px] top-[-60px] h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#EFB7C0]/25 to-transparent md:right-[-80px] md:top-[-80px] md:h-72 md:w-72" />
        <div className="pointer-events-none absolute bottom-[-70px] left-[-50px] h-60 w-60 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FDECEF]/40 to-transparent md:h-72 md:w-72" />
      </section>

      {/* Select, Share, Track */}
      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#F4F6FF] text-[#34388F]"><LayoutGrid size={16} /></div>
          <h3 className="mt-2 font-semibold tracking-tight">Select your card</h3>
          <p className="mt-2 text-sm text-zinc-600">Pick a wedding or business template to start fast.</p>
          <div className="mt-3">
            <a href="/shop" className="text-sm text-zinc-700 underline underline-offset-4">Browse templates →</a>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#FDECEF] text-[#5B2245]"><Share2 size={16} /></div>
          <h3 className="mt-2 font-semibold tracking-tight">Share your card</h3>
          <p className="mt-2 text-sm text-zinc-600">Publish with a short link or QR and send to guests.</p>
          <div className="mt-3">
            <a href="/dashboard" className="text-sm text-zinc-700 underline underline-offset-4">Get share link →</a>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#EEFDF3] text-[#155E2B]"><BarChart3 size={16} /></div>
          <h3 className="mt-2 font-semibold tracking-tight">Track your card</h3>
          <p className="mt-2 text-sm text-zinc-600">See views, clicks, and sources in real time.</p>
          <div className="mt-3">
            <a href="/dashboard" className="text-sm text-zinc-700 underline underline-offset-4">View analytics →</a>
          </div>
        </div>
      </section>

      {/* Logos / Social proof (placeholder) */}
      <section className="mt-10 text-xs text-zinc-500">
        <p>Trusted for events, businesses, and creators.</p>
      </section>

      {/* Wedding-focused Features */}
      <section id="features" className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#FDECEF] text-[#5B2245]"><Heart size={16} /></div>
          <h3 className="mt-2 font-semibold tracking-tight">RSVP & Guest Management</h3>
          <p className="mt-2 text-sm text-zinc-600">Collect responses, meal preferences, and notes seamlessly.</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#FFF0D9] text-[#7A542E]"><Calendar size={16} /></div>
          <h3 className="mt-2 font-semibold tracking-tight">Schedule & Events</h3>
          <p className="mt-2 text-sm text-zinc-600">Add ceremonies, reception timings, and reminders.</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#EAF3FF] text-[#1C4A7F]"><MapPin size={16} /></div>
          <h3 className="mt-2 font-semibold tracking-tight">Venue Map</h3>
          <p className="mt-2 text-sm text-zinc-600">Interactive maps and directions for guests.</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#FFF7E6] text-[#7F5B1C]"><Images size={16} /></div>
          <h3 className="mt-2 font-semibold tracking-tight">Gallery & Story</h3>
          <p className="mt-2 text-sm text-zinc-600">Share your journey with photos and videos.</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#F4F6FF] text-[#34388F]"><QrCode size={16} /></div>
          <h3 className="mt-2 font-semibold tracking-tight">QR & Link Sharing</h3>
          <p className="mt-2 text-sm text-zinc-600">Print QR on invites and share a single short link.</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#EEFDF3] text-[#155E2B]"><Star size={16} /></div>
          <h3 className="mt-2 font-semibold tracking-tight">Real-time Analytics</h3>
          <p className="mt-2 text-sm text-zinc-600">Track views, clicks, and sources as guests engage.</p>
        </div>
      </section>

      {/* Showcase */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Wedding showcase</h2>
        <p className="mt-1 text-sm text-zinc-600">A glimpse at what you can create in minutes.</p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-5">
            <div className="text-sm text-zinc-600">Classic Blush</div>
            <div className="mt-2 h-32 rounded-md bg-gradient-to-br from-[#FFF0F5] to-[#FAF5FF]" />
          </div>
          <div className="rounded-xl border bg-white p-5">
            <div className="text-sm text-zinc-600">Ivory & Gold</div>
            <div className="mt-2 h-32 rounded-md bg-gradient-to-br from-[#FFFAF0] to-[#FFF5E6]" />
          </div>
        </div>
        <div className="mt-4">
          <a href="/dashboard" className="text-sm text-zinc-700 underline underline-offset-4">
            Browse all templates →
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <div className="text-xs font-medium text-zinc-500">Step 1</div>
          <h3 className="mt-1 font-semibold tracking-tight">Pick a template</h3>
          <p className="mt-2 text-sm text-zinc-600">Choose a wedding-ready preset as your base.</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="text-xs font-medium text-zinc-500">Step 2</div>
          <h3 className="mt-1 font-semibold tracking-tight">Customize your card</h3>
          <p className="mt-2 text-sm text-zinc-600">Add schedule, venues, RSVP, and your story & photos.</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="text-xs font-medium text-zinc-500">Step 3</div>
          <h3 className="mt-1 font-semibold tracking-tight">Share & track</h3>
          <p className="mt-2 text-sm text-zinc-600">Publish with a short link or QR, and monitor engagement.</p>
        </div>
      </section>

      {/* Stats band */}
      <section className="mt-10 rounded-2xl border bg-white p-6 md:p-8">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div>
            <div className="text-2xl font-semibold">12k+</div>
            <div className="text-xs text-zinc-600">Cards created</div>
          </div>
          <div>
            <div className="text-2xl font-semibold">2.3M</div>
            <div className="text-xs text-zinc-600">Views tracked</div>
          </div>
          <div>
            <div className="text-2xl font-semibold">98%</div>
            <div className="text-xs text-zinc-600">RSVP completion</div>
          </div>
          <div>
            <div className="text-2xl font-semibold">4.9</div>
            <div className="text-xs text-zinc-600">Avg rating</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">What couples say</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { name: "Aarav & Siya", quote: "Our families loved the invite and RSVP was effortless." },
            { name: "Rhea & Kabir", quote: "The venue map and schedule kept everyone on time." },
            { name: "Naina & Arjun", quote: "So easy to customize. The gallery looked gorgeous!" },
          ].map((t, i) => (
            <div key={i} className="rounded-xl border bg-white p-5">
              <div className="flex items-center gap-2 text-[#5B2245]">
                <CheckCircle size={16} /> Verified couple
              </div>
              <p className="mt-3 text-sm text-zinc-700">“{t.quote}”</p>
              <div className="mt-3 text-xs font-medium text-zinc-600">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Frequently asked questions</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            {
              q: "Can guests RSVP without creating an account?",
              a: "Yes. Guests can submit RSVP and details directly from the link or QR.",
            },
            {
              q: "Can we print the QR on our physical invite?",
              a: "Absolutely. Download the QR PNG/SVG and include it wherever you like.",
            },
            {
              q: "Do you support multiple events and venues?",
              a: "Yes, add as many events as you need with separate timings and locations.",
            },
            {
              q: "Is there a free plan?",
              a: "Yes, you can design and publish a basic card for free and upgrade anytime.",
            },
          ].map((f, i) => (
            <details key={i} className="rounded-xl border bg-white p-4">
              <summary className="cursor-pointer list-none font-medium">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border bg-zinc-900 p-8 text-white">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Start your first digital card</h3>
            <p className="mt-2 text-zinc-300">It takes less than 2 minutes to publish a shareable link.</p>
          </div>
          <a href="/dashboard" className="mt-4 inline-flex rounded-md bg-white px-4 py-2.5 text-sm text-zinc-900 hover:bg-zinc-100 md:mt-0">
            Create a card
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 grid grid-cols-1 gap-4 text-sm text-zinc-600 md:grid-cols-3">
        <div>
          <div className="font-medium text-zinc-800">Digital Tag</div>
          <p className="mt-1">Design • Share • Track</p>
        </div>
        <div>
          <div className="font-medium text-zinc-800">Use cases</div>
          <ul className="mt-1 space-y-1">
            <li>Wedding & events</li>
            <li>Business cards</li>
            <li>Creators & artists</li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-zinc-800">Resources</div>
          <ul className="mt-1 space-y-1">
            <li><a className="hover:underline" href="/dashboard">Templates</a></li>
            <li><a className="hover:underline" href="/admin">Admin (mock)</a></li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
