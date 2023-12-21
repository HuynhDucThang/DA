/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
		serverActions: {
			allowedForwardedHosts: ['localhost'],
			allowedOrigins: ['http://localhost', "127.0.0.1:3000"]
		},
	},
  images: {
    // remotePatterns: ["localhost", "http://127.0.0.1:8000/", "127.0.0.1"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
