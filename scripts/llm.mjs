// Writes the files for AI assistants before each build, from the docs
// frontmatter and the meta.json order, so they never go out of date:
//
// - public/llms.txt: a summary of Anway and one line for each docs page.
// - public/llms-full.txt: every docs page in full, as plain markdown.
// - public/llm.txt: the same as llms.txt, for tools that use this name.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const site = 'https://anway.clowk.in';
const root = 'content/docs';

const summary =
  'Anway is an open source background job server by Clowk. Ruby and Rails, Go, and Node.js apps push jobs to one server, and workers in any of these languages run them. It speaks the Faktory work protocol.';

const header = [
  '# Anway',
  '',
  `> ${summary}`,
  '',
  '- Website: https://anway.clowk.in',
  '- Server: https://github.com/thadeu/anway (AGPL-3.0)',
  '- Clients: gem `anway`, Go module `github.com/thadeu/anway-go`, npm `@anway/client` (MIT)',
  '- Full docs in one file: https://anway.clowk.in/llms-full.txt',
  '',
];

function split(file) {
  const text = readFileSync(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  const fields = {};

  if (!match) return { fields, body: text };

  for (const line of match[1].split('\n')) {
    const field = line.match(/^(\w+):\s*(.*)$/);

    if (field) fields[field[1]] = field[2].replace(/^['"]|['"]$/g, '');
  }

  return { fields, body: text.slice(match[0].length) };
}

// The docs pages in the order of the sidebar, as { file, url }.
function pages() {
  const top = JSON.parse(readFileSync(join(root, 'meta.json'), 'utf8'));
  const list = [];

  for (const name of top.pages) {
    if (name.startsWith('---')) continue;

    if (name === 'index') {
      list.push({ section: 'Docs', file: join(root, 'index.mdx'), url: `${site}/docs/` });

      continue;
    }

    const meta = JSON.parse(readFileSync(join(root, name, 'meta.json'), 'utf8'));
    const names = ['index', ...meta.pages.filter(page => page !== 'index' && !page.startsWith('---'))];

    for (const page of names) {
      const file = join(root, name, `${page}.mdx`);

      if (!existsSync(file)) continue;

      const path = page === 'index' ? `${name}/` : `${name}/${page}/`;

      list.push({ section: meta.title, file, url: `${site}/docs/${path}` });
    }
  }

  return list;
}

// MDX components become plain markdown: a card is a link, a tab is a bold
// label, and the wrapper tags go away.
function plain(body) {
  return body
    .replace(/<Card\s+title="([^"]*)"\s+href="([^"]*)"\s+description="([^"]*)"\s*\/>/g, (_, title, href, text) => {
      const url = href.startsWith('/') ? `${site}${href}` : href;

      return `- [${title}](${url}): ${text}`;
    })
    .replace(/<Tab value="([^"]*)">/g, '**$1**')
    .replace(/<Callout[^>]*title="([^"]*)"[^>]*>/g, '**$1:**')
    .replace(/^\s*<\/?(Tabs|Tab|Steps|Step|Cards|Callout)[^>]*>\s*$/gm, '')
    .replace(/<\/?(Tabs|Tab|Steps|Step|Cards|Callout)[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const list = pages();

const index = [...header];
let section = '';

for (const page of list) {
  const { fields } = split(page.file);

  if (page.section !== section) {
    index.push('', `## ${page.section}`, '');

    section = page.section;
  }

  index.push(`- [${fields.title}](${page.url}): ${fields.description}`);
}

const full = [...header];

for (const page of list) {
  const { fields, body } = split(page.file);

  full.push('---', '', `# ${fields.title}`, '', `URL: ${page.url}`, '', `> ${fields.description}`, '', plain(body), '');
}

const indexText = `${index.join('\n').replace(/\n{3,}/g, '\n\n')}\n`;

writeFileSync('public/llms.txt', indexText);
writeFileSync('public/llm.txt', indexText);
writeFileSync('public/llms-full.txt', `${full.join('\n')}\n`);

console.warn(`llms.txt: ${list.length} pages`);
