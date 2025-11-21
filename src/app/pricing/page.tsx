export default function PricingPage() {
  const videoPackages = [
    {
      title: "Standard Video",
      price: "₹499",
      description: "We will personalize your video with:",
      items: [
        "Bride & Groom Names",
        "Parent’s & Family Details",
        "4 Functions (Eg. Wedding, Reception, Haldi, Mehndi)",
        "Includes 3 free corrections",
      ],
    },
    {
      title: "Premium Video",
      price: "₹799",
      description: "All Standard events + 2 extra functions",
      items: [
        "5 corrections allowed",
        "1 Free Invitation PDF",
        "Any custom song of your choice",
        "NOTE: Other languages incur ₹100 extra",
      ],
      highlight: true,
    },
  ];

  const pdfPackages = [
    {
      title: "Basic",
      price: "₹149",
      items: [
        "Access to all 300+ designs",
        "Unlimited edits",
        "15-day access",
      ],
    },
    {
      title: "Standard",
      price: "₹249",
      items: [
        "Access to all 300+ designs",
        "Unlimited edits",
        "30-day access",
      ],
    },
    {
      title: "Premium",
      price: "₹699",
      items: [
        "Access to all 300+ designs",
        "Unlimited edits",
        "90-day access",
      ],
      highlight: true,
    },
    {
      title: "Business",
      price: "Custom",
      items: ["Contact us directly"],
    },
  ];

  const revisionGuidelines = [
    "We’ll mention the total corrections included with each draft.",
    "Please share all your changes at once so we can revise efficiently.",
    "After every revision we’ll remind you how many edits remain.",
    "Extra edits beyond the limit cost ₹100 per correction.",
    "Changes requested after final delivery also cost ₹100 per correction and may delay timelines.",
    "Animation style is fixed—please review the sample video for motion reference.",
    "We only correct details provided via the form.",
    "Thank you for your cooperation and understanding 60a",
  ];

  return (
    <main className="bg-[#FFF7F2] min-h-screen py-16 text-[#3B1F1F]">
      <div className="mx-auto max-w-6xl px-4 space-y-16">
        <section className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#E78570]">Pricing</p>
          <h1 className="text-4xl font-bold">Choose the invitation kit that fits</h1>
          <p className="text-base text-[#3B1F1F]/70">
            Flexible packages for cinematic video invites and richly designed PDFs. Upgrade or extend anytime.
          </p>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#E78570]">
            <span role="img" aria-label="video">🎥</span>
            <span>Video Invitation Packages</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {videoPackages.map((pkg) => (
              <article
                key={pkg.title}
                className={`rounded-3xl border bg-white p-6 shadow-lg ${pkg.highlight ? "border-[#E78570] shadow-[#E78570]/30" : "border-[#FFE0D0]"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">{pkg.title}</h3>
                    <p className="text-sm text-[#3B1F1F]/70">{pkg.description}</p>
                  </div>
                  <span className="text-3xl font-bold text-[#E78570]">{pkg.price}</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#E78570]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="text-sm text-[#3B1F1F]/70 italic">NOTE: Other languages add ₹100 to the selected video package.</p>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#E78570]">
            <span role="img" aria-label="pdf">📄</span>
            <span>PDF Invitation Packages</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pdfPackages.map((pkg) => (
              <article
                key={pkg.title}
                className={`rounded-3xl border bg-white p-5 text-center shadow ${pkg.highlight ? "border-[#3B1F1F]" : "border-[#FFE0D0]"}`}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-[#3B1F1F]/60">{pkg.title}</p>
                <p className="mt-3 text-3xl font-bold text-[#E78570]">{pkg.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-left">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#E78570]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-[#FFE0D0] bg-white/90 p-6 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#E78570]">
            <span role="img" aria-label="guidelines">📝</span>
            <span>Revision & Delivery Guidelines (Videos Only)</span>
          </div>
          <ul className="space-y-3 text-sm text-[#3B1F1F]/80">
            {revisionGuidelines.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-0.5 text-[#E78570]">✓</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

     
    </main>
  );
}
