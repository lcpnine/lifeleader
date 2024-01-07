module.exports = {
  siteUrl: 'https://www.lifeleader.me',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
  additionalPaths: async config => {
    return [
      { loc: '/en', priority: 0.7 },
      { loc: '/ko', priority: 0.7 },
      { loc: '/zh-Hant', priority: 0.7 },
    ]
  },
  exclude: [],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
