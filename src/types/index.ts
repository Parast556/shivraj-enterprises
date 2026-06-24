export interface Product {
  id: string
  name: string
  description: string
  image: string
  categories: string[]
}

export interface Category {
  slug: string
  name: string
  description: string
  tagline: string
  productIds: string[]
}

export interface CartItem {
  productId: string
  quantity: number
}
