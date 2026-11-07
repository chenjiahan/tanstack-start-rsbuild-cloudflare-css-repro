import assert from 'node:assert/strict'

const url = process.argv[2] ?? 'http://localhost:3000'
const response = await fetch(url)
assert.equal(response.status, 200)
const html = await response.text()
assert.ok(html.includes('SSR CSS reproduction'), 'Expected server-rendered content')
const links = html.match(/<link\b[^>]*>/g) ?? []
const styles = links.filter(link => /rel="stylesheet"/.test(link))
assert.ok(styles.length > 0, 'SSR HTML is missing stylesheet links')
for (const link of styles) {
  const href = link.match(/href="([^"]+)"/)[1]
  const css = await fetch(new URL(href, url))
  assert.equal(css.status, 200)
  assert.match(css.headers.get('content-type'), /text\/css/)
}
console.log('PASS: SSR HTML includes working stylesheet links')
