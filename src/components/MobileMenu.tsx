import { useLayoutEffect, useRef, type RefObject } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useProducts } from '../context/ProductsContext'
import { scrollToTopIfSameRoute } from '../utils/scrollRestoration'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

export default function MobileMenu({ open, onClose, returnFocusRef }: MobileMenuProps) {
  const location = useLocation()
  const { categories } = useProducts()
  const skipFocusRestoreRef = useRef(false)
  const skipScrollRestoreRef = useRef(false)

  const dismiss = (skipRestore: boolean) => {
    skipFocusRestoreRef.current = skipRestore
    skipScrollRestoreRef.current = skipRestore
    onClose()
  }

  const navigate = (to: string) => {
    dismiss(true)
    scrollToTopIfSameRoute(to, location.pathname)
  }

  useBodyScrollLock(open, { returnFocusRef, skipFocusRestoreRef, skipScrollRestoreRef })

  useLayoutEffect(() => {
    if (open) {
      skipFocusRestoreRef.current = false
      skipScrollRestoreRef.current = false
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-forest-dark/55 backdrop-blur-[2px]"
        onClick={() => dismiss(false)}
        aria-label="Close menu"
      />

      <div className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-cream shadow-2xl animate-slide-in-right ring-1 ring-forest/[0.06]">
        <div className="flex items-center justify-between border-b border-forest/[0.06] bg-white px-5 py-4">
          <span className="font-display text-xl font-semibold text-forest">Menu</span>
          <button
            type="button"
            onClick={() => dismiss(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest/60 hover:bg-beige"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/30">
            Shop
          </p>
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => navigate('/')}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-forest transition-colors hover:bg-beige"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => navigate('/shop')}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-forest transition-colors hover:bg-beige"
            >
              All Products
            </Link>
            <Link
              to="/cart"
              onClick={() => navigate('/cart')}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-forest transition-colors hover:bg-beige"
            >
              Cart
            </Link>
          </div>

          <p className="mb-3 mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/35">
            Categories
          </p>
          <div className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                onClick={() => navigate(`/category/${category.slug}`)}
                className="block rounded-xl px-4 py-3 text-sm text-forest/75 transition-colors hover:bg-beige hover:text-forest"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="border-t border-forest/5 p-5">
          <a
            href="https://wa.me/919917202763"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-medium text-white"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  )
}
