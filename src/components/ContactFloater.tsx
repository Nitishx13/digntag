"use client";

import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';

const PHONE = '887766554433';
const telHref = `tel:${PHONE}`;
const whatsappHref = `https://wa.me/${PHONE}`;

export function ContactFloater() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 text-sm font-semibold">
      <span className="rounded-full bg-white/90 px-4 py-2 text-[#3B1F1F] shadow">Call or WhatsApp {PHONE}</span>
      <Link
        href={telHref}
        className="inline-flex items-center gap-2 rounded-full bg-[#3B1F1F] px-4 py-2 text-[#FFE0D0] shadow-lg"
      >
        <Phone className="h-4 w-4" />
        Call Us
      </Link>
      <Link
        href={whatsappHref}
        target="_blank"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white shadow-lg"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </Link>
    </div>
  );
}
