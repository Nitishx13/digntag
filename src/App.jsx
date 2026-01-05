import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import HtmlPage from './HtmlPage.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import AdminEventsPage from './admin/AdminEventsPage.jsx'
import AdminSettingsPage from './admin/AdminSettingsPage.jsx'
import AdminEventNewPage from './admin/AdminEventNewPage.jsx'
import AdminEventSharePage from './admin/AdminEventSharePage.jsx'
import AdminEventGuestsPage from './admin/AdminEventGuestsPage.jsx'
import AdminWhatsappToolPage from './admin/AdminWhatsappToolPage.jsx'
import TrackPage from './admin/TrackPage.jsx'
import RsvpPage from './admin/RsvpPage.jsx'

function AdminShareRedirect() {
  const { id } = useParams()
  return <Navigate to={`/share/${id}`} replace />
}

function AdminGuestsRedirect() {
  const { id } = useParams()
  return <Navigate to={`/guests/${id}`} replace />
}

const routes = [
  { path: '/', file: 'index.html' },
  { path: '/features', file: 'features.html' },
  { path: '/events', file: 'events.html' },
  { path: '/events/wedding', file: 'events-wedding.html' },
  { path: '/events/birthday', file: 'events-birthday.html' },
  { path: '/events/baby', file: 'events-baby.html' },
  { path: '/events/corporate', file: 'events-corporate.html' },
  { path: '/events/valentines', file: 'events-valentines.html' },
  { path: '/how-it-works', file: 'how-it-works.html' },
  { path: '/pricing', file: 'pricing.html' },
  { path: '/templates', file: 'templates.html' },
  { path: '/faqs', file: 'faqs.html' },
  { path: '/gift-finder', file: 'gift-finder.html' },
]

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Navigate to="/admin/events" replace />} />

      <Route path="/share/:id" element={<AdminEventSharePage />} />
      <Route path="/guests/:id" element={<AdminEventGuestsPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="events" element={<AdminEventsPage />} />
        <Route path="events/new" element={<AdminEventNewPage />} />
        <Route path="events/:id/guests" element={<AdminGuestsRedirect />} />
        <Route path="events/:id/share" element={<AdminShareRedirect />} />
        <Route path="whatsapp" element={<AdminWhatsappToolPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route index element={<Navigate to="/admin/events" replace />} />
      </Route>
      <Route path="/track/:id" element={<TrackPage />} />
      <Route path="/rsvp/:id" element={<RsvpPage />} />
      {routes.map((r) => (
        <Route key={r.path} path={r.path} element={<HtmlPage file={r.file} />} />
      ))}
      <Route path="/index" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
