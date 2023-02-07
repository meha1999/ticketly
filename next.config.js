/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: [`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}`],
  },
};

module.exports = nextConfig;
