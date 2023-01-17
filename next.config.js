/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_BASE_RASAD_WS_URL}`],
  },
};

module.exports = nextConfig;
