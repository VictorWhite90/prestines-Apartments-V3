import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageMeta } from '@/data/pageMeta'

const SITE = 'https://prestineapartment.com'

// Pages that exist but are still empty. When one gets real content, take it off this list
// and add it to public/sitemap.xml in the same commit.
const NOT_READY = ['/gallery', '/reviews', '/services']

// Adds, updates or removes one tag in <head>. There is never more than one of each.
function setHeadTag(selector, create, attribute, value) {
  let tag = document.head.querySelector(selector)
  if (value === null) {
    if (tag) tag.remove()
    return
  }
  if (!tag) {
    tag = create()
    document.head.appendChild(tag)
  }
  tag.setAttribute(attribute, value)
}

export default function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    // /contact/ is the same page as /contact
    const path = pathname.replace(/\/+$/, '') || '/'
    const entry = pageMeta[path]
    const indexable = Boolean(entry) && !NOT_READY.includes(path)

    if (entry) {
      const [title, description] = entry
      document.title = title

      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }

    // Public pages point Google at their one main address.
    setHeadTag(
      'link[rel="canonical"]',
      () => {
        const link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        return link
      },
      'href',
      indexable ? SITE + path : null
    )

    // Everything else (admin, booking result pages, empty pages, "Page not found") stays out of Google.
    setHeadTag(
      'meta[name="robots"]',
      () => {
        const meta = document.createElement('meta')
        meta.setAttribute('name', 'robots')
        return meta
      },
      'content',
      indexable ? null : 'noindex'
    )
  }, [pathname])

  return null
}
