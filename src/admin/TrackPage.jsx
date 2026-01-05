import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { getEventByPublicId, loadEvents } from './store.js'

export default function TrackPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const token = params.get('token') || ''

  const [event, setEvent] = useState(() => getEventByPublicId(id))

  useEffect(() => {
    const onStorage = () => {
      setEvent(getEventByPublicId(id))
    }

    const onEventsUpdated = () => {
      setEvent(getEventByPublicId(id))
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener('digntag_events_updated', onEventsUpdated)
    return () => window.removeEventListener('storage', onStorage)
  }, [id])

  const isValid = useMemo(() => {
    if (!event) return false
    return token && token === event.trackingToken
  }, [event, token])

  const counts = useMemo(() => {
    const rsvps = Array.isArray(event?.rsvps) ? event.rsvps : []
    return {
      yes: rsvps.filter((r) => r.status === 'yes').length,
      no: rsvps.filter((r) => r.status === 'no').length,
      maybe: rsvps.filter((r) => r.status === 'maybe').length,
      total: rsvps.length,
    }
  }, [event])

  const shareUrl = useMemo(() => window.location.href, [])

  const onCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
  }

  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(`Event tracking link: ${shareUrl}`)
    return `https://wa.me/?text=${text}`
  }, [shareUrl])

  if (!event) {
    const any = loadEvents().length
    return (
      <>
        <SiteHeader />
        <main className="min-h-[70vh] bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h1 className="text-2xl font-extrabold text-primary">Tracking Link</h1>
              <p className="text-gray-600 mt-2">Event not found.</p>
              {any ? <p className="text-gray-500 mt-4 text-sm">Ask admin to share a valid tracking link.</p> : null}
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  if (!isValid) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h1 className="text-3xl font-extrabold text-primary">{event.title}</h1>
                {event.date ? <p className="text-gray-600 mt-2">{event.date}</p> : null}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onCopy}
                  className="inline-flex px-6 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
                >
                  Copy Link
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-6 py-2 bg-cta text-white font-bold rounded-full shadow-lg hover:bg-cta/90 transition duration-150"
                >
                  Share WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-500">Share</p>
                <p className="mt-1 text-lg font-extrabold text-primary">Tracking Link</p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-500">WhatsApp Ready</p>
                <p className="mt-1 text-lg font-extrabold text-primary">One Tap Share</p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-500">Live RSVPs</p>
                <p className="mt-1 text-lg font-extrabold text-primary">{counts.total}</p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-500">Manage</p>
                <p className="mt-1 text-lg font-extrabold text-primary">Guest Lists</p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
                <h2 className="text-xl font-extrabold text-primary">Live RSVP Status</h2>
                <p className="text-gray-600 mt-2">This updates live only when admin adds RSVPs from the same browser/device.</p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p className="text-sm font-semibold text-gray-500">Yes</p>
                    <p className="mt-1 text-2xl font-extrabold text-primary">{counts.yes}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p className="text-sm font-semibold text-gray-500">Maybe</p>
                    <p className="mt-1 text-2xl font-extrabold text-primary">{counts.maybe}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p className="text-sm font-semibold text-gray-500">No</p>
                    <p className="mt-1 text-2xl font-extrabold text-primary">{counts.no}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p className="text-sm font-semibold text-gray-500">Total</p>
                    <p className="mt-1 text-2xl font-extrabold text-primary">{counts.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
                <h2 className="text-xl font-extrabold text-primary">Guest List (hidden)</h2>
                <p className="text-gray-600 mt-2">For static demo, this page shows only counts. Guest names are admin-only.</p>
                <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-100 p-5 text-gray-600">
                  View-only tracking
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
