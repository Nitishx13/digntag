import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadEvents } from './store.js'

function formatGuestsCount(event) {
  return Array.isArray(event?.rsvps) ? event.rsvps.length : 0
}

function formatRelativeDays(dateStr) {
  const ts = Date.parse(dateStr)
  if (!Number.isFinite(ts)) return ''
  const diffMs = ts - Date.now()
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return 'in 1 day'
  if (days > 1) return `in ${days} days`
  if (days === -1) return '1 day ago'
  return `${Math.abs(days)} days ago`
}

export default function AdminEventsPage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])

  useEffect(() => {
    setEvents(loadEvents())

    const onStorage = () => setEvents(loadEvents())
    const onEventsUpdated = () => setEvents(loadEvents())

    window.addEventListener('storage', onStorage)
    window.addEventListener('digntag_events_updated', onEventsUpdated)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const sorted = useMemo(() => {
    return [...events].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [events])

  return (
    <div>
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <h1 className="text-2xl font-extrabold text-primary">Events</h1>
        <button
          type="button"
          onClick={() => navigate('/admin/events/new')}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white text-primary font-bold rounded-full shadow-sm hover:bg-gray-50 transition duration-150 ring-1 ring-gray-200"
        >
          + Add
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {sorted.length === 0 ? (
          <div className="text-gray-600">No events yet.</div>
        ) : (
          sorted.map((e) => (
            <button
              key={e.publicId}
              type="button"
              onClick={() => navigate(`/admin/events/${e.publicId}/share`)}
              className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-lg font-extrabold text-primary">{e.title}</div>
                  <div className="mt-1 text-sm text-gray-600">👤 {formatGuestsCount(e)}</div>
                  <div className="mt-3 text-xs text-gray-500">{formatRelativeDays(e.date)}</div>
                </div>
                <div className="text-gray-400 text-xl leading-none">⋮</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
