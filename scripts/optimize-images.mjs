// Converts JPG/PNG files in src/assets to resized WebP, then removes the originals.
// Usage: npm run optimize-images
import { readdir, rm, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('../src/assets/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const MAX_WIDTH = 1600
const QUALITY = 78

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map((e) => {
    const full = join(dir, e.name)
    return e.isDirectory() ? walk(full) : full
  }))
  return files.flat()
}

const files = (await walk(ROOT)).filter((f) => /\.(jpe?g|png)$/i.test(f))
let before = 0, after = 0

for (const file of files) {
  const out = file.slice(0, -extname(file).length) + '.webp'
  const { size } = await stat(file)
  await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out)
  const { size: newSize } = await stat(out)
  await rm(file)
  before += size
  after += newSize
  console.log(`${file.slice(ROOT.length)}  ${(size / 1e6).toFixed(2)} MB → ${(newSize / 1e6).toFixed(2)} MB`)
}

console.log(`\nTotal: ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(1)} MB`)
