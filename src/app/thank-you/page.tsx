export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#fff7f2] py-16">
      <section className="mx-auto max-w-3xl rounded-3xl border border-[#F6BCCE]/70 bg-white p-10 text-center shadow-xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[#3B1F1F]/60">Submission received</p>
        <h1 className="mt-4 text-4xl font-semibold text-[#3B1F1F]">Thank you for sharing your brief</h1>
        <p className="mt-3 text-sm text-[#3B1F1F]/70">
          Our design producers have your form and are already reviewing the details. Expect a personalised update in your inbox soon.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#FFE0D0] bg-[#FFF8F3] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF6B92]">ETA</p>
            <p className="mt-2 text-2xl font-semibold text-[#3B1F1F]">2-3 days</p>
            <p className="mt-1 text-xs text-[#3B1F1F]/70">Typical delivery window</p>
          </div>
          <div className="rounded-2xl border border-[#FFE0D0] bg-[#FFF8F3] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF6B92]">Next step</p>
            <p className="mt-2 text-base font-semibold text-[#3B1F1F]">Designer review</p>
            <p className="mt-1 text-xs text-[#3B1F1F]/70">We refine your brief & schedule</p>
          </div>
          <div className="rounded-2xl border border-[#FFE0D0] bg-[#FFF8F3] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF6B92]">Check inbox</p>
            <p className="mt-2 text-base font-semibold text-[#3B1F1F]">Confirmation mail</p>
            <p className="mt-1 text-xs text-[#3B1F1F]/70">All status updates arrive there</p>
          </div>
        </div>

        <div className="mt-10 space-y-3 text-sm text-[#3B1F1F]/80">
          <p>Need edits? Reply to the confirmation email or drop us a note via the Help button in your dashboard.</p>
          <p>Urgent timelines? Mention it in the reply and we will do our best to accommodate the schedule.</p>
        </div>

        <a
          href="/dashboard"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#3B1F1F] px-6 py-3 text-sm font-semibold text-[#FFE0D0]"
        >
          Back to dashboard
        </a>
      </section>
    </main>
  );
}
