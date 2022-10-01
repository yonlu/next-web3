/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['ipfs.io'],
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  },
  headers: [
    { key: 'Access-Control-Allow-Credentials', value: 'true' },
    {
      key: 'Access-Control-Allow-Origin',
      value: 'https://next-web3.vercel.app/',
    },
  ],
};

module.exports = nextConfig;
