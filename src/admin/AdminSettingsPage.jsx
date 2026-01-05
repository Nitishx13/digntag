import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearSession, deleteAccount, setPassword } from './store.js'

export default function AdminSettingsPage() {
  const navigate = useNavigate()
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [language, setLanguage] = useState('en')

  const email = useMemo(() => 'admin@digntag.local', [])

  const onLogout = () => {
    clearSession()
    navigate('/admin/login', { replace: true })
  }

  const onSavePassword = (e) => {
    e.preventDefault()
    if (!newPassword.trim()) return
    setPassword(newPassword.trim())
    setNewPassword('')
    setShowChangePassword(false)
  }

  const onDelete = () => {
    deleteAccount()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => navigate(-1)} className="text-primary font-extrabold">
          ‹
        </button>
        <h1 className="text-2xl font-extrabold text-primary">Settings</h1>
      </div>

      <div className="mt-8 max-w-xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-primary text-2xl">👤</div>
          <div className="mt-4 text-sm text-gray-600">{email}</div>

          <button
            type="button"
            onClick={() => setShowChangePassword((v) => !v)}
            className="mt-3 inline-flex px-5 py-2 bg-white text-primary font-bold rounded-full shadow-sm hover:bg-gray-50 transition duration-150 ring-1 ring-gray-200"
          >
            Change password
          </button>

          {showChangePassword ? (
            <form className="mt-4 w-full space-y-3" onSubmit={onSavePassword}>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                placeholder="New password"
              />
              <button
                type="submit"
                className="w-full inline-flex justify-center px-6 py-3 bg-cta text-white font-bold rounded-2xl shadow-lg hover:bg-cta/90 transition duration-150"
              >
                Save
              </button>
            </form>
          ) : null}
        </div>

        <div className="mt-10">
          <div className="text-sm text-gray-400">Preferences</div>

          <div className="mt-4 border border-gray-100 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="text-sm font-semibold text-gray-700">Language</div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="en">English</option>
              </select>
            </div>
            <div className="h-px bg-gray-100" />
            <button type="button" onClick={onLogout} className="w-full flex items-center justify-between px-4 py-4">
              <div className="text-sm font-semibold text-gray-700">Logout</div>
            </button>
          </div>

          <button
            type="button"
            onClick={onDelete}
            className="mt-6 w-full inline-flex justify-center px-6 py-3 bg-white text-red-500 font-bold rounded-2xl shadow-sm hover:bg-gray-50 transition duration-150 ring-1 ring-red-200"
          >
            Delete my account
          </button>
        </div>
      </div>
    </div>
  )
}
