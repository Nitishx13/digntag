const EVENTS_KEY = 'digntag_events'
const SESSION_KEY = 'digntag_admin_session'
const PASSWORD_KEY = 'digntag_admin_password'
const SHAYARI_KEY = 'digntag_shayari_database'

const SESSION_TTL_MS = 1000 * 60 * 60 * 12

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
  const session = getSession()
  if (!session?.token) return false
  if (!session?.createdAt) return false
  const isValid = Date.now() - session.createdAt < SESSION_TTL_MS
  if (!isValid) {
    clearSession()
    return false
  }
  return true
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

export function createEvent({ title, date, time, deadline, location, receiveContributions, allowCompanions }) {
  const events = loadEvents()
  const publicId = crypto.randomUUID()
  const trackingToken = crypto.randomUUID()
  const event = {
    id: crypto.randomUUID(),
    title: String(title || '').trim(),
    date: String(date || '').trim(),
    time: String(time || '').trim(),
    deadline: String(deadline || '').trim(),
    location: String(location || '').trim(),
    receiveContributions: Boolean(receiveContributions),
    allowCompanions: Boolean(allowCompanions),
    createdAt: Date.now(),
    publicId,
    trackingToken,
    rsvps: [],
  }
  const next = [event, ...events]
  saveEvents(next)
  return event
}

export function deleteAccount() {
  localStorage.removeItem(EVENTS_KEY)
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(PASSWORD_KEY)
  window.dispatchEvent(new Event(EVENTS_UPDATED_EVENT))
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

// Shayari Management Functions
export function loadShayariDatabase() {
  const raw = localStorage.getItem(SHAYARI_KEY)
  if (!raw) {
    // Initialize with default database
    const defaultDatabase = {
      "Hindi": {
        "2": [
          "तेरे अज़ीज़ दोस्त, तेरे दिल में आती है।\n\nतुम मेरे दिल की धड़कन हो, तेरे बिना मेरे लिए जाते हो।"
        ],
        "4": [
          "तेरे आने से ज़िंदगी में एक नई रोशनी आई है।\n\nतेरी मुस्कान से हर पल तुम्हारा लगता है।\n\nतेरे हर खुशी मुस्कान में मेरा दिल बसता है।\n\nतेरे साथ हर लम्हा अधूर हो जाता है।"
        ],
        "8": [
          "तेरे आने से ज़िंदगी में एक नई सुबहा चमक आई है।\n\nतेरे अज़ बोट से हर पल तुम्हारा लगता है।\n\nतेरी मुस्कान से हर पल तुम्हारा लगता है।\n\nतेरे हर खुशी मुस्कान में मेरा दिल बसता है।\n\nतेरे साथ हर लम्हा अधूर हो जाता है।\n\nतेरे वज़ से मुझे को देखने का अहसास है।\n\nतेरे साथ हर लम्हा अधूर हो जाता है।"
        ]
      },
      "English": {
        "2": [
          "In quiet moments, thoughts of you arise,\nA gentle presence that lights up my skies."
        ],
        "4": [
          "Through changing tides, your hand I've known,\nA steady light, a comfort shown.\n\nWith every laugh, a spirit bright,\nYou make my world a better sight."
        ],
        "8": [
          "Through every season, calm or storm,\nYour steadfast presence lights my way.\n\nIn darkest hours, your love's warm embrace,\nA beacon shining through time and space.\n\nWhen shadows fall and doubts appear,\nYour whispered words dissolve all fear.\n\nThrough joy and sorrow, side by side,\nOur journey continues, hand in hand.\n\nIn morning light and evening's soft glow,\nYour love remains a constant, steady flame.\n\nAcross the years, our bond grows stronger still,\nA timeless treasure, beyond all measure."
        ]
      }
    }
    localStorage.setItem(SHAYARI_KEY, JSON.stringify(defaultDatabase))
    return defaultDatabase
  }
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function saveShayariDatabase(database) {
  localStorage.setItem(SHAYARI_KEY, JSON.stringify(database))
}

export function addShayari(language, lineCount, shayariText) {
  const database = loadShayariDatabase()
  const count = lineCount === '8' ? '8' : lineCount
  
  if (!database[language]) {
    database[language] = {}
  }
  
  if (!database[language][count]) {
    database[language][count] = []
  }
  
  const newShayari = {
    id: crypto.randomUUID(),
    text: shayariText.trim(),
    createdAt: Date.now()
  }
  
  database[language][count].push(newShayari.text)
  saveShayariDatabase(database)
  return newShayari
}

export function deleteShayari(language, lineCount, index) {
  const database = loadShayariDatabase()
  const count = lineCount === '8' ? '8' : lineCount
  
  if (database[language] && database[language][count]) {
    database[language][count].splice(index, 1)
    saveShayariDatabase(database)
  }
}
