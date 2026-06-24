/**
 * Shared body scroll lock for overlays (lightbox, mobile menu, etc.).
 * Desktop: overflow hidden only — scroll position is never changed.
 * iOS: position fixed fallback with synchronous restore on unlock.
 */
import { scrollToPosition } from './scrollRestoration'

let lockCount = 0
let savedScrollY = 0
let usingFixedLock = false

const BODY_FIXED_PROPS = ['position', 'top', 'left', 'right', 'width'] as const

interface UnlockBodyScrollOptions {
  /** When true, do not restore the pre-overlay scroll position (e.g. navigating away). */
  skipScrollRestore?: boolean
}

function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

function scrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth
}

function applyScrollbarPadding(): void {
  const width = scrollbarWidth()
  if (width > 0) {
    document.body.style.paddingRight = `${width}px`
  }
}

function clearScrollbarPadding(): void {
  document.body.style.paddingRight = ''
}

function clearFixedLockStyles(style: CSSStyleDeclaration): void {
  for (const prop of BODY_FIXED_PROPS) {
    style.removeProperty(prop)
  }
  style.removeProperty('overflow')
}

export function lockBodyScroll(): void {
  if (lockCount === 0) {
    savedScrollY = window.scrollY
    usingFixedLock = isIOS()

    if (usingFixedLock) {
      const { style } = document.body
      style.position = 'fixed'
      style.top = `-${savedScrollY}px`
      style.left = '0'
      style.right = '0'
      style.width = '100%'
      style.overflow = 'hidden'
    } else {
      document.documentElement.classList.add('scroll-locked')
      document.body.classList.add('scroll-locked')
    }

    applyScrollbarPadding()
  }

  lockCount += 1
}

export function unlockBodyScroll(options: UnlockBodyScrollOptions = {}): void {
  const { skipScrollRestore = false } = options
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount > 0) return

  if (usingFixedLock) {
    const top = document.body.style.top
    const parsed = top ? Math.abs(Number.parseInt(top, 10)) : NaN
    const scrollY = Number.isNaN(parsed) ? savedScrollY : parsed

    clearFixedLockStyles(document.body.style)
    clearScrollbarPadding()
    scrollToPosition(skipScrollRestore ? 0 : scrollY)
  } else {
    document.documentElement.classList.remove('scroll-locked')
    document.body.classList.remove('scroll-locked')
    clearScrollbarPadding()
  }

  usingFixedLock = false
}

export function restoreFocusWithoutScroll(element: HTMLElement | null | undefined): void {
  if (element?.isConnected) {
    element.focus({ preventScroll: true })
  }
}
