const STORAGE_KEY = 'route-scroll-positions'
const MAX_ENTRIES = 50

const memoryCache = new Map<string, number>()

function readCache(): Record<string, number> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, number>
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

function writeCache(cache: Record<string, number>): void {
  const keys = Object.keys(cache)
  if (keys.length > MAX_ENTRIES) {
    for (const key of keys.slice(0, keys.length - MAX_ENTRIES)) {
      delete cache[key]
      memoryCache.delete(key)
    }
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  } catch {
    for (const [key, value] of Object.entries(cache)) {
      memoryCache.set(key, value)
    }
  }
}

export function scrollToPosition(y: number): void {
  const html = document.documentElement
  const previousScrollBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  window.scrollTo(0, y)
  html.scrollTop = y
  html.style.scrollBehavior = previousScrollBehavior
}

export function scrollToTop(): void {
  scrollToPosition(0)
}

export function scrollToTopIfSameRoute(targetPath: string, currentPathname: string): void {
  if (targetPath === currentPathname) {
    scrollToTop()
  }
}

export function saveScrollPosition(locationKey: string, scrollY: number): void {
  const cache = readCache()
  cache[locationKey] = scrollY
  memoryCache.set(locationKey, scrollY)
  writeCache(cache)
}

export function getScrollPosition(locationKey: string): number | undefined {
  const cache = readCache()
  if (locationKey in cache) return cache[locationKey]
  return memoryCache.get(locationKey)
}

export function disableNativeScrollRestoration(): void {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
}
