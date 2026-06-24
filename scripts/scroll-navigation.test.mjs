/**
 * Automated scroll-navigation checks against preview server.
 * Run: node scripts/scroll-navigation.test.mjs
 */
import { chromium, devices } from 'playwright'

const BASE = 'http://127.0.0.1:4173'
const iPhone = devices['iPhone 13']

let passed = 0
let failed = 0

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`)
    passed += 1
  } else {
    console.error(`  ✗ ${message}`)
    failed += 1
  }
}

async function scrollY(page) {
  return page.evaluate(() => window.scrollY)
}

async function run() {
  const browser = await chromium.launch()
  const context = await browser.newContext({ ...iPhone })
  const page = await context.newPage()

  console.log('\n1. Home loads at top')
  await page.goto(BASE + '/')
  await page.waitForLoadState('networkidle')
  assert((await scrollY(page)) < 50, 'Home initial scroll near top')

  console.log('\n2. Navigate to shop scrolls to top')
  await page.evaluate(() => window.scrollTo(0, 800))
  await page.getByRole('link', { name: 'Shop Collection' }).click()
  await page.waitForURL('**/shop')
  await page.waitForTimeout(100)
  assert((await scrollY(page)) < 50, 'Shop page at top after navigation')

  console.log('\n3. Back restores shop scroll position')
  const shopScrollBefore = 600
  await page.evaluate((y) => window.scrollTo(0, y), shopScrollBefore)
  await page.waitForTimeout(100)
  await page.getByRole('link', { name: /Shivraj/i }).first().click()
  await page.waitForURL(BASE + '/')
  await page.waitForTimeout(100)
  await page.goBack()
  await page.waitForURL('**/shop')
  await page.waitForTimeout(150)
  const restored = await scrollY(page)
  assert(restored > 400, `Back restored shop scroll (got ${restored}, expected ~${shopScrollBefore})`)

  console.log('\n4. Mobile menu Home from scrolled home resets to top')
  await page.goto(BASE + '/')
  await page.evaluate(() => window.scrollTo(0, 900))
  await page.waitForTimeout(100)
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await page.waitForTimeout(200)
  assert((await scrollY(page)) < 50, 'Home at top after mobile menu Home tap')

  console.log('\n5. Logo tap on home resets to top')
  await page.evaluate(() => window.scrollTo(0, 700))
  await page.waitForTimeout(100)
  await page.getByRole('link', { name: /Shivraj/i }).first().click()
  await page.waitForTimeout(150)
  assert((await scrollY(page)) < 50, 'Home at top after logo tap')

  console.log('\n6. Mobile menu navigate to different route starts at top')
  await page.evaluate(() => window.scrollTo(0, 500))
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('navigation').getByRole('link', { name: 'All Products' }).click()
  await page.waitForURL('**/shop')
  await page.waitForTimeout(150)
  assert((await scrollY(page)) < 50, 'Shop at top after mobile menu navigation')

  await browser.close()

  console.log(`\n${'='.repeat(40)}`)
  console.log(`Results: ${passed} passed, ${failed} failed`)
  process.exit(failed > 0 ? 1 : 0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
