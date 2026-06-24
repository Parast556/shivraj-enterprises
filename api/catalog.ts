// Self-contained catalog for Vercel Function runtime.
// This module intentionally does NOT import from `website/src/*`.

interface Category {
  slug: string
  name: string
  tagline: string
  description: string
  productIds: string[]
}

interface Product {
  id: string
  name: string
  description: string
  image: string
  categories: string[]
}

// Copied from `website/src/data/categories.config.ts`
const categories: Category[] = [
  {
    slug: 'statues',
    name: 'Statues & Sculptures',
    tagline: 'Statement pieces',
    description:
      'Handcrafted statues and sculptures that bring character and elegance to any room or temple space.',
    productIds: [
      'product-1',
      'product-11',
      'product-16',
      'product-21',
      'product-26',
      'product-31',
      'product-36',
      'product-41',
    ],
  },
  {
    slug: 'temple-decor',
    name: 'Temple Decor',
    tagline: 'Sacred spaces',
    description: 'Thoughtfully crafted decor for home temples, puja rooms, and spiritual corners.',
    productIds: [
      'product-2',
      'product-7',
      'product-12',
      'product-17',
      'product-22',
      'product-27',
      'product-32',
      'product-37',
    ],
  },
  {
    slug: 'figurines',
    name: 'Figurines',
    tagline: 'Delicate artistry',
    description: 'Finely detailed figurines perfect for shelves, consoles, and curated display nooks.',
    productIds: [
      'product-3',
      'product-8',
      'product-13',
      'product-18',
      'product-23',
      'product-28',
      'product-33',
      'product-38',
    ],
  },
  {
    slug: 'home-accents',
    name: 'Home Accents',
    tagline: 'Everyday beauty',
    description: 'Versatile accent pieces that elevate living rooms, entryways, and workspaces.',
    productIds: [
      'product-4',
      'product-9',
      'product-14',
      'product-19',
      'product-24',
      'product-29',
      'product-34',
      'product-39',
    ],
  },
  {
    slug: 'gift-collection',
    name: 'Gift Collection',
    tagline: 'Memorable gifting',
    description:
      'Beautifully packaged-worthy pieces ideal for weddings, housewarmings, and festivals.',
    productIds: [
      'product-5',
      'product-10',
      'product-15',
      'product-20',
      'product-25',
      'product-30',
      'product-35',
      'product-40',
    ],
  },
]

// Copied from `website/src/data/products.config.ts`
const productsBase: Array<Omit<Product, 'categories'>> = [
  {
    id: 'product-1',
    name: 'Camel Statue',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/1.jpeg',
  },
  {
    id: 'product-2',
    name: 'Handcrafted Decor Piece 2',
    description: 'Charming bird pair statue adding beauty and harmony to your décor.',
    image: '/images/2.jpeg',
  },
  {
    id: 'product-3',
    name: 'Handcrafted Decor Piece 3',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/3.jpeg',
  },
  {
    id: 'product-4',
    name: 'Handcrafted Decor Piece 4',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/4.jpeg',
  },
  {
    id: 'product-5',
    name: 'Handcrafted Decor Piece 5',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/5.jpeg',
  },
  {
    id: 'product-7',
    name: 'Handcrafted Decor Piece 7',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/7.jpeg',
  },
  {
    id: 'product-8',
    name: 'Handcrafted Decor Piece 8',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/8.jpeg',
  },
  {
    id: 'product-9',
    name: 'Handcrafted Decor Piece 9',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/9.jpeg',
  },
  {
    id: 'product-10',
    name: 'Handcrafted Decor Piece 10',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/10.jpeg',
  },
  {
    id: 'product-11',
    name: 'Handcrafted Decor Piece 11',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/11.jpeg',
  },
  {
    id: 'product-12',
    name: 'Krishna Statue',
    description: 'Beautiful Krishna statue bringing peace, devotion, and positivity to your space.',
    image: '/images/12.jpeg',
  },
  {
    id: 'product-13',
    name: 'Handcrafted Decor Piece 13',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/13.jpeg',
  },
  {
    id: 'product-14',
    name: 'Handcrafted Decor Piece 14',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/14.jpeg',
  },
  {
    id: 'product-15',
    name: 'Handcrafted Decor Piece 15',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/15.jpeg',
  },
  {
    id: 'product-16',
    name: 'Handcrafted Decor Piece 16',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/16.jpeg',
  },
  {
    id: 'product-17',
    name: 'Handcrafted Decor Piece 17',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/17.jpeg',
  },
  {
    id: 'product-18',
    name: 'Krishna Statue',
    description: 'Beautiful Krishna statue bringing peace, devotion, and positivity to your space.',
    image: '/images/18.jpeg',
  },
  {
    id: 'product-19',
    name: 'Handcrafted Decor Piece 19',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/19.jpeg',
  },
  {
    id: 'product-20',
    name: 'Handcrafted Decor Piece 20',
    description: 'Charming bird pair statue adding beauty and harmony to your décor.',
    image: '/images/20.jpeg',
  },
  {
    id: 'product-21',
    name: 'Handcrafted Decor Piece 21',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/21.jpeg',
  },
  {
    id: 'product-22',
    name: 'Horse Statue',
    description: 'Elegant horse statue for home and office décor.',
    image: '/images/22.jpeg',
  },
  {
    id: 'product-23',
    name: 'Handcrafted Decor Piece 23',
    description: 'Majestic standing horse statue representing power, confidence, and success.',
    image: '/images/23.jpeg',
  },
  {
    id: 'product-24',
    name: 'Handcrafted Decor Piece 24',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/24.jpeg',
  },
  {
    id: 'product-25',
    name: 'Handcrafted Decor Piece 25',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/25.jpeg',
  },
  {
    id: 'product-26',
    name: 'Handcrafted Decor Piece 26',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/26.jpeg',
  },
  {
    id: 'product-27',
    name: 'Handcrafted Decor Piece 27',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/27.jpeg',
  },
  {
    id: 'product-28',
    name: 'Handcrafted Decor Piece 28',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/28.jpeg',
  },
  {
    id: 'product-29',
    name: 'Handcrafted Decor Piece 29',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/29.jpeg',
  },
  {
    id: 'product-30',
    name: 'Handcrafted Decor Piece 30',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/30.jpeg',
  },
  {
    id: 'product-31',
    name: 'Handcrafted Decor Piece 31',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/31.jpeg',
  },
  {
    id: 'product-32',
    name: 'Handcrafted Decor Piece 32',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/32.jpeg',
  },
  {
    id: 'product-33',
    name: 'Handcrafted Decor Piece 33',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/33.jpeg',
  },
  {
    id: 'product-34',
    name: 'Handcrafted Decor Piece 34',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/34.jpeg',
  },
  {
    id: 'product-35',
    name: 'Handcrafted Decor Piece 35',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/35.jpeg',
  },
  {
    id: 'product-36',
    name: 'Handcrafted Decor Piece 36',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/36.jpeg',
  },
  {
    id: 'product-37',
    name: 'Handcrafted Decor Piece 37',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/37.jpeg',
  },
  {
    id: 'product-38',
    name: 'Handcrafted Decor Piece 38',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/38.jpeg',
  },
  {
    id: 'product-39',
    name: 'Handcrafted Decor Piece 39',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/39.jpeg',
  },
  {
    id: 'product-40',
    name: 'Handcrafted Decor Piece 40',
    description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
    image: '/images/40.jpeg',
  },
  {
    id: 'product-41',
    name: 'Marble Ganesha Statue',
    description: 'Elegant handcrafted Ganesha statue for home temple.',
    image: '/images/ganesha.jpeg',
  },
]

function buildCategoryMap(): Map<string, string[]> {
  const map = new Map<string, string[]>()
  for (const category of categories) {
    for (const productId of category.productIds) {
      const existing = map.get(productId) ?? []
      if (!existing.includes(category.slug)) {
        map.set(productId, [...existing, category.slug])
      }
    }
  }
  return map
}

const categoryMap = buildCategoryMap()

function attachCategoriesToProducts(items: Array<Omit<Product, 'categories'>>): Product[] {
  return items.map((product) => ({
    ...product,
    categories: categoryMap.get(product.id) ?? [],
  }))
}

export const allProducts: Product[] = attachCategoriesToProducts(productsBase)

function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return products

  return products.filter((product) => {
    const categoryNames = product.categories
      .map((slug) => getCategoryBySlug(slug)?.name.toLowerCase() ?? '')
      .join(' ')

    return (
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      categoryNames.includes(q)
    )
  })
}

