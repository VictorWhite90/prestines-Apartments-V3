import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageMeta } from '@/data/pageMeta'

export default function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const entry = pageMeta[pathname]
    if (!entry) return

    const [title, description] = entry
    document.title = title

    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [pathname])

  return null
}
