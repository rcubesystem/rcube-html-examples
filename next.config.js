/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static site: `npm run build` writes every page to out/ (served by Firebase Hosting, see firebase.json)
  output: "export",
};

module.exports = nextConfig;
