import { site } from '@/lib/site';

const groups = [
  {
    title: 'Docs',
    links: [
      { href: '/docs/getting-started', label: 'Quickstart' },
      { href: '/docs/concepts', label: 'Concepts' },
      { href: '/docs/server', label: 'Run the server' },
    ],
  },
  {
    title: 'Clients',
    links: [
      { href: '/docs/ruby', label: 'Ruby and Rails' },
      { href: '/docs/go', label: 'Go' },
      { href: '/docs/nodejs', label: 'Node.js and Bun' },
    ],
  },
  {
    title: 'Project',
    links: [
      { href: site.github, label: 'GitHub' },
      { href: '/terms', label: 'Terms' },
      { href: '/llms.txt', label: 'llms.txt' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <a href={site.clowk} aria-label="Clowk">
            <img src="/brand/lockup-clowk-on-dark.svg" alt="Anway by Clowk" width={186} height={25} />
          </a>

          <p className="max-w-xs text-[14px] leading-relaxed text-sub">
            Open source. The server is AGPL-3.0, and the clients are MIT.
          </p>
        </div>

        {groups.map(group => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="text-[14px] font-medium text-ink">{group.title}</h3>

            {group.links.map(link => (
              <a key={link.href} href={link.href} className="text-[14px] text-sub hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
