"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#fff7f2] flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#F6BCCE]/60 bg-white p-8 shadow-xl">
        <header className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">Sign up</p>
          <h1 className="text-3xl font-semibold text-[#3B1F1F]">Create your Digntag profile</h1>
          <p className="text-sm text-[#3B1F1F]/70">Start building your wedding presence and manage templates in one place.</p>
        </header>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="space-y-1 text-sm">
            <span className="text-[#3B1F1F]/80">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-2xl border border-[#F6BCCE] px-3 py-2 text-sm focus:border-[#3B1F1F] focus:outline-none"
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-[#3B1F1F]/80">Email address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-2xl border border-[#F6BCCE] px-3 py-2 text-sm focus:border-[#3B1F1F] focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-[#F6BCCE] to-[#F9CFC3] px-4 py-2 text-sm font-semibold text-[#3B1F1F] shadow-inner"
          >
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-[#3B1F1F]/70">
          Already have an account? <a className="font-semibold text-[#3B1F1F]" href="/login">Log in</a>
        </p>
      </section>
    </main>
  );
}
