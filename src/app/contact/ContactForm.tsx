"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';

export default function ContactForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await api.post<{ contact: { id: string } }>(
        '/api/contact',
        form
      );
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      setShowPopup(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to send message';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#FFE0D0] bg-[#F9CFC3]/60 p-6 shadow-inner">
      <h2 className="text-2xl font-semibold text-[#3B1F1F]">Send us a Message</h2>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {['First name', 'Last name'].map((label) => (
            <div key={label}>
              <label className="block text-xs font-semibold uppercase tracking-wide text-[#3B1F1F]/70">
                {label}
              </label>
              <input
                className="mt-1 w-full rounded-2xl border border-[#FFE0D0] bg-white/70 px-3 py-2 text-sm text-[#3B1F1F] shadow-sm focus:border-[#F6BCCE] focus:ring-2 focus:ring-[#F6BCCE]/50"
                type="text"
                placeholder={label}
                value={label === 'First name' ? form.firstName : form.lastName}
                onChange={(event) => handleChange(label === 'First name' ? 'firstName' : 'lastName', event.target.value)}
                required
              />
            </div>
          ))}
        </div>

        {['Email', 'Subject'].map((label) => (
          <div key={label}>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[#3B1F1F]/70">
              {label}
            </label>
            <input
              className="mt-1 w-full rounded-2xl border border-[#FFE0D0] bg-white/70 px-3 py-2 text-sm text-[#3B1F1F] shadow-sm focus:border-[#F6BCCE] focus:ring-2 focus:ring-[#F6BCCE]/50"
              type={label === 'Email' ? 'email' : 'text'}
              placeholder={label}
              value={label === 'Email' ? form.email : form.subject}
              onChange={(event) => handleChange(label === 'Email' ? 'email' : 'subject', event.target.value)}
              required={label === 'Email'}
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[#3B1F1F]/70">
            Message
          </label>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-2xl border border-[#FFE0D0] bg-white/70 px-3 py-2 text-sm text-[#3B1F1F] shadow-sm focus:border-[#F6BCCE] focus:ring-2 focus:ring-[#F6BCCE]/50"
            placeholder="Share your project details"
            value={form.message}
            onChange={(event) => handleChange('message', event.target.value)}
            required
          ></textarea>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-[#3B1F1F] px-4 py-3 text-sm font-semibold text-[#FFE0D0] shadow-lg transition hover:bg-[#4A1D1D] disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[#F6BCCE]/70 bg-white p-8 text-center shadow-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">Thank you</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#3B1F1F]">We received your message</h2>
            <p className="mt-2 text-sm text-[#3B1F1F]/80">
              Our team will reach out within <span className="font-semibold">24 hours</span>. Keep an eye on your inbox for the next update.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className="rounded-full border border-[#3B1F1F] px-5 py-2 text-sm font-semibold text-[#3B1F1F]"
              >
                Close
              </button>
              <button
                onClick={() => router.push('/thank-you')}
                className="rounded-full bg-[#3B1F1F] px-5 py-2 text-sm font-semibold text-[#FFE0D0]"
              >
                View details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
