import { getGlobal } from './data'
import { textOverrides, imageOverrides } from './overrides'
import { TEMPLATE } from './template'

export const dynamic = 'force-dynamic'

function esc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function mediaUrl(v: any): string {
  return v && typeof v === 'object' ? v.url || '' : ''
}

export default async function Home() {
  let html = TEMPLATE
  const g = await getGlobal()
  for (const o of textOverrides) {
    const val = g?.[o.key]
    if (val && typeof val === 'string' && val.trim()) html = html.split(o.find).join(esc(val))
  }
  for (const o of imageOverrides) {
    const url = mediaUrl(g?.[o.key])
    if (url) html = html.split(o.find).join(url)
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
