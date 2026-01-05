const EVENTS_KEY = 'digntag_events'
const SESSION_KEY = 'digntag_admin_session'
const PASSWORD_KEY = 'digntag_admin_password'

const EVENTS_UPDATED_EVENT = 'digntag_events_updated'

export function ensureDefaultPassword() {
  const existing = localStorage.getItem(PASSWORD_KEY)
  if (!existing) {
    localStorage.setItem(PASSWORD_KEY, 'admin')
  }
}

export function verifyPassword(password) {
  ensureDefaultPassword()
  return password === localStorage.getItem(PASSWORD_KEY)
}

export function setPassword(nextPassword) {
  localStorage.setItem(PASSWORD_KEY, nextPassword)
}

export function createSession() {
  const token = crypto.randomUUID()
  const session = { token, createdAt: Date.now() }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function isAuthed() {
  return Boolean(getSession()?.token)
}

export function loadEvents() {
  const raw = localStorage.getItem(EVENTS_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
  window.dispatchEvent(new Event(EVENTS_UPDATED_EVENT))
}

export function createEvent({ title, date }) {
  const events = loadEvents()
  const publicId = crypto.randomUUID()
  const trackingToken = crypto.randomUUID()
  const event = {
    id: crypto.randomUUID(),
    title: String(title || '').trim(),
    date: String(date || '').trim(),
    createdAt: Date.now(),
    publicId,
    trackingToken,
    rsvps: [],
  }
  const next = [event, ...events]
  saveEvents(next)
  return event
}

export function deleteEvent(publicId) {
  const events = loadEvents()
  const next = events.filter((e) => e.publicId !== publicId)
  saveEvents(next)
  return next
}

export function upsertEvent(nextEvent) {
  const events = loadEvents()
  const next = events.map((e) => (e.publicId === nextEvent.publicId ? nextEvent : e))
  saveEvents(next)
  return next
}

export function getEventByPublicId(publicId) {
  return loadEvents().find((e) => e.publicId === publicId) || null
}

export function addRsvp(publicId, { name, phone, status }) {
  const event = getEventByPublicId(publicId)
  if (!event) return null

  const next = {
    ...event,
    rsvps: [
      {
        id: crypto.randomUUID(),
        name: String(name || '').trim(),
        phone: String(phone || '').trim(),
        status: status || 'yes',
        createdAt: Date.now(),
      },
      ...(event.rsvps || []),
    ],
  }

  upsertEvent(next)
  return next
}
