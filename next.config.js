module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async rewrites() {
    return [
      {
        source: '/canvas/:path*',
        destination: 'https://knoxschools.instructure.com/api/v1/:path*'
      }
    ]
  }
}
