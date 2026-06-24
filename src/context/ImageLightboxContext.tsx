import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import ProductImage from '../components/ProductImage'

interface PreviewState {
  src: string
  alt: string
  title?: string
  productId?: string
}

interface OpenPreviewOptions extends PreviewState {
  triggerElement?: HTMLElement | null
}

interface ClosePreviewOptions {
  /** Set when closing to navigate away — avoids focus/scroll restore on the previous page. */
  skipFocusRestore?: boolean
}

interface ImageLightboxContextValue {
  openPreview: (options: OpenPreviewOptions) => void
  closePreview: (options?: ClosePreviewOptions) => void
  isOpen: boolean
}

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(null)

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useState<PreviewState | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const skipFocusRestoreRef = useRef(false)
  const skipScrollRestoreRef = useRef(false)

  const closePreview = useCallback((options?: ClosePreviewOptions) => {
    skipFocusRestoreRef.current = options?.skipFocusRestore ?? false
    skipScrollRestoreRef.current = options?.skipFocusRestore ?? false
    setPreview(null)
  }, [])

  const openPreview = useCallback((options: OpenPreviewOptions) => {
    const { triggerElement, ...state } = options
    triggerRef.current = triggerElement ?? null
    skipFocusRestoreRef.current = false
    skipScrollRestoreRef.current = false
    setPreview(state)
  }, [])

  useBodyScrollLock(preview !== null, {
    returnFocusRef: triggerRef,
    skipFocusRestoreRef,
    skipScrollRestoreRef,
  })

  return (
    <ImageLightboxContext.Provider
      value={{ openPreview, closePreview, isOpen: preview !== null }}
    >
      {children}
      {preview && (
        <ImageLightboxModal preview={preview} onClose={closePreview} />
      )}
    </ImageLightboxContext.Provider>
  )
}

export function useImageLightbox() {
  const ctx = useContext(ImageLightboxContext)
  if (!ctx) throw new Error('useImageLightbox must be used within ImageLightboxProvider')
  return ctx
}

function ImageLightboxModal({
  preview,
  onClose,
}: {
  preview: PreviewState
  onClose: (options?: ClosePreviewOptions) => void
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={preview.title ?? preview.alt}
    >
      <button
        type="button"
        className="absolute inset-0 bg-forest-dark/94 backdrop-blur-lg animate-fade-in"
        onClick={() => onClose()}
        aria-label="Close image preview"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
          {preview.title && (
            <p className="truncate font-display text-lg font-semibold text-white sm:text-xl">
              {preview.title}
            </p>
          )}
          <button
            type="button"
            onClick={() => onClose()}
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-white/20 backdrop-blur-md transition-all duration-200 hover:bg-white/20"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-4 sm:px-8 sm:pb-8">
          <ProductImage
            src={preview.src}
            alt={preview.alt}
            className="max-h-[calc(100vh-8rem)] max-w-full rounded-lg object-contain shadow-2xl animate-scale-in ring-1 ring-white/10"
            loading="eager"
          />
        </div>

        {preview.productId && (
          <div className="relative z-10 flex justify-center px-4 pb-6 sm:pb-8">
            <Link
              to={`/products/${preview.productId}`}
              onClick={() => onClose({ skipFocusRestore: true })}
              className="btn-gold shadow-float"
            >
              View product details
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
