import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { addRsvp, getEventByPublicId } from './store.js'

export default function RsvpPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const event = useMemo(() => getEventByPublicId(id), [id])

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('yes')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!event) return

    addRsvp(id, { name, phone, status })
    setSubmitted(true)
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            {!event ? (
              <>
                <h1 className="text-2xl font-extrabold text-primary">RSVP</h1>
                <p className="text-gray-600 mt-2">Event not found.</p>
              </>
            ) : submitted ? (
              <>
                <h1 className="text-2xl font-extrabold text-primary">Thanks for your RSVP!</h1>
                <p className="text-gray-600 mt-2">Your response has been submitted.</p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => navigate('/', { replace: false })}
                    className="w-full inline-flex justify-center px-6 py-3 bg-cta text-white font-bold rounded-xl shadow-lg hover:bg-cta/90 transition duration-150"
                  >
                    Back to Home
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-extrabold text-primary">RSVP</h1>
                <p className="text-gray-600 mt-2">
                  {event.title}
                  {event.date ? ` • ${event.date}` : ''}
                </p>

                <form className="mt-8 space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Your Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Phone (optional)</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                      placeholder="Enter your phone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Response</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                    >
                      <option value="yes">Yes</option>
                      <option value="maybe">Maybe</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex justify-center px-6 py-3 bg-cta text-white font-bold rounded-xl shadow-lg hover:bg-cta/90 transition duration-150"
                  >
                    Submit RSVP
                  </button>

                  <p className="text-xs text-gray-500">
                    Note: This is a static demo. RSVPs update live on the admin dashboard only on the same device/browser.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
