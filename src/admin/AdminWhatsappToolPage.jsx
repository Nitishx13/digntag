import React, { useEffect, useMemo, useState } from 'react'
import { loadEvents } from './store.js'

const LOG_KEY = 'digntag_whatsapp_send_log'

function normalizePhoneForWa(phone) {
  const raw = String(phone || '').trim()
  if (!raw) return ''
  let digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.length === 10) digits = `91${digits}`
  return digits
}

function safeJsonParse(raw, fallback) {
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function buildDefaultMessage(event) {
  const title = String(event?.title || '').trim()
  const date = String(event?.date || '').trim()
  const time = String(event?.time || '').trim()
  const location = String(event?.location || '').trim()
  const when = [date, time].filter(Boolean).join(' ')
  const parts = []
  parts.push(title ? `You're invited to ${title}.` : "You're invited.")
  if (when) parts.push(`When: ${when}`)
  if (location) parts.push(`Where: ${location}`)
  return parts.join('\n')
}

export default function AdminWhatsappToolPage() {
  const [events, setEvents] = useState([])
  const [selectedEventId, setSelectedEventId] = useState('')
  const [message, setMessage] = useState('')
  const [imageDataUrl, setImageDataUrl] = useState('')
  const [statuses, setStatuses] = useState({})
  const [sending, setSending] = useState(false)
  const [log, setLog] = useState(() => safeJsonParse(localStorage.getItem(LOG_KEY) || '[]', []))

  useEffect(() => {
    const update = () => setEvents(loadEvents())
    update()
    window.addEventListener('digntag_events_updated', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('digntag_events_updated', update)
      window.removeEventListener('storage', update)
    }
  }, [])

  const selectedEvent = useMemo(() => events.find((e) => e.publicId === selectedEventId) || null, [events, selectedEventId])

  const guests = useMemo(() => {
    const list = Array.isArray(selectedEvent?.rsvps) ? selectedEvent.rsvps : []
    return [...list].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [selectedEvent])

  useEffect(() => {
    if (!selectedEvent) return
    setMessage((prev) => (prev ? prev : buildDefaultMessage(selectedEvent)))
    setStatuses({})
  }, [selectedEvent])

  const rsvpUrl = useMemo(() => {
    if (!selectedEvent) return ''
    return `${window.location.origin}/rsvp/${selectedEvent.publicId}`
  }, [selectedEvent])

  const onPickImage = (file) => {
    if (!file) {
      setImageDataUrl('')
      return
    }

    const reader = new FileReader()
    reader.onload = () => setImageDataUrl(String(reader.result || ''))
    reader.readAsDataURL(file)
  }

  const onSimulateSend = async () => {
    if (!selectedEvent) return

    const rows = guests
      .map((g) => ({ id: g.id, name: g.name, phone: g.phone, status: g.status }))
      .filter((g) => normalizePhoneForWa(g.phone))

    setSending(true)
    const nextStatuses = {}

    for (const g of rows) {
      nextStatuses[g.id] = 'sending'
      setStatuses((prev) => ({ ...prev, [g.id]: 'sending' }))
      await new Promise((r) => setTimeout(r, 180))
      nextStatuses[g.id] = 'queued'
      setStatuses((prev) => ({ ...prev, [g.id]: 'queued' }))
    }

    const entry = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      eventId: selectedEvent.publicId,
      eventTitle: selectedEvent.title,
      rsvpUrl,
      guestsCount: rows.length,
      hasImage: Boolean(imageDataUrl),
      messagePreview: String(message || '').slice(0, 160),
    }

    const nextLog = [entry, ...(Array.isArray(log) ? log : [])].slice(0, 50)
    localStorage.setItem(LOG_KEY, JSON.stringify(nextLog))
    setLog(nextLog)
    setSending(false)
  }

  const onOpenWhatsAppForGuest = (g) => {
    if (!selectedEvent) return
    const number = normalizePhoneForWa(g.phone)
    if (!number) return

    const text = [message, rsvpUrl].filter(Boolean).join('\n')
    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const onClearLog = () => {
    localStorage.removeItem(LOG_KEY)
    setLog([])
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">WhatsApp Notify</h1>
          <div className="text-gray-600 mt-1">Frontend tool only (Business API connection will be added later).</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="text-sm font-extrabold text-gray-800">1. Select event</div>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="mt-3 w-full rounded-2xl border border-gray-200 px-4 py-3"
          >
            <option value="">Select an event</option>
            {events.map((e) => (
              <option key={e.publicId} value={e.publicId}>
                {e.title}
              </option>
            ))}
          </select>

          <div className="mt-6 text-sm font-extrabold text-gray-800">2. Guest list</div>
          <div className="mt-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            {selectedEvent ? (
              <div className="text-sm text-gray-700">
                Guests: <span className="font-extrabold text-primary">{guests.length}</span>
              </div>
            ) : (
              <div className="text-sm text-gray-600">Select an event to view guests.</div>
            )}
          </div>

          {selectedEvent ? (
            <div className="mt-4 max-h-72 overflow-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-white sticky top-0">
                  <tr className="text-left">
                    <th className="px-4 py-3 text-gray-500 font-semibold">Guest</th>
                    <th className="px-4 py-3 text-gray-500 font-semibold">Phone</th>
                    <th className="px-4 py-3 text-gray-500 font-semibold">Notify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {guests.map((g) => {
                    const phoneOk = Boolean(normalizePhoneForWa(g.phone))
                    const st = statuses[g.id] || 'idle'
                    return (
                      <tr key={g.id}>
                        <td className="px-4 py-3 font-semibold text-gray-800">{g.name}</td>
                        <td className="px-4 py-3 text-gray-600">{g.phone || '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={!phoneOk}
                              onClick={() => onOpenWhatsAppForGuest(g)}
                              className={`px-3 py-1 rounded-full text-xs font-extrabold ring-1 ${
                                phoneOk
                                  ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100'
                                  : 'bg-gray-50 text-gray-400 ring-gray-200'
                              }`}
                            >
                              WhatsApp
                            </button>
                            <span className="text-xs text-gray-500">{st}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="text-sm font-extrabold text-gray-800">3. Message + Image</div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="mt-3 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
            placeholder="Type your WhatsApp message..."
          />

          <div className="mt-3 text-xs text-gray-500">
            RSVP link will be appended: <span className="font-semibold">{rsvpUrl || '—'}</span>
          </div>

          <div className="mt-5">
            <div className="text-sm font-extrabold text-gray-800">Invitation image</div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onPickImage(e.target.files && e.target.files[0])}
              className="mt-3 block w-full text-sm text-gray-700"
            />

            {imageDataUrl ? (
              <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <img src={imageDataUrl} alt="preview" className="w-full max-h-64 object-contain rounded-xl bg-white" />
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                No image selected.
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <button
              type="button"
              disabled={!selectedEvent || sending}
              onClick={onSimulateSend}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl font-extrabold shadow-lg transition duration-150 ${
                selectedEvent && !sending ? 'bg-cta text-white hover:bg-cta/90' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {sending ? 'Sending...' : 'Send notification (simulate)'}
            </button>

            <button
              type="button"
              disabled={!selectedEvent}
              onClick={async () => {
                const text = [message, rsvpUrl].filter(Boolean).join('\n')
                await navigator.clipboard.writeText(text)
              }}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl font-extrabold shadow-sm ring-1 transition duration-150 ${
                selectedEvent ? 'bg-white text-primary ring-gray-200 hover:bg-gray-50' : 'bg-gray-100 text-gray-400 ring-gray-200'
              }`}
            >
              Copy message
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-extrabold text-gray-800">Send log</div>
              <button
                type="button"
                onClick={onClearLog}
                className="text-sm font-extrabold text-primary hover:underline"
              >
                Clear
              </button>
            </div>

            <div className="mt-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              {Array.isArray(log) && log.length ? (
                <div className="space-y-3">
                  {log.map((l) => (
                    <div key={l.id} className="rounded-2xl bg-white border border-gray-100 p-4">
                      <div className="text-sm font-extrabold text-gray-900">{l.eventTitle}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(l.createdAt).toLocaleString()} • Guests: {l.guestsCount} • Image: {l.hasImage ? 'yes' : 'no'}
                      </div>
                      <div className="text-xs text-gray-600 mt-2">{l.messagePreview}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600">No sends yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
