interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
  id?: string
  placeholder?: string
}

export default function ProductSearch({
  value,
  onChange,
  id = 'product-search',
  placeholder = 'Search products...',
}: ProductSearchProps) {
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-forest/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-forest/[0.08] bg-white py-4 pl-12 pr-11 text-sm text-forest shadow-soft transition-all duration-200 placeholder:text-forest/30 focus:border-gold/50 focus:shadow-float focus:outline-none focus:ring-2 focus:ring-gold/15"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-forest/35 transition-colors duration-200 hover:bg-beige hover:text-forest"
          aria-label="Clear search"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
