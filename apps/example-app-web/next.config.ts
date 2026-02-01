import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // transpilePackages to watch files outside its root.
  transpilePackages: ['@foundry/hello-world'],
};

export default nextConfig;
