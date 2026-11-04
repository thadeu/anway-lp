import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMDXComponents } from '@/components/mdx';
import { clowk, JsonLd, pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { source } from '@/lib/source';

type Props = { params: Promise<{ slug?: string[] }> };

function withSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`;
}

// The path from the docs root to this page, for the breadcrumb data: each
// folder on the way that has an index page is one step.
function crumbs(slug: string[] = []) {
  const steps = [{ name: 'Docs', url: `${site.url}/docs/` }];

  slug.forEach((_, index) => {
    const page = source.getPage(slug.slice(0, index + 1));

    if (page) steps.push({ name: page.data.title, url: `${site.url}${withSlash(page.url)}` });
  });

  return steps;
}

function structuredData(slug: string[] | undefined, title: string, description: string | undefined, url: string) {
  const breadcrumb = crumbs(slug).map((step, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: step.name,
    item: step.url,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: title,
        description,
        url,
        inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
        publisher: clowk,
        about: { '@type': 'SoftwareApplication', name: site.name, url: site.url },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb,
      },
    ],
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;
  const url = `${site.url}${withSlash(page.url)}`;
  const data = structuredData(params.slug, page.data.title, page.data.description, url);

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={{ style: 'clerk' }}>
      <JsonLd data={data} />

      <DocsTitle>{page.data.title}</DocsTitle>

      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  return pageMetadata({
    title: page.data.title,
    description: page.data.description ?? site.description,
    path: withSlash(page.url),
    type: 'article',
  });
}
