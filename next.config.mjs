/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/platform',
          permanent: true,
        },
        {
          source: '/auth',
          destination: '/login',
          permanent: true,
        },
      ];
  },};

export default nextConfig;
