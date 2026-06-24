import { useLayoutEffect, type RefObject } from 'react'
import { lockBodyScroll, restoreFocusWithoutScroll, unlockBodyScroll } from '../utils/bodyScrollLock'

interface UseBodyScrollLockOptions {
  /** Element to return focus to when the overlay closes (e.g. the button that opened it). */
  returnFocusRef?: RefObject<HTMLElement | null>
  /** When true, skip focus restore (e.g. navigating away from the page). */
  skipFocusRestoreRef?: RefObject<boolean>
  /** When true, skip scroll restore on unlock (e.g. navigating away from the page). */
  skipScrollRestoreRef?: RefObject<boolean>
}

/**
 * Locks page scroll while an overlay is open and restores focus on close.
 * Must be used with useLayoutEffect timing so scroll is never painted at the wrong position.
 */
export function useBodyScrollLock(active: boolean, options: UseBodyScrollLockOptions = {}): void {
  const { returnFocusRef, skipFocusRestoreRef, skipScrollRestoreRef } = options

  useLayoutEffect(() => {
    if (!active) return

    lockBodyScroll()

    return () => {
      unlockBodyScroll({ skipScrollRestore: skipScrollRestoreRef?.current ?? false })

      if (skipFocusRestoreRef?.current) return

      restoreFocusWithoutScroll(returnFocusRef?.current ?? null)
    }
  }, [active, returnFocusRef, skipFocusRestoreRef, skipScrollRestoreRef])
}
