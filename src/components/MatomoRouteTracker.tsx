import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    _paq?: unknown[]
  }
}

/**
 * Fires a Matomo pageview every time React Router's pathname changes,
 * including the initial render. The bootstrap Script in index.html
 * sets up _paq and loads matomo.js but deliberately does NOT fire
 * trackPageView itself — otherwise the initial hit would double-count
 * with this effect's first run.
 */
export default function MatomoRouteTracker() {
  const location = useLocation()

  useEffect(() => {
    if (!window._paq) return
    const url = location.pathname + location.search
    window._paq.push(['setCustomUrl', url])
    window._paq.push(['setDocumentTitle', document.title])
    window._paq.push(['trackPageView'])
  }, [location.pathname, location.search])

  return null
}
