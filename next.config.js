/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'http://localhost:4000',
    API_URL: 'https://fakestoreapi.com',
  },
}

module.exports = nextConfig
