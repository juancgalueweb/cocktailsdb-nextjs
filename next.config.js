/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require('@plaiceholder/next')

const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.thecocktaildb.com']
  }
}

module.exports = withPlaiceholder(config)
