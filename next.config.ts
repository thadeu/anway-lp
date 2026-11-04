import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

// A static site: `next build` writes it to out/, and Cloudflare serves the
// files. See wrangler.toml.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
