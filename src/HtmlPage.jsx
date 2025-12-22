import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function normalizeRoutePathFromHtmlHref(href) {
  if (!href) return null

  const trimmed = href.trim()

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return null
  }

  if (trimmed.startsWith('#')) return null

  const withoutQuery = trimmed.split('?')[0].split('#')[0]
  const withoutLeading = withoutQuery.replace(/^\.\//, '').replace(/^\//, '')

  if (!withoutLeading.endsWith('.html')) return null

  const filename = withoutLeading
  if (filename.toLowerCase() === 'index.html') return '/'

  const route = '/' + filename.replace(/\.html$/i, '')
  return route
}

function rewriteInternalHtmlLinksToRoutes(html) {
  if (!html) return html

  return html
    .replace(/href=("|')\.\/index\.html\1/gi, 'href="/"')
    .replace(/href=("|')\.\/([a-z0-9\-]+)\.html\1/gi, 'href="/$2"')
    .replace(/href=("|')index\.html\1/gi, 'href="/"')
    .replace(/href=("|')([a-z0-9\-]+)\.html\1/gi, 'href="/$2"')
}

function stripScriptTagsFromBody(doc) {
  const scripts = doc.querySelectorAll('script')
  scripts.forEach((s) => s.remove())
}

export default function HtmlPage({ file }) {
  const [html, setHtml] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const containerRef = useRef(null)

  const isHome = useMemo(() => file === 'index.html', [file])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setError(null)
      try {
        const res = await fetch(`/original/${file}`, { cache: 'no-cache' })
        if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`)
        const text = await res.text()

        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        stripScriptTagsFromBody(doc)

        const bodyHtml = doc.body ? doc.body.innerHTML : text
        const rewritten = rewriteInternalHtmlLinksToRoutes(bodyHtml)

        if (!cancelled) setHtml(rewritten)
      } catch (e) {
        if (!cancelled) setError(e)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [file])

  useEffect(() => {
    if (!html) return

    const yearEl = document.getElementById('current-year')
    if (yearEl) yearEl.textContent = String(new Date().getFullYear())

    if (isHome && typeof window.$ === 'function') {
      const $ = window.$

      const invitation = document.getElementById('invitation-carousel')
      if (invitation && typeof $(invitation).owlCarousel === 'function') {
        if (!$(invitation).hasClass('owl-loaded')) {
          $(invitation).owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
              0: { items: 2 },
              640: { items: 3 },
              1024: { items: 5 },
            },
          })
        }
      }

      const packaging = document.getElementById('packaging-carousel')
      if (packaging && typeof $(packaging).owlCarousel === 'function') {
        if (!$(packaging).hasClass('owl-loaded')) {
          $(packaging).owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            responsive: {
              0: { items: 2 },
              640: { items: 3 },
              1024: { items: 4 },
            },
          })
        }
      }
    }
  }, [html, isHome])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onClick(e) {
      const a = e.target && e.target.closest ? e.target.closest('a') : null
      if (!a) return

      const href = a.getAttribute('href')
      const route = normalizeRoutePathFromHtmlHref(href) || (href && href.startsWith('/') ? href : null)

      if (!route) return

      if (route.startsWith('/assets/') || route.startsWith('/original/')) return

      e.preventDefault()
      navigate(route)

      window.scrollTo(0, 0)
    }

    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [navigate])

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-bold text-primary">Page failed to load</h1>
        <p className="text-gray-600 mt-2">{String(error.message || error)}</p>
      </div>
    )
  }

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
}
