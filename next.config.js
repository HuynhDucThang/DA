/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "http://127.0.0.1:8000/", "127.0.0.1"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
