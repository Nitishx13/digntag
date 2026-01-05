import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent } from './store.js'

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? 'bg-emerald-500' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-1'}`}
      />
    </button>
  )
}

export default function AdminEventNewPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [deadline, setDeadline] = useState('')
  const [location, setLocation] = useState('')
  const [receiveContributions, setReceiveContributions] = useState(false)
  const [allowCompanions, setAllowCompanions] = useState(true)

  const onSubmit = (e) => {
    e.preventDefault()
    const created = createEvent({
      title,
      date,
      time,
      deadline,
      location,
      receiveContributions,
      allowCompanions,
    })
    navigate(`/admin/events/${created.publicId}/share`, { replace: true })
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-2xl font-extrabold text-primary text-center">Event data</h1>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
            placeholder="Ex: Birthday Barbecue"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
              placeholder="Date"
            />
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
              placeholder="00:00"
            />
          </div>

          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
            placeholder="Set deadline (optional)"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
            placeholder="Ex: Physical address or link"
          />

          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">Receive contributions</div>
              <Toggle checked={receiveContributions} onChange={setReceiveContributions} />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">Allow companions</div>
              <Toggle checked={allowCompanions} onChange={setAllowCompanions} />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full inline-flex justify-center px-6 py-3 bg-[#64c7cc] text-gray-900 font-extrabold rounded-2xl shadow-lg hover:opacity-90 transition duration-150"
          >
            Create link
          </button>
        </form>
      </div>
    </div>
  )
}
