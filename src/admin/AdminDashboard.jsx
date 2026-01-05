import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import {
  addRsvp,
  clearSession,
  createEvent,
  deleteEvent,
  ensureDefaultPassword,
  isAuthed,
  loadEvents,
  setPassword,
} from './store.js'

function formatTrackingLink(origin, publicId, token) {
  return `${origin}/track/${publicId}?token=${encodeURIComponent(token)}`
}

function formatRsvpLink(origin, publicId) {
  return `${origin}/rsvp/${publicId}`
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const origin = useMemo(() => window.location.origin, [])

  useEffect(() => {
    ensureDefaultPassword()
    setEvents(loadEvents())

    const onStorage = () => {
      setEvents(loadEvents())
    }

    const onEventsUpdated = () => {
      setEvents(loadEvents())
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener('digntag_events_updated', onEventsUpdated)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  if (!isAuthed()) {
    return <Navigate to="/admin/login" replace />
  }

  const onCreate = (e) => {
    e.preventDefault()
    const created = createEvent({ title, date })
    setEvents([created, ...events])
    setTitle('')
    setDate('')
  }

  const onLogout = () => {
    clearSession()
    navigate('/admin/login', { replace: true })
  }

  const onSetPassword = (e) => {
    e.preventDefault()
    if (!newPassword.trim()) return
    setPassword(newPassword.trim())
    setNewPassword('')
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-3xl font-extrabold text-primary">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Create events and share a tracking link.</p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex px-6 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
            >
              Logout
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
              <h2 className="text-xl font-extrabold text-primary">Create Event</h2>
              <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={onCreate}>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Event Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                    placeholder="e.g. Nikita's Birthday"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Event Date (optional)</label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                    placeholder="e.g. 14 Feb 2026"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center px-6 py-3 bg-cta text-white font-bold rounded-xl shadow-lg hover:bg-cta/90 transition duration-150"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
              <h2 className="text-xl font-extrabold text-primary">Admin Settings</h2>
              <form className="mt-6 space-y-4" onSubmit={onSetPassword}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Change Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                    placeholder="New password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center px-6 py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h2 className="text-xl font-extrabold text-primary">Your Events</h2>
                <p className="text-gray-600 mt-2">Tracking link is view-only and protected by a token.</p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {events.length === 0 ? (
                <div className="text-gray-600">No events yet.</div>
              ) : (
                events.map((e) => (
                  <EventRow
                    key={e.publicId}
                    event={e}
                    origin={origin}
                    onDelete={() => {
                      const next = deleteEvent(e.publicId)
                      setEvents(next)
                    }}
                    onAddRsvp={(payload) => {
                      const updated = addRsvp(e.publicId, payload)
                      if (!updated) return
                      setEvents((prev) => prev.map((x) => (x.publicId === updated.publicId ? updated : x)))
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

function EventRow({ event, origin, onDelete, onAddRsvp }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('yes')

  const trackingLink = formatTrackingLink(origin, event.publicId, event.trackingToken)
  const rsvpLink = formatRsvpLink(origin, event.publicId)

  const counts = useMemo(() => {
    const rsvps = Array.isArray(event.rsvps) ? event.rsvps : []
    return {
      yes: rsvps.filter((r) => r.status === 'yes').length,
      no: rsvps.filter((r) => r.status === 'no').length,
      maybe: rsvps.filter((r) => r.status === 'maybe').length,
      total: rsvps.length,
    }
  }, [event.rsvps])

  const onCopy = async () => {
    await navigator.clipboard.writeText(trackingLink)
  }

  const onCopyRsvp = async () => {
    await navigator.clipboard.writeText(rsvpLink)
  }

  const whatsappRsvpUrl = useMemo(() => {
    const text = encodeURIComponent(`RSVP: ${rsvpLink}`)
    return `https://wa.me/?text=${text}`
  }, [rsvpLink])

  const onSubmitRsvp = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAddRsvp({ name, phone, status })
    setName('')
    setPhone('')
    setStatus('yes')
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h3 className="text-lg font-extrabold text-primary">{event.title}</h3>
          {event.date ? <p className="text-gray-600 mt-1">{event.date}</p> : null}
          <p className="text-xs text-gray-500 mt-2">Public ID: {event.publicId}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={trackingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-5 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
          >
            Open Tracking
          </a>
          <a
            href={rsvpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-5 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
          >
            Open RSVP
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex px-5 py-2 bg-cta text-white font-bold rounded-full shadow-lg hover:bg-cta/90 transition duration-150"
          >
            Copy Link
          </button>
          <button
            type="button"
            onClick={onCopyRsvp}
            className="inline-flex px-5 py-2 bg-cta text-white font-bold rounded-full shadow-lg hover:bg-cta/90 transition duration-150"
          >
            Copy RSVP
          </button>
          <a
            href={whatsappRsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-5 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
          >
            WhatsApp RSVP
          </a>
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex px-5 py-2 bg-white text-red-600 font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">Live RSVPs</p>
          <p className="mt-1 text-xl font-extrabold text-primary">{counts.total}</p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">Yes</p>
          <p className="mt-1 text-xl font-extrabold text-primary">{counts.yes}</p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">Maybe</p>
          <p className="mt-1 text-xl font-extrabold text-primary">{counts.maybe}</p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">No</p>
          <p className="mt-1 text-xl font-extrabold text-primary">{counts.no}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h4 className="font-extrabold text-primary">Add RSVP (demo)</h4>
          <p className="text-gray-600 mt-2 text-sm">This updates live only in the same browser/device.</p>

          <form className="mt-5 space-y-3" onSubmit={onSubmitRsvp}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                placeholder="Guest name"
                required
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                placeholder="Phone (optional)"
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
            >
              <option value="yes">Yes</option>
              <option value="maybe">Maybe</option>
              <option value="no">No</option>
            </select>

            <button
              type="submit"
              className="w-full inline-flex justify-center px-6 py-3 bg-cta text-white font-bold rounded-xl shadow-lg hover:bg-cta/90 transition duration-150"
            >
              Add RSVP
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h4 className="font-extrabold text-primary">Guest List</h4>
          <div className="mt-4 space-y-2 max-h-64 overflow-auto">
            {(event.rsvps || []).length === 0 ? (
              <div className="text-gray-600 text-sm">No RSVPs yet.</div>
            ) : (
              (event.rsvps || []).map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <div>
                    <div className="text-sm font-bold text-gray-800">{r.name}</div>
                    {r.phone ? <div className="text-xs text-gray-500">{r.phone}</div> : null}
                  </div>
                  <div className="text-xs font-extrabold text-primary uppercase">{r.status}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
