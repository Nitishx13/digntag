import { Navigate, Route, Routes } from 'react-router-dom'
import HtmlPage from './HtmlPage.jsx'

const routes = [
  { path: '/', file: 'index.html' },
  { path: '/aboutus', file: 'aboutus.html' },
  { path: '/blog', file: 'blog.html' },
  { path: '/business-bulk-orders', file: 'business-bulk-orders.html' },
  { path: '/careers', file: 'careers.html' },
  { path: '/company', file: 'company.html' },
  { path: '/contact', file: 'contact.html' },
  { path: '/design', file: 'design.html' },
  { path: '/designers', file: 'designers.html' },
  { path: '/faq', file: 'faq.html' },
  { path: '/gift-registry', file: 'gift-registry.html' },
  { path: '/invitations', file: 'invitations.html' },
  { path: '/packaging', file: 'packaging.html' },
  { path: '/press', file: 'press.html' },
  { path: '/reviews', file: 'reviews.html' },
  { path: '/shipping', file: 'shipping.html' },
  { path: '/sitemap', file: 'sitemap.html' },
  { path: '/stationery', file: 'stationery.html' },
  { path: '/support', file: 'support.html' },
  { path: '/sustainability', file: 'sustainability.html' },
  { path: '/templates', file: 'templates.html' },
  { path: '/terms', file: 'terms.html' },
  { path: '/wholesale', file: 'wholesale.html' },
]

function App() {
  return (
    <Routes>
      {routes.map((r) => (
        <Route key={r.path} path={r.path} element={<HtmlPage file={r.file} />} />
      ))}
      <Route path="/index" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
