import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { createSession, ensureDefaultPassword, verifyPassword } from './store.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    ensureDefaultPassword()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!verifyPassword(password)) {
      setError('Invalid password')
      return
    }

    createSession()
    navigate('/admin/dashboard', { replace: true })
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h1 className="text-2xl font-extrabold text-primary">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter your admin password to continue.</p>

            <form className="mt-8 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cta/20"
                  placeholder="Enter password"
                />
              </div>

              {error ? <div className="text-sm text-red-600 font-semibold">{error}</div> : null}

              <button
                type="submit"
                className="w-full inline-flex justify-center px-6 py-3 bg-cta text-white font-bold rounded-xl shadow-lg hover:bg-cta/90 transition duration-150"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
