import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
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
  const [shayariDatabase, setShayariDatabase] = useState({})
  const [newShayari, setNewShayari] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi')
  const [selectedLineCount, setSelectedLineCount] = useState('4')
  const [shayariLoading, setShayariLoading] = useState(false)
  const [addShayariLoading, setAddShayariLoading] = useState(false)

  const origin = useMemo(() => window.location.origin, [])

  useEffect(() => {
    ensureDefaultPassword()
    setEvents(loadEvents())
    loadShayariFromDatabase()

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

  const loadShayariFromDatabase = async () => {
    setShayariLoading(true)
    try {
      console.log('Loading shayari from database...')
      const response = await fetch('/api/admin-shayari-manage')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      console.log('Shayari response:', result)
      if (result.success) {
        setShayariDatabase(result.data || {})
        console.log('Shayari database loaded:', result.data)
      } else {
        console.error('API returned error:', result.error)
      }
    } catch (error) {
      console.error('Error loading shayari:', error)
      // Set fallback empty database
      setShayariDatabase({})
    } finally {
      setShayariLoading(false)
    }
  }

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

  const onAddShayari = async (e) => {
    e.preventDefault()
    console.log('Add Shayari button clicked!')
    console.log('Form data:', { selectedLanguage, selectedLineCount, newShayari })
    
    if (!newShayari.trim()) {
      alert('Please enter shayari text')
      return
    }
    
    setAddShayariLoading(true)
    
    try {
      console.log('Sending request to API...')
      const response = await fetch('/api/admin-shayari-manage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          lineCount: selectedLineCount,
          text: newShayari
        })
      })
      
      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('API response:', result)
      
      if (result.success) {
        console.log('Shayari added successfully!')
        await loadShayariFromDatabase()
        setNewShayari('')
        alert('Shayari added successfully!')
      } else {
        console.error('API error:', result.error)
        alert('Error adding shayari: ' + result.error)
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Error adding shayari: ' + error.message)
    } finally {
      setAddShayariLoading(false)
    }
  }

  const onDeleteShayari = async (id) => {
    if (!confirm('Are you sure you want to delete this shayari?')) return
    
    try {
      const response = await fetch(`/api/admin-shayari-manage?id=${id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      if (result.success) {
        await loadShayariFromDatabase()
      } else {
        alert('Error deleting shayari: ' + result.error)
      }
    } catch (error) {
      console.error('Error deleting shayari:', error)
      alert('Error deleting shayari')
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-3xl font-extrabold text-primary">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your events and shayari database.</p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex px-6 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
            >
              Logout
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="mt-8 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => handleTabChange('events')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'events'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => handleTabChange('shayari')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'shayari'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Shayari Management
              </button>
              <button
                onClick={() => handleTabChange('settings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'settings'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>

          {/* Events Tab */}
          {activeTab === 'events' && (
            <>
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
                  <h2 className="text-xl font-extrabold text-primary">Quick Stats</h2>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Events</span>
                      <span className="font-bold text-primary">{events.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total RSVPs</span>
                      <span className="font-bold text-primary">
                        {events.reduce((sum, e) => sum + (e.rsvps?.length || 0), 0)}
                      </span>
                    </div>
                  </div>
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
            </>
          )}

          {/* Shayari Management Tab */}
          {activeTab === 'shayari' && (
            <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <h2 className="text-xl font-extrabold text-primary">Shayari Management</h2>
                  <p className="text-gray-600 mt-2">Add and manage shayari for the poetry generator.</p>
                </div>
                <button
                  type="button"
                  onClick={loadShayariFromDatabase}
                  className="inline-flex px-4 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
                  disabled={shayariLoading}
                >
                  {shayariLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-extrabold text-primary">Add New Shayari</h3>
                  <form className="mt-4 space-y-4" onSubmit={onAddShayari}>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Language</label>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                      >
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Line Count</label>
                      <select
                        value={selectedLineCount}
                        onChange={(e) => setSelectedLineCount(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                      >
                        <option value="2">2 Lines</option>
                        <option value="4">4 Lines</option>
                        <option value="8">8 Lines</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Shayari Text</label>
                      <textarea
                        value={newShayari}
                        onChange={(e) => setNewShayari(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                        rows={6}
                        placeholder="Enter shayari here... Use \n\n for paragraph breaks"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center px-6 py-3 bg-cta text-white font-bold rounded-xl shadow-lg hover:bg-cta/90 transition duration-150 disabled:opacity-50"
                      disabled={addShayariLoading}
                    >
                      {addShayariLoading ? 'Adding...' : 'Add Shayari'}
                    </button>
                  </form>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-extrabold text-primary">Current Shayari Database</h3>
                  <div className="mt-4 space-y-4 max-h-96 overflow-auto">
                    {shayariLoading ? (
                      <div className="text-gray-600">Loading shayari database...</div>
                    ) : Object.keys(shayariDatabase).length === 0 ? (
                      <div className="text-gray-600">No shayari in database yet.</div>
                    ) : (
                      Object.keys(shayariDatabase).map((language) => (
                        <div key={language} className="border border-gray-200 rounded-xl p-4 bg-white">
                          <h4 className="font-bold text-primary">{language}</h4>
                          {Object.keys(shayariDatabase[language]).map((lineCount) => (
                            <div key={lineCount} className="mt-3">
                              <h5 className="text-sm font-semibold text-gray-700">{lineCount === '8' ? '8 Lines' : `${lineCount} Lines`}</h5>
                              <div className="mt-2 space-y-2">
                                {shayariDatabase[language][lineCount].map((shayari) => (
                                  <div key={shayari.id} className="flex items-start justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                                    <div className="flex-1">
                                      <p className="text-sm text-gray-800 whitespace-pre-line">{shayari.text}</p>
                                      <p className="text-xs text-gray-500 mt-1">Added: {new Date(shayari.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => onDeleteShayari(shayari.id)}
                                      className="text-red-600 hover:text-red-800 text-sm font-bold"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
              <h2 className="text-xl font-extrabold text-primary">Admin Settings</h2>
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-extrabold text-primary mb-4">Change Password</h3>
                  <form className="space-y-4" onSubmit={onSetPassword}>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                        placeholder="Enter new password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center px-6 py-3 bg-cta text-white font-bold rounded-xl shadow-lg hover:bg-cta/90 transition duration-150"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="font-extrabold text-primary mb-4">Database Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shayari Count</span>
                      <span className="font-bold text-primary">
                        {Object.values(shayariDatabase).reduce((sum, lang) => 
                          sum + Object.values(lang).reduce((langSum, count) => 
                            langSum + count.length, 0), 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Languages</span>
                      <span className="font-bold text-primary">{Object.keys(shayariDatabase).length}</span>
                    </div>
                    <button
                      type="button"
                      onClick={loadShayariFromDatabase}
                      className="w-full inline-flex justify-center px-6 py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
                      disabled={shayariLoading}
                    >
                      {shayariLoading ? 'Refreshing...' : 'Refresh Database'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
