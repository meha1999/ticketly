/** @type {import('next').NextConfig} */
console.log(process.env.NEXT_PUBLIC_BASE_RASAD_WS_URL)
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}`],
  },
};

module.exports = nextConfig;
