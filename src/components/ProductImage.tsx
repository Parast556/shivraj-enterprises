import { useEffect, useState } from 'react'

const PLACEHOLDER = '/images/placeholder.svg'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export default function ProductImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)

  useEffect(() => {
    setCurrentSrc(src)
  }, [src])

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (currentSrc !== PLACEHOLDER) {
          setCurrentSrc(PLACEHOLDER)
        }
      }}
    />
  )
}
