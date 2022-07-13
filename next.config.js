/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  }
}

module.exports = nextConfig