/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require('@plaiceholder/next')

const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.thecocktaildb.com']
  },
  basePath: '/cocktailsdb-nextjs/'
}

module.exports = withPlaiceholder(config)
