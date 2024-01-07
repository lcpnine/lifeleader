/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx'],
  i18n: {
    locales: ['en', 'ko', 'zh', 'zh-Hant'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
