import type { NextConfig } from 'next';

/**
 * Deployed as a static export so it can sit on GitHub Pages.
 *
 * On Pages the site lives under /my-portfolio, so CI builds with
 * NEXT_PUBLIC_BASE_PATH=/my-portfolio. Locally it stays empty and the
 * site is served from the root. Using a custom domain later? Drop the
 * env var from the workflow and everything moves back to "/".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // No image optimization server exists in a static export.
    unoptimized: true,
  },
};

export default nextConfig;
