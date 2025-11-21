"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#fff7f2] flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#F6BCCE]/60 bg-white p-8 shadow-xl">
        <header className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">Login</p>
          <h1 className="text-3xl font-semibold text-[#3B1F1F]">Welcome back</h1>
          <p className="text-sm text-[#3B1F1F]/70">Sign in to continue building your Digntag experience.</p>
        </header>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
          <label className="space-y-1 text-sm">
            <span className="text-[#3B1F1F]/80">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-2xl border border-[#F6BCCE] px-3 py-2 text-sm focus:border-[#3B1F1F] focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-[#F6BCCE] to-[#F9CFC3] px-4 py-2 text-sm font-semibold text-[#3B1F1F] shadow-inner"
          >
            Continue to dashboard
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-[#3B1F1F]/70">
          No account? <a className="font-semibold text-[#3B1F1F]" href="/signup">Create one</a>
        </p>
      </section>
    </main>
  );
}
