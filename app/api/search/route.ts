import { createFromSource } from 'fumadocs-core/search/server';

import { source } from '@/lib/source';

// The build writes the search index as a static file, and the search dialog
// downloads it and searches in the browser. No server runs in production.
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source);
