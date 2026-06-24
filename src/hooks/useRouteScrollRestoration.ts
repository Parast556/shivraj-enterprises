import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import {
  getScrollPosition,
  saveScrollPosition,
  scrollToPosition,
  scrollToTop,
} from '../utils/scrollRestoration'

/**
 * Scroll policy for SPA navigation:
 * - PUSH / REPLACE → top of page
 * - POP (back/forward) → restore saved position for that history entry
 */
export function useRouteScrollRestoration(): void {
  const location = useLocation()
  const navigationType = useNavigationType()
  const locationKeyRef = useRef(location.key)

  // Save scroll before any scroll-to-top runs (must be useLayoutEffect, not useEffect).
  useLayoutEffect(() => {
    locationKeyRef.current = location.key

    return () => {
      saveScrollPosition(locationKeyRef.current, window.scrollY)
    }
  }, [location.key])

  useLayoutEffect(() => {
    if (navigationType === 'POP') {
      const saved = getScrollPosition(location.key)
      if (saved !== undefined) {
        scrollToPosition(saved)
        return
      }
    }

    scrollToTop()
  }, [location.key, location.pathname, location.search, location.hash, navigationType])
}
