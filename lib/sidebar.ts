import type { Folder, Item, Node, Root } from 'fumadocs-core/page-tree';

// The docs sidebar comes from the page tree, so the meta.json files stay the
// one place for the order: a new page shows in the sidebar with no change
// here. Each folder is a section, and each page is an item.

export type SidebarItem = {
  title: string;
  href: string;
};

export type SidebarSection = {
  title: string;
  href: string;
  items: SidebarItem[];
};

function text(name: unknown) {
  return typeof name === 'string' ? name : String(name ?? '');
}

// The section already names the language, so "Go workers" shows as
// "Workers" under Go. The page keeps its full title as its heading.
function short(title: string, folder: Folder) {
  const language = text(folder.name).split(' ')[0];
  const rest = title.startsWith(`${language} `) ? title.slice(language.length + 1) : title;

  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

function item(page: Item, folder?: Folder): SidebarItem {
  const title = text(page.name);

  if (!folder) return { title, href: page.url };

  if (title === text(folder.name)) return { title: 'Overview', href: page.url };

  return { title: short(title, folder), href: page.url };
}

function pages(nodes: Node[]) {
  return nodes.filter((node): node is Item => node.type === 'page');
}

// Pages at the top level, such as the introduction, open the first section,
// so the reader sees them with the quickstart.
export function sidebarSections(tree: Root): SidebarSection[] {
  const loose = pages(tree.children).map(page => item(page));
  const folders = tree.children.filter((node): node is Folder => node.type === 'folder');

  return folders.map((folder, index) => {
    const own = [folder.index, ...pages(folder.children)].filter((page): page is Item => Boolean(page));
    const items = own.map(page => item(page, folder));

    return {
      title: text(folder.name),
      href: folder.index?.url ?? items[0]?.href ?? '/docs',
      items: index === 0 ? [...loose, ...items] : items,
    };
  });
}
