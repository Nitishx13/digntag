import { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';

import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Digntag',
  description: 'Get in touch with the Digntag team. We\'re here to help with any questions about our digital identity solutions.',
};

const info = [
  {
    title: 'Our Office',
    description: '123 Business Avenue, New York, NY 10001',
    icon: MapPin
  },
  {
    title: 'Email Us',
    description: 'info@digntag.com\nsupport@digntag.com',
    icon: Mail
  },
  {
    title: 'Call Us',
    description: '+1 (555) 123-4567\nMon – Fri, 9am – 6pm EST',
    icon: Phone
  }
];

export default function ContactPage() {
  return (
    <main className="bg-[#FFE0D0] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#F6BCCE]/60 bg-white/80 p-10 shadow-xl backdrop-blur">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#3B1F1F]/60">Connect</p>
            <h1 className="mt-4 text-4xl font-extrabold text-[#3B1F1F] sm:text-5xl lg:text-6xl">
              Contact <span className="text-[#F6BCCE]">Digntag</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-[#3B1F1F]/80">
              We’d love to hear from you—share questions, feedback, or brand ideas and we’ll respond soon.
            </p>
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-[#FFE0D0] bg-white p-8 shadow-lg md:grid-cols-2">
          <div className="space-y-6">
            {info.map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-[#F6BCCE]/70 bg-[#FFE0D0] p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F6BCCE] text-xl text-[#3B1F1F]">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3B1F1F]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#3B1F1F]/80 whitespace-pre-line">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <ContactForm />
        </section>
      </div>
    </main>
  );
}
