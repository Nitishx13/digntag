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

const bentoCards = [
  {
    title: 'Thank You & RSVP Stationary Cards',
    image: '/assets/img/wed2.png',
    classes: '',
  },
  {
    title: 'Small Manual Program Cards',
    image: '/assets/img/wed3.png',
    classes: 'bento-item-tall',
  },
  {
    title: 'Small Manual Program Cards',
    image: '/assets/img/wed4.png',
    classes: '',
  },
  {
    title: 'Custom Envelope Liners',
    image: '/assets/img/wed5.png',
    classes: '',
  },
  {
    title: 'Custom Envelope Liners',
    image: '/assets/img/wed1.png',
    classes: '',
  },
];

const corporateCards = [
  { title: 'Sleek Notebook', image: '/assets/img/cop1.png' },
  { title: 'Premium Pens', image: '/assets/img/cop2.png' },
  { title: 'Custom Planner', image: '/assets/img/cop3.png' },
  { title: 'Sleek Tech Accessory', image: '/assets/img/cop4.png' },
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
    quote: 'The colors on the digital invitations were vibrant and the paper stock for the complement cards felt luxurious.',
    author: 'Jennifer L.',
  },
  {
    title: 'Best Quality Prints',
    quote: 'The colors on the digital invitations were vibrant and the paper stock for the complement cards felt luxurious.',
    author: 'Jennifer L.',
  },
  {
    title: 'Best Quality Prints',
    quote: 'The colors on the digital invitations were vibrant and the paper stock for the complement cards felt luxurious.',
    author: 'Jennifer L.',
  },
];

const invitationCards = [
  { label: 'Minimalist', palette: '/assets/img/digntag_slider_1.png' },
  { label: 'Floral Script', palette: '/assets/img/digntag_slider_2.png' },
  { label: 'Art Deco', palette: '/assets/img/digntag_slider_3.png' },
  { label: 'Watercolor', palette: '/assets/img/digntag_slider_4.png' },
  { label: 'Modern Text', palette: '/assets/img/digntag_slider_5.png' },
];

export default function Home() {
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

      <div className="text-gray-800">
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

        <header className="sticky top-0 z-40 bg-white shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="text-2xl font-black text-primary tracking-wider">Dignlay</div>
            <nav className="hidden md:flex space-x-6 lg:space-x-10 items-center">
              {['Home', 'Templates', 'About Us', 'Contact', 'Design'].map((link) => (
                <a key={link} href="#" className="text-gray-600 hover:text-primary transition duration-150 font-medium">
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

        <main>
          <section
            className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden h-96 w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/img/herosection.jpg')" }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 lg:w-2/5 z-10 text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-8 leading-tight">
                  What do you want to design?
                </h1>
                <button className="px-10 py-4 bg-cta text-white font-bold text-lg rounded-full shadow-xl hover:bg-cta/90 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cta/50">
                  Start Your Design
                </button>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-primary mb-12">Digital Invitation</h2>
              <div id="invitation-carousel" className="owl-carousel owl-theme relative px-8">
                {invitationSlides.map((item) => (
                  <div key={item.label} className="item block bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 cursor-pointer">
                    <img src={item.image} alt={`Digital Invitation Design ${item.label}`} className="w-full h-auto object-cover" />
                    <div className="p-3 text-center">
                      <p className="text-sm font-medium text-gray-700">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
              <h2 className="text-3xl font-bold text-center text-primary mb-12">Wedding/Event Complements</h2>
              <div className="bento-grid">
                {bentoCards.map((card) => (
                  <div
                    key={card.title}
                    className={`${card.classes} bg-white rounded-xl shadow-xl overflow-hidden p-6 md:p-8 flex flex-col justify-end h-64 md:h-72 relative transition hover:scale-[1.02] duration-300`}
                    style={{ backgroundImage: `url('${card.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div className="absolute inset-0 bg-primary/40 rounded-xl"></div>
                    <p className="relative z-10 text-xl font-semibold text-white">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-primary mb-12">Gift Packaging Essentials</h2>
              <div id="packaging-carousel" className="owl-carousel owl-theme relative px-8">
                {packagingSlides.map((item) => (
                  <div key={item.label} className="item group block bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer">
                    <img src={item.image} alt={item.label} className="w-full h-60 object-cover" />
                    <div className="p-4 text-center">
                      <p className="text-base text-gray-700">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-primary mb-4">Corporate Gifting</h2>
              <p className="text-xl text-center text-gray-600 mb-12">Office Essentials Gift</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {corporateCards.map((card) => (
                  <div key={card.title} className="bg-white rounded-xl shadow-lg p-3 text-center hover:shadow-xl transition duration-300 cursor-pointer">
                    <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-lg mb-3" />
                    <p className="text-sm font-medium text-gray-700">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-primary mb-12">Customer Love</h2>
              <div className="flex overflow-x-auto pb-4 space-x-6 md:grid md:grid-cols-3 md:gap-6">
                {testimonials.map((item, index) => (
                  <div key={`${item.author}-${index}`} className="flex-shrink-0 w-80 md:w-full bg-white p-6 rounded-xl shadow-lg border-t-4 border-cta/70">
                    <div className="flex items-center mb-4">
                      <span className="text-yellow-500 text-xl mr-2">★★★★★</span>
                      <p className="text-sm font-semibold text-gray-700">{item.title}</p>
                    </div>
                    <p className="text-gray-600 italic line-clamp-3">{item.quote}</p>
                    <p className="mt-4 text-sm font-bold text-primary">- {item.author}</p>
                  </div>
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
