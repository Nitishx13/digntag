import { Navigate, Route, Routes } from 'react-router-dom'
import HtmlPage from './HtmlPage.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import TrackPage from './admin/TrackPage.jsx'
import RsvpPage from './admin/RsvpPage.jsx'

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
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
