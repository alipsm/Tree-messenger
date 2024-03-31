/** @type {import('next').NextConfig} */
const { version } = require('./package.json');
const nextConfig = {
  
  env: {
    APP_VERSION:version,
  },
  
  reactStrictMode: true,
}

module.exports = nextConfig
