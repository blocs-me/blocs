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
  ]
}

module.exports = sitemap
