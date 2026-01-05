import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEventByPublicId, loadEvents } from './store.js'

function statusBadgeClasses(status) {
  if (status === 'yes') return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
  if (status === 'maybe') return 'bg-amber-50 text-amber-700 ring-amber-200'
  if (status === 'no') return 'bg-rose-50 text-rose-700 ring-rose-200'
  return 'bg-gray-50 text-gray-700 ring-gray-200'
}

function formatStatus(status) {
  if (status === 'yes') return 'Yes'
  if (status === 'maybe') return 'Maybe'
  if (status === 'no') return 'No'
  return String(status || '').toUpperCase() || '-'
}

export default function AdminEventGuestsPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [query, setQuery] = useState('')

  const [event, setEvent] = useState(() => getEventByPublicId(id))

  useEffect(() => {
    const onStorage = () => setEvent(getEventByPublicId(id))
    const onEventsUpdated = () => setEvent(getEventByPublicId(id))

    window.addEventListener('storage', onStorage)
    window.addEventListener('digntag_events_updated', onEventsUpdated)
    return () => window.removeEventListener('storage', onStorage)
  }, [id])

  const guests = useMemo(() => {
    const list = Array.isArray(event?.rsvps) ? event.rsvps : []
    return [...list].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [event])

  const filteredGuests = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return guests
    return guests.filter((g) => {
      const name = String(g?.name || '').toLowerCase()
      const phone = String(g?.phone || '').toLowerCase()
      return name.includes(q) || phone.includes(q)
    })
  }, [guests, query])

  const counts = useMemo(() => {
    const list = Array.isArray(event?.rsvps) ? event.rsvps : []
    return {
      total: list.length,
      yes: list.filter((r) => r.status === 'yes').length,
      maybe: list.filter((r) => r.status === 'maybe').length,
      no: list.filter((r) => r.status === 'no').length,
    }
  }, [event])

  if (!event) {
    const any = loadEvents().length
    return (
      <div className="min-h-[70vh] bg-[#faf7f5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <div className="text-2xl font-extrabold text-primary">Guest list</div>
            <div className="text-gray-600 mt-2">Event not found.</div>
            {any ? <div className="text-gray-500 mt-4 text-sm">Open an event from your events list.</div> : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] bg-[#faf7f5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-start justify-between gap-6">
              <div>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm ring-1 ring-gray-200"
                >
                  <span className="text-base leading-none">‹</span>
                  Back
                </button>
                <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-primary">{event.title}</h1>
                <div className="text-gray-600 mt-1">Guest list</div>
              </div>

              <div className="hidden sm:block text-right">
                <div className="text-sm font-semibold text-gray-600">Total guests</div>
                <div className="text-3xl font-extrabold text-primary">{counts.total}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl bg-white/80 border border-white px-4 py-3 shadow-sm">
                <div className="text-xs text-gray-500 font-semibold">Total</div>
                <div className="text-lg font-extrabold text-primary">{counts.total}</div>
              </div>
              <div className="rounded-2xl bg-white/80 border border-white px-4 py-3 shadow-sm">
                <div className="text-xs text-gray-500 font-semibold">Yes</div>
                <div className="text-lg font-extrabold text-emerald-700">{counts.yes}</div>
              </div>
              <div className="rounded-2xl bg-white/80 border border-white px-4 py-3 shadow-sm">
                <div className="text-xs text-gray-500 font-semibold">Maybe</div>
                <div className="text-lg font-extrabold text-amber-700">{counts.maybe}</div>
              </div>
              <div className="rounded-2xl bg-white/80 border border-white px-4 py-3 shadow-sm">
                <div className="text-xs text-gray-500 font-semibold">No</div>
                <div className="text-lg font-extrabold text-rose-700">{counts.no}</div>
              </div>
            </div>

            <div className="mt-5">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                placeholder="Search guest name or phone"
              />
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {filteredGuests.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-gray-700">
                {guests.length === 0 ? 'No guests yet.' : 'No guests match your search.'}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredGuests.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-primary font-extrabold">
                        {String(g.name || '?').trim().slice(0, 1).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-gray-900 truncate">{g.name}</div>
                        <div className="text-xs text-gray-500 truncate">{g.phone || '—'}</div>
                      </div>
                    </div>

                    <div
                      className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${statusBadgeClasses(
                        g.status,
                      )}`}
                    >
                      {formatStatus(g.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
