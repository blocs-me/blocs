import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type BlogPostMeta = {
  slug: string
  title: string
  date: string
  description: string
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        description: data.description ?? ''
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      description: data.description ?? ''
    } as BlogPostMeta,
    content
  }
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPostMeta[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug)
  const keywords = currentSlug.split('-').filter((w) => w.length > 3)

  const scored = allPosts.map((post) => {
    const postWords = post.slug.split('-')
    const score = keywords.reduce(
      (acc, kw) => acc + (postWords.includes(kw) ? 1 : 0),
      0
    )
    return { post, score }
  })

  scored.sort((a, b) => b.score - a.score || (a.post.date > b.post.date ? -1 : 1))
  return scored.slice(0, count).map((s) => s.post)
}

export function getPostsByKeywords(keywords: string[], count = 5): BlogPostMeta[] {
  const allPosts = getAllPosts()
  const scored = allPosts.map((post) => {
    const slug = post.slug.toLowerCase()
    const title = post.title.toLowerCase()
    const score = keywords.reduce(
      (acc, kw) => acc + (slug.includes(kw) ? 2 : 0) + (title.includes(kw) ? 1 : 0),
      0
    )
    return { post, score }
  })

  scored.sort((a, b) => b.score - a.score || (a.post.date > b.post.date ? -1 : 1))
  return scored.filter((s) => s.score > 0).slice(0, count).map((s) => s.post)
}
