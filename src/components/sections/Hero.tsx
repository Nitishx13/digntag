"use client";
import React from "react";

type Props = {
  heading: string;
  sub?: string;
  accent?: string;
};

export function Hero({ heading, sub, accent = "#6C47FF" }: Props) {
  return (
    <section className="w-full rounded-xl border bg-white p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        <span style={{ color: accent }}>{heading}</span>
      </h1>
      {sub ? (
        <p className="mt-2 text-zinc-600">{sub}</p>
      ) : null}
    </section>
  );
}
