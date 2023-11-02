// next.config.js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, swcMinify: true, output: 'export', basePath: '/blog_perso', }

module.exports = withContentlayer(nextConfig)