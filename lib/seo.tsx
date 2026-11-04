import type { Metadata } from 'next';

import { site } from '@/lib/site';

// One share image for every page: Facebook, Instagram, WhatsApp, LinkedIn,
// and Slack read the Open Graph tags, and X reads the twitter tags.
export const shareImage = {
  url: `${site.url}/og-image.png`,
  secureUrl: `${site.url}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'Anway: background jobs for every language',
  type: 'image/png',
};

export const clowk = {
  '@type': 'Organization',
  '@id': `${site.clowk}/#organization`,
  name: 'Clowk',
  url: site.clowk,
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
};

// The metadata of one page. A page that sets openGraph replaces the parent
// openGraph in full, so each page sets the image, the site name, and the URL.
export function pageMetadata({ title, description, path, type = 'website' }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const shareTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url,
      type,
      siteName: site.name,
      locale: 'en_US',
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [shareImage.url],
    },
  };
}

// Structured data for search engines and AI assistants.
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
