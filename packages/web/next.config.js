/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx'],
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
