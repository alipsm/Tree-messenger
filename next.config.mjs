/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '3118953288.cloudylink.com',
            port: '3333',
            pathname: '/CMD_FILE_MANAGER/**',
          },
        ],
      },
};

export default nextConfig;
