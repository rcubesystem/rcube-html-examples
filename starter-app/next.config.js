/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This folder is the app: Next.js doesn't look for another package-lock.json higher up (e.g. in your home folder)
  turbopack: { root: __dirname },
};

module.exports = nextConfig;
