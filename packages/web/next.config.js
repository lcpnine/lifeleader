/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx'],
  i18n: {
    locales: ['en', 'ko', 'zh-Hant'],
    defaultLocale: 'en',
  },
  env: {
    PHASE: process.env.PHASE,
  },
}

module.exports = nextConfig
