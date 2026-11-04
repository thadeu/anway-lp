import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { sidebarSections } from '@/lib/sidebar';
import { source } from '@/lib/source';

// The commit of the build, from CI. A local build shows only the version.
const commit = process.env.GITHUB_SHA?.slice(0, 7);

// Fumadocs draws the page and the table of contents. Its own sidebar and top
// bar are off: DocsSidebar replaces both, and globals.css gives the space back.
export default function Layout({ children }: { children: ReactNode }) {
  const tree = source.getPageTree();

  return (
    <>
      <DocsSidebar sections={sidebarSections(tree)} commit={commit} />

      <DocsLayout
        tree={tree}
        nav={{ enabled: false }}
        sidebar={{ enabled: false }}
        searchToggle={{ enabled: false }}
        containerProps={{ className: 'docs-layout' }}
      >
        {children}
      </DocsLayout>
    </>
  );
}
