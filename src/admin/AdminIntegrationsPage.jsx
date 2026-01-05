import React from 'react'

export default function AdminIntegrationsPage() {
  const integrations = [
    {
      name: 'WhatsApp Notify',
      description: 'Send invites and updates to your guest list (frontend-only simulation).',
      status: 'Available',
      href: '/admin/whatsapp',
      badgeClass: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    },
    {
      name: 'Google Sheets',
      description: 'Export guest list to Google Sheets (coming soon).',
      status: 'Coming soon',
      href: null,
      badgeClass: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
    },
    {
      name: 'Webhooks',
      description: 'Get real-time RSVP events to your server (coming soon).',
      status: 'Coming soon',
      href: null,
      badgeClass: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
    },
    {
      name: 'Zapier',
      description: 'Automate workflows with RSVP updates (coming soon).',
      status: 'Coming soon',
      href: null,
      badgeClass: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">Integrations</h1>
          <p className="text-gray-600 mt-2">Connect tools to manage invites and RSVPs faster.</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {integrations.map((i) => (
          <div key={i.name} className="rounded-2xl border border-gray-100 bg-[#faf7f5] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="text-lg font-extrabold text-primary">{i.name}</div>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${i.badgeClass}`}>
                    {i.status}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{i.description}</p>
              </div>
            </div>

            <div className="mt-5">
              {i.href ? (
                <a
                  href={i.href}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-primary ring-1 ring-gray-200 hover:bg-gray-50 transition"
                >
                  Open
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-gray-400 ring-1 ring-gray-200 cursor-not-allowed"
                >
                  Configure
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
