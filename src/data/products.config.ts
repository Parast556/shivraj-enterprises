/**
 * PRODUCT CATALOG CONFIGURATION
 * ==============================
 * Edit this file to add, update, or remove products.
 *
 * Each product needs:
 *   - id:          Unique identifier (e.g. 'product-1')
 *   - name:        Product name shown on the card
 *   - description: Short product description
  *   - image:       Path to image in public folder (e.g. '/images/1.jpeg')
 *
 * To add a new product:
 *   1. Place the image file in public/images/
 *   2. Add a new entry to the products array below
 *   3. Assign the product id to one or more categories in categories.config.ts
 *
 * Category membership is managed only in categories.config.ts.
 */

export interface ProductConfig {
  id: string
  name: string
  description: string
  image: string
}

export const products: ProductConfig[] = [
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
  // {
  //   id: 'product-6',
  //   name: 'Handcrafted Decor Piece 6',
  //   description: 'Beautiful handcrafted decorative piece from Shivraj Enterprises. Ideal for home temples, living spaces, and gifting.',
  //   category: 'statues',
  //   image: '/images/6.jpeg',
  // },
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
  }
]
