import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  images: { unoptimized: true },
};
export default nextConfig;
