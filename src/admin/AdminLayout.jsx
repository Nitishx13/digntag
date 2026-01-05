import React from 'react'
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

  if (!isAuthed()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  const onLogout = () => {
    clearSession()
    navigate('/admin/login', { replace: true })
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-[#faf7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
            <aside className="md:sticky md:top-10 h-fit">
              <nav className="space-y-1">
                <SidebarLink to="/admin/settings">Settings</SidebarLink>
                <SidebarLink to="/admin/events">My events</SidebarLink>
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
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
