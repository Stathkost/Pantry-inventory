/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com",
      "source.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
