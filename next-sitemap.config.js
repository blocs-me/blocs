const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const matter = require('gray-matter')

function getGitLastModified(filePath) {
  try {
    const date = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: 'utf-8'
    }).trim()
    return date || null
  } catch {
    return null
  }
}

function getBlogDate(slug) {
  try {
    const file = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)
    const raw = fs.readFileSync(file, 'utf-8')
    const { data } = matter(raw)
    return data.date ? new Date(data.date).toISOString() : null
  } catch {
    return null
  }
}

function getPageSourceFile(pagePath) {
  const base = path.join(process.cwd(), 'src/pages')
  const candidates = [
    `${pagePath}.tsx`,
    `${pagePath}.ts`,
    `${pagePath}.jsx`,
    `${pagePath}.js`,
    `${pagePath}/index.tsx`,
    `${pagePath}/index.ts`,
    `${pagePath}/index.jsx`,
    `${pagePath}/index.js`
  ]
  for (const c of candidates) {
    const full = path.join(base, c)
    if (fs.existsSync(full)) return full
  }
  return null
}

const sitemap = {
  siteUrl: 'https://blocs.me',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/dashboard/*',
    '/main-analytics',
    '/main-habit-tracker',
    '/main-pomodoro',
    '/main-streaks',
    '/water-tracker',
    '/bar-chart',
    '/pomodoro',
    '/habit-tracker',
    '/dummy-water-tracker',
    '/dummy-water-analytics',
    '/dummy-pomodoro',
    '/dummy-pomodoro-analytics',
    '/account-deletion',
    '/dummy-habit-tracker'
  ],
  transform: async (config, pagePath) => {
    let lastmod = null

    const blogMatch = pagePath.match(/^\/blog\/(.+)$/)
    if (blogMatch) {
      lastmod = getBlogDate(blogMatch[1])
    }

    if (!lastmod) {
      const sourceFile = getPageSourceFile(pagePath)
      if (sourceFile) {
        lastmod = getGitLastModified(sourceFile)
      }
    }

    return {
      loc: pagePath,
      lastmod: lastmod || undefined,
      priority: config.priority,
      changefreq: undefined
    }
  }
}

module.exports = sitemap
