import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';
import { source } from '@/lib/source';

// A static export writes this as out/sitemap.xml at build time.
export const dynamic = 'force-static';

function withSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const docs: MetadataRoute.Sitemap = source.getPages().map(page => ({
    url: `${site.url}${withSlash(page.url)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: page.url === '/docs' ? 0.9 : 0.7,
  }));

  return [...pages, ...docs];
}
