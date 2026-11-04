import { Console } from '@/components/site/console';
import { Features } from '@/components/site/features';
import { Flow } from '@/components/site/flow';
import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { Hero } from '@/components/site/hero';
import { RunIt } from '@/components/site/run-it';
import { clowk, JsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    clowk,
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: site.url,
      description: site.description,
      publisher: { '@id': clowk['@id'] },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      name: site.name,
      url: site.url,
      description: site.description,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS',
      softwareVersion: site.version,
      license: 'https://www.gnu.org/licenses/agpl-3.0.html',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': clowk['@id'] },
      sameAs: [site.github],
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />

      <Header />

      <main className="flex-1">
        <Hero />

        <Flow />

        <Console />

        <Features />

        <RunIt />
      </main>

      <Footer />
    </>
  );
}
