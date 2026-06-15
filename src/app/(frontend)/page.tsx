import fs from 'node:fs'
import path from 'node:path'
import { getGlobal } from './data'
import { textOverrides, imageOverrides } from './overrides'

export const dynamic = 'force-dynamic'

const pub = (...p: string[]) => path.join(process.cwd(), 'public', ...p)
const read = (f: string) => { try { return fs.readFileSync(f, 'utf8') } catch { return '' } }

function esc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function mediaUrl(v: any): string {
  if (v && typeof v === 'object') return v.url || ''
  return ''
}

export default async function Home() {
  let html = read(pub('lp-template.html'))

  // CSS embutido na mesma ordem do preview (lp-inline -> styles -> tailwind)
  const css =
    read(pub('css', 'lp-inline.css')) + '\n' +
    read(pub('css', 'styles.css')) + '\n' +
    read(pub('css', 'tailwind.css'))

  const g = await getGlobal()
  for (const o of textOverrides) {
    const val = g?.[o.key]
    if (val && typeof val === 'string' && val.trim()) html = html.split(o.find).join(esc(val))
  }
  for (const o of imageOverrides) {
    const url = mediaUrl(g?.[o.key])
    if (url) html = html.split(o.find).join(url)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}
