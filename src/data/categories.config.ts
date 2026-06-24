/**
 * CATEGORY CONFIGURATION
 * ======================
 * Single source of truth for all product categories.
 *
 * To add a category:
 *   1. Add a new entry to the `categories` array below
 *   2. Set a unique `slug`, display fields, and `productIds`
 *
 * To assign a product to a category:
 *   - Add the product's `id` (e.g. 'product-1') to that category's `productIds` array
 *   - A product can belong to multiple categories by listing its id in more than one array
 *
 * To remove a product from a category:
 *   - Remove its id from that category's `productIds` array
 *
 * Products are defined separately in products.config.ts.
 * The website shows products on category pages based on these mappings only.
 */

export interface CategoryConfig {
  slug: string
  name: string
  tagline: string
  description: string
  productIds: string[]
}

export const categories: CategoryConfig[] = [
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
