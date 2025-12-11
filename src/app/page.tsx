'use client';

import Script from 'next/script';
import './website.css';

const invitationSlides = [
  { title: 'Minimalist', image: '/assets/img/digntag_slider_1.png', label: 'Minimalist' },
  { title: 'Floral Script', image: '/assets/img/digntag_slider_2.png', label: 'Floral Script' },
  { title: 'Art Deco', image: '/assets/img/digntag_slider_3.png', label: 'Art Deco' },
  { title: 'Watercolor', image: '/assets/img/digntag_slider_4.png', label: 'Watercolor' },
  { title: 'Modern Text', image: '/assets/img/digntag_slider_5.png', label: 'Modern Text' },
];

const packagingSlides = [
  { image: '/assets/img/img2.png', label: 'Silk Ribbons' },
  { image: '/assets/img/img5.png', label: 'Custom Wrapping Paper' },
  { image: '/assets/img/image 3.png', label: 'Boutique Gift Bags' },
  { image: '/assets/img/img3.png', label: 'Sealing Stickers' },
  { image: '/assets/img/img.png', label: 'Custom Boxes' },
  { image: '/assets/img/img4.png', label: 'Mini Gift Tags' },
];

const weddingComplements = [
  { title: 'Thank You & RSVP Stationery Cards', image: '/assets/img/wed2.png', description: 'Soft florals and polished curves' },
  { title: 'Small Manual Program Cards', image: '/assets/img/wed3.png', description: 'Tall layout for layered schedules' },
  { title: 'Mini Manual Program Cards', image: '/assets/img/wed4.png', description: 'Compact + tactile finish' },
  { title: 'Envelope Liners', image: '/assets/img/wed5.png', description: 'Printed foils on velvet stock' },
  { title: 'Custom Envelope Liners', image: '/assets/img/wed1.png', description: 'Personalized lettering inside' },
];

const digitalInvitationTemplates = [
  { label: 'Invite 4', tone: 'Refined Balance', color: '#E8F0FF' },
  { label: 'Invite 5', tone: 'Modern Luxe', color: '#D6D8FF' },
  { label: 'Invite 1', tone: 'Minimal Warmth', color: '#FFF0F7' },
  { label: 'Invite 2', tone: 'Blush Contrast', color: '#FEE2E9' },
  { label: 'Invite 3', tone: 'Moody Elegance', color: '#2F0F17' },
];

const corporateCards = [
  { title: 'Sleek Notebook', image: '/assets/img/cop1.png', tag: 'Executive-ready' },
  { title: 'Premium Pens', image: '/assets/img/cop2.png', tag: 'Handcrafted metal' },
  { title: 'Custom Planner', image: '/assets/img/cop3.png', tag: 'Embed your logo' },
  { title: 'Sleek Tech Accessory', image: '/assets/img/cop4.png', tag: 'Gift-worthy + useful' },
];

const testimonials = [
  {
    title: 'A life-saver!',
    quote: 'The design process was incredibly smooth. They captured my vision perfectly and the final print quality for the invitations was stunning.',
    author: 'Sarah K.',
  },
  {
    title: 'Excellent Service',
    quote: 'I used Dignlay for all my wedding stationery and the gift packaging. Everything was cohesive, high-quality, and arrived ahead of schedule.',
    author: 'Michael A.',
  },
  {
    title: 'Best Quality Prints',
    quote: 'Vibrant colors, luxurious stock, and the cards felt tailor-made for our story.',
    author: 'Jennifer L.',
  },
];

export default function Home() {
  const heroTiles = invitationSlides.map((item) => ({ image: item.image, label: item.label }));
  const handleToggle = () => {
    if (typeof window !== 'undefined') {
      const nav = window as Window & typeof globalThis & { toggleMenu?: () => void };
      nav.toggleMenu?.();
    }
  };

  return (
    <>
      <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/owl.carousel.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />

      <div className="page-wrapper text-gray-800">
        <div
          id="mobile-menu"
          className="fixed top-0 left-0 w-full h-full bg-primary z-50 transform -translate-x-full transition-transform duration-300 md:hidden"
        >
          <div className="p-6">
            <button
              onClick={handleToggle}
              className="text-white text-3xl absolute top-4 right-4 focus:outline-none"
              aria-label="Close Menu"
            >
              &times;
            </button>
            <nav className="mt-16 flex flex-col space-y-4">
              {['Home', 'Templates', 'About Us', 'Contact', 'Design'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white text-xl font-medium hover:text-cta transition duration-150 p-2 rounded-lg"
                >
                  {link}
                </a>
              ))}
            </nav>
            <div className="mt-8">
              <button className="w-full py-3 bg-cta text-white font-bold rounded-full shadow-lg hover:bg-cta/80 transition duration-150">
                Sign In
              </button>
            </div>
          </div>
        </div>

        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="text-2xl font-black text-primary tracking-wider">Dignlay</div>
            <nav className="hidden md:flex space-x-6 lg:space-x-10 items-center text-sm font-medium">
              {['Home', 'Templates', 'About Us', 'Contact', 'Design'].map((link) => (
                <a key={link} href="#" className="text-gray-600 hover:text-primary transition duration-150">
                  {link}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <button className="hidden md:block px-6 py-2 bg-cta text-white font-bold rounded-full shadow-xl hover:bg-cta/90 transition duration-150">
                Sign In
              </button>
              <button onClick={handleToggle} className="md:hidden text-primary focus:outline-none" aria-label="Open Menu">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-16 md:space-y-24">
          <section className="hero-section rounded-b-[4rem]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="hero-content grid gap-8 lg:grid-cols-[1fr,0.9fr] items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-primary/70 mb-4">Digital atelier</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
                    What do you want to design?
                  </h1>
                  <p className="text-base text-gray-700 mt-4 max-w-xl">
                    Invitations, keepsakes, or gifting experiences—Dignlay elevates every detail in a palette of
                    curated textures.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="px-10 py-3 bg-cta text-white font-bold rounded-full shadow-xl hover:bg-cta/90 transition duration-300 transform hover:translate-y-0.5">
                      Start Your Design
                    </button>
                    <button className="px-8 py-3 border border-primary text-primary font-semibold rounded-full hover:bg-primary/10 transition duration-300">
                      Explore Templates
                    </button>
                  </div>
                </div>
                <div className="hero-tiles">
                  {heroTiles.map((tile) => (
                    <article
                      key={tile.label}
                      className="hero-tile"
                      style={{ backgroundImage: `url('${tile.image}')` }}
                    >
                      <span>{tile.label}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-6 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="section-header text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-primary/70 mb-2">Palette</p>
                <h2 className="text-3xl font-bold text-primary">Digital Invitation</h2>
                <p className="text-base text-gray-600 mt-3 max-w-2xl mx-auto">
                  Choose a preset mood board and then personalize the typography, shimmer, and pacing of your RSVP.
                </p>
              </div>
              <div className="invitation-grid mt-12">
                {digitalInvitationTemplates.map((card) => (
                  <article key={card.label} className="invitation-card" style={{ backgroundColor: card.color }}>
                    <span className="text-sm text-gray-500 uppercase tracking-[0.3em]">{card.label}</span>
                    <p className="mt-6 text-xl font-semibold text-primary">{card.tone}</p>
                    <div className="mt-4 h-14 bg-white/60 rounded-2xl shadow-inner"></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-6 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="section-header text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-primary/70 mb-2">Complements</p>
                <h2 className="text-3xl font-bold text-primary">Wedding/Event Complements</h2>
                <p className="text-base text-gray-600 mt-3 max-w-2xl mx-auto">
                  Build a cohesive suite from thank-you notes to envelopes and program cards that match your palette.
                </p>
              </div>
              <div className="bento-grid mt-10">
                {weddingComplements.map((card) => (
                  <article
                    key={card.title}
                    className="wedding-card"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  >
                    <div className="wedding-card-overlay"></div>
                    <div className="wedding-card-content">
                      <h3 className="text-xl font-semibold">{card.title}</h3>
                      <p className="text-sm text-white/80 mt-2">{card.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-6 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="section-header text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-primary/70 mb-2">Packaging</p>
                <h2 className="text-3xl font-bold text-primary">Gift Packaging Essentials</h2>
                <p className="text-base text-gray-600 mt-3 max-w-2xl mx-auto">
                  Handpicked ribbons, wraps, and tags keep your gifting rituals memorable—delivered ready to style.
                </p>
              </div>
              <div className="packaging-row mt-10">
                {packagingSlides.map((item) => (
                  <article key={item.label} className="packaging-card">
                    <img src={item.image} alt={item.label} className="packaging-image" />
                    <p className="text-sm font-semibold text-gray-800 mt-4">{item.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-6 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="section-header text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-primary/70 mb-2">Corporate</p>
                <h2 className="text-3xl font-bold text-primary">Corporate Gifting</h2>
                <p className="text-base text-gray-600 mt-3 max-w-2xl mx-auto">
                  Bespoke desk and stationery sets with logo embossing options to impress your clients or teams.
                </p>
              </div>
              <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 mt-10">
                {corporateCards.map((card) => (
                  <article key={card.title} className="corporate-card">
                    <img src={card.image} alt={card.title} className="corporate-image" />
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-primary">{card.title}</h3>
                      <p className="text-sm text-gray-500">{card.tag}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-6 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="section-header text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-primary/70 mb-2">Kind words</p>
                <h2 className="text-3xl font-bold text-primary">Customer Love</h2>
                <p className="text-base text-gray-600 mt-3 max-w-2xl mx-auto">
                  Every review is a love letter to the papers, inks, and people who bring your vision to print.
                </p>
              </div>
              <div className="testimonial-grid mt-10">
                {testimonials.map((item) => (
                  <article key={item.title} className="testimonial-card">
                    <div className="text-yellow-500 text-lg mb-2">★★★★★</div>
                    <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-600 italic mt-3">{item.quote}</p>
                    <p className="mt-4 text-sm font-bold text-primary">- {item.author}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-white/20 pb-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <div className="tracking-wider mb-4">
                  <img src="/assets/img/digntag_logo 1.png" alt="Dignlay mark" />
                </div>
                <p className="text-sm text-white/80">Designing moments, crafted for you.</p>
              </div>
              <div>
                <h5 className="text-lg font-bold mb-4">Company</h5>
                <ul className="space-y-2 text-sm">
                  {['About Us', 'Careers', 'Press', 'Blog'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-cta transition duration-150">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-bold mb-4">Products</h5>
                <ul className="space-y-2 text-sm">
                  {['Invitations', 'Stationery', 'Packaging', 'Gift Registry'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-cta transition duration-150">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-bold mb-4">Support</h5>
                <ul className="space-y-2 text-sm">
                  {['FAQ', 'Contact Us', 'Shipping', 'Terms'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-cta transition duration-150">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h5 className="text-lg font-bold mb-4">Connect</h5>
                <div className="flex space-x-4">
                  {[
                    { label: 'Facebook', icon: 'M12 2.163...' },
                    { label: 'Instagram', icon: 'M12 2.163...' },
                  ].map((social) => (
                    <a key={social.label} href="#" className="text-white hover:text-cta transition duration-150" aria-label={social.label}>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-white/60 pt-8">
              &copy; <span id="current-year"></span> Dignlay. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
