import { readdir, stat, readFile, writeFile, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')

// Match portrait files (e.g. ada-pic.png, vesper-pic.png). Social images are skipped.
const PORTRAIT_RE = /-pic\.png$/i

const fmt = (bytes) => (bytes / 1024).toFixed(1) + ' KB'

const files = (await readdir(PUBLIC_DIR)).filter(f => PORTRAIT_RE.test(f))
if (files.length === 0) {
    console.log('No portrait PNGs found. Nothing to do.')
    process.exit(0)
}

let totalBefore = 0
let totalAfter = 0

for (const file of files) {
    const src = join(PUBLIC_DIR, file)
    const dst = join(PUBLIC_DIR, file.replace(/\.png$/i, '.webp'))

    const before = (await stat(src)).size
    totalBefore += before

    const buf = await readFile(src)
    await sharp(buf).webp({ quality: 82 }).toFile(dst)

    const after = (await stat(dst)).size
    totalAfter += after

    await unlink(src)
    console.log(`${file.padEnd(22)} ${fmt(before).padStart(10)} → ${fmt(after).padStart(10)}  (-${(100 - (after / before) * 100).toFixed(0)}%)`)
}

console.log('\nTotal:', fmt(totalBefore), '→', fmt(totalAfter), `(-${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%)`)
