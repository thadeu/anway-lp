import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';

import { shareImage } from '@/lib/seo';
import { site } from '@/lib/site';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-face', display: 'swap' });

const title = 'Anway: background jobs for every language';

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Anway',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'background jobs',
    'job queue',
    'job server',
    'Faktory',
    'Rails Active Job',
    'Go worker',
    'Node.js queue',
    'pub/sub topics',
    'open source',
  ],
  authors: [{ name: 'Clowk', url: site.clowk }],
  creator: 'Clowk',
  publisher: 'Clowk',
  category: 'technology',
  metadataBase: new URL(site.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description: site.description,
    siteName: site.name,
    url: site.url,
    type: 'website',
    locale: 'en_US',
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
    images: [shareImage.url],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: 'black-translucent',
    startupImage: ['/icons/icon-512.png'],
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0E1626' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1626' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

const fonts = `${inter.variable} ${interTight.variable} ${mono.variable}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${fonts}`} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col bg-navy font-sans text-ink antialiased">
        <RootProvider
          theme={{ defaultTheme: 'dark', forcedTheme: 'dark' }}
          search={{ options: { type: 'static' } }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
