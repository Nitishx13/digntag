import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'

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

function stripHeaderAndFooterFromBody(doc) {
  const header = doc.querySelector('header')
  if (header) header.remove()

  const footer = doc.querySelector('footer')
  if (footer) footer.remove()

  const whatsapp = doc.querySelector('a.fixed.bottom-6.right-6')
  if (whatsapp) whatsapp.remove()
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
        stripHeaderAndFooterFromBody(doc)

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

    if (file === 'gift-finder.html') {
      const root = containerRef.current
      if (!root) return

      const AMAZON_TAG = 'YOUR_AMAZON_TAG'

      const form = root.querySelector('#ai-gift-form')
      const budget = root.querySelector('#gf-budget')
      const budgetValue = root.querySelector('#gf-budget-value')
      const previewEl = root.querySelector('#gf-search-preview')

      function formatINR(n) {
        const num = Number(n)
        if (Number.isNaN(num)) return String(n)
        return `₹${num.toLocaleString('en-IN')}`
      }

      function updateBudgetLabel() {
        if (!budget || !budgetValue) return
        budgetValue.textContent = formatINR(budget.value)
      }

      function getSelectedChips(group) {
        const wrap = root.querySelector(`[data-chip-group="${group}"]`)
        if (!wrap) return []
        const buttons = Array.from(wrap.querySelectorAll('button'))
        return buttons
          .filter((b) => b.getAttribute('aria-pressed') === 'true')
          .map((b) => (b.textContent || '').trim())
          .filter(Boolean)
      }

      function buildAmazonSearchUrl(query) {
        const u = new URL('https://www.amazon.in/s')
        const q = (query || '').trim()
        if (q) u.searchParams.set('k', q)
        if (AMAZON_TAG) u.searchParams.set('tag', AMAZON_TAG)
        return u.toString()
      }

      function buildQuery() {
        const occasion = (root.querySelector('#gf-occasion')?.value || '').trim()
        const age = (root.querySelector('#gf-age')?.value || '').trim()
        const recipient = (root.querySelector('#gf-recipient')?.value || '').trim()
        const brands = (root.querySelector('#gf-brands')?.value || '').trim()
        const details = (root.querySelector('#gf-details')?.value || '').trim()
        const budgetNum = budget ? budget.value : ''
        const interests = getSelectedChips('interests')
        const styles = getSelectedChips('styles')

        const parts = [
          occasion && `${occasion} gift`,
          recipient && `for ${recipient}`,
          age && age,
          budgetNum && `under ₹${Number(budgetNum).toLocaleString('en-IN')}`,
          interests.length ? interests.join(', ') : '',
          styles.length ? styles.join(', ') : '',
          brands,
          details,
        ].filter(Boolean)

        return parts.join(' ')
      }

      function updatePreview() {
        if (!previewEl) return
        const query = buildQuery()
        previewEl.textContent = query ? `Search preview: ${query}` : 'Search preview will appear here.'
      }

      function chipClickHandler(e) {
        const btn = e.target && e.target.closest ? e.target.closest('button.gf-chip') : null
        if (!btn || !root.contains(btn)) return
        e.preventDefault()
        const current = btn.getAttribute('aria-pressed') === 'true'
        btn.setAttribute('aria-pressed', current ? 'false' : 'true')
        btn.classList.toggle('bg-black', !current)
        btn.classList.toggle('text-white', !current)
        btn.classList.toggle('border-black', !current)
        btn.classList.toggle('bg-white', current)
        btn.classList.toggle('text-gray-700', current)
        btn.classList.toggle('border-gray-200', current)

        updatePreview()
      }

      function submitHandler(e) {
        e.preventDefault()
        const query = buildQuery()
        const url = buildAmazonSearchUrl(query)
        window.open(url, '_blank', 'noopener,noreferrer')
      }

      // Init chip buttons base state + listeners
      const chips = Array.from(root.querySelectorAll('button.gf-chip'))
      chips.forEach((b) => {
        if (!b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', 'false')
      })

      updateBudgetLabel()
      updatePreview()

      const occasionEl = root.querySelector('#gf-occasion')
      const ageEl = root.querySelector('#gf-age')
      const recipientEl = root.querySelector('#gf-recipient')
      const brandsEl = root.querySelector('#gf-brands')
      const detailsEl = root.querySelector('#gf-details')

      function onBudgetInput() {
        updateBudgetLabel()
        updatePreview()
      }

      function onTextInput() {
        updatePreview()
      }

      budget?.addEventListener('input', onBudgetInput)
      occasionEl?.addEventListener('change', onTextInput)
      ageEl?.addEventListener('change', onTextInput)
      recipientEl?.addEventListener('change', onTextInput)
      brandsEl?.addEventListener('input', onTextInput)
      detailsEl?.addEventListener('input', onTextInput)
      root.addEventListener('click', chipClickHandler)
      form?.addEventListener('submit', submitHandler)

      return () => {
        budget?.removeEventListener('input', onBudgetInput)
        occasionEl?.removeEventListener('change', onTextInput)
        ageEl?.removeEventListener('change', onTextInput)
        recipientEl?.removeEventListener('change', onTextInput)
        brandsEl?.removeEventListener('input', onTextInput)
        detailsEl?.removeEventListener('input', onTextInput)
        root.removeEventListener('click', chipClickHandler)
        form?.removeEventListener('submit', submitHandler)
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

  return (
    <>
      <SiteHeader />
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
      <SiteFooter />
    </>
  )
}
