import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEventByPublicId } from './store.js'

function formatRsvpLink(origin, publicId) {
  return `${origin}/rsvp/${publicId}`
}

export default function AdminEventSharePage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const event = useMemo(() => getEventByPublicId(id), [id])
  const origin = useMemo(() => window.location.origin, [])

  const link = useMemo(() => (event ? formatRsvpLink(origin, event.publicId) : ''), [event, origin])

  const qrUrl = useMemo(() => {
    if (!link) return ''
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(link)}`
  }, [link])

  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(link)
    return `https://wa.me/?text=${text}`
  }, [link])

  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    if (!link) return
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 900)
  }

  if (!event) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="text-2xl font-extrabold text-primary">Event not found.</div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-2xl font-extrabold text-primary text-center">All set!</h1>
        <div className="text-center text-gray-600 mt-1">Now just share your link!</div>

        <button
          type="button"
          onClick={onCopy}
          className="mt-6 w-full flex items-center justify-between gap-3 rounded-2xl bg-gray-50 border border-gray-100 px-4 py-4"
        >
          <div className="truncate text-sm text-gray-700">{link}</div>
          <div className="text-sm font-bold text-primary">{copied ? 'Copied' : 'Copy'}</div>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full inline-flex justify-center px-6 py-3 bg-white text-emerald-600 font-bold rounded-full shadow-sm hover:bg-gray-50 transition duration-150 ring-1 ring-emerald-200"
        >
          Send on WhatsApp
        </a>

        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center px-6 py-3 bg-white text-primary font-bold rounded-full shadow-sm hover:bg-gray-50 transition duration-150 ring-1 ring-gray-200"
        >
          Named invitations
        </button>

        <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <div className="flex items-center gap-4">
            {qrUrl ? <img src={qrUrl} alt="QR" className="h-24 w-24 rounded-xl bg-white" /> : null}
            <div>
              <div className="text-sm text-gray-700">
                Add this QR Code to your <span className="font-bold">physical</span> or <span className="font-bold">digital</span> invitation
              </div>
              {qrUrl ? (
                <a
                  href={qrUrl}
                  download
                  className="mt-3 inline-flex items-center justify-center px-4 py-2 bg-white text-primary font-bold rounded-full shadow-sm hover:bg-gray-50 transition duration-150 ring-1 ring-gray-200"
                >
                  Download image
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        <div className="text-center font-extrabold text-primary">Will you receive more than 20 guests?</div>
        <div className="text-center text-gray-600 text-sm mt-1">Expand your event limit in seconds and without complications.</div>
        <button
          type="button"
          className="mt-4 w-full inline-flex justify-center px-6 py-3 text-white font-extrabold rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Increase limit
        </button>
      </div>

      <button
        type="button"
        onClick={() => navigate('/admin/events', { replace: false })}
        className="mt-4 w-full text-center text-primary font-semibold"
      >
        Manage event
      </button>
    </div>
  )
}
