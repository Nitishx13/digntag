import React, { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { clearSession, isAuthed } from './store.js'

function SidebarLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
          isActive ? 'bg-white text-primary shadow-sm ring-1 ring-gray-100' : 'text-gray-700 hover:bg-white/70'
        }`
      }
      end
    >
      {children}
    </NavLink>
  )
}

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!isAuthed()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  const onLogout = () => {
    clearSession()
    navigate('/admin/login', { replace: true })
  }

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-[#faf7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="md:hidden mb-6">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-primary shadow-sm ring-1 ring-gray-200"
            >
              <span className="text-lg leading-none">☰</span>
              Menu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
            <aside className="hidden md:block md:sticky md:top-10 h-fit">
              <nav className="space-y-1">
                <SidebarLink to="/admin/settings">Settings</SidebarLink>
                <SidebarLink to="/admin/events">My events</SidebarLink>
                <SidebarLink to="/admin/whatsapp">WhatsApp notify</SidebarLink>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/70 transition"
                >
                  Logout
                </button>
              </nav>

              <div className="mt-10 text-sm">
                <a
                  href="mailto:support@digntag.local"
                  className="inline-flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/70 transition"
                >
                  Help center
                </a>
              </div>
            </aside>

            <section>
              <Outlet />
            </section>
          </div>

          {mobileOpen ? (
            <div className="md:hidden fixed inset-0 z-[100]">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="absolute inset-0 z-40 bg-black/50"
              />

              <div className="absolute left-0 top-0 z-50 h-full w-[82%] max-w-sm bg-white shadow-xl ring-1 ring-black/5">
                <div className="p-5 flex items-center justify-between">
                  <div className="text-lg font-extrabold text-primary">Menu</div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-primary ring-1 ring-gray-200"
                  >
                    ✕
                  </button>
                </div>

                <div className="px-4">
                  <nav className="space-y-1">
                    <SidebarLink to="/admin/settings">Settings</SidebarLink>
                    <SidebarLink to="/admin/events">My events</SidebarLink>
                    <SidebarLink to="/admin/whatsapp">WhatsApp notify</SidebarLink>
                    <button
                      type="button"
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/70 transition"
                    >
                      Logout
                    </button>
                  </nav>

                  <div className="mt-10 text-sm">
                    <a
                      href="mailto:support@digntag.local"
                      className="inline-flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/70 transition"
                    >
                      Help center
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
