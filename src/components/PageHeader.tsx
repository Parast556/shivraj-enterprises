import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  children?: React.ReactNode
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <div className="border-b border-forest/[0.06] bg-gradient-to-b from-white to-cream/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-forest/40" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 && <span className="text-forest/25" aria-hidden="true">/</span>}
                {crumb.to ? (
                  <Link to={crumb.to} className="transition-colors duration-200 hover:text-gold-dark">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-forest/65">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && <p className="section-eyebrow-left">{eyebrow}</p>}
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-forest sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-forest/55 sm:text-base">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  )
}
