/* eslint-disable no-undef */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://doc.aowerleee.online',
  generateRobotsTxt: true,
  changefreq: 'daily',
  exclude: ['*/_meta'],
  additionalPaths: async () => [
    {
      loc: '/',
      priority: 1,
      changefreq: 'daily',
      lastmod: new Date().toISOString(),
    },
  ],
}
