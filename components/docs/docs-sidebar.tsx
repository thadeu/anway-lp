'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/brand/logo';
import { VersionBadge } from '@/components/brand/version-badge';
import { PageIcon, SectionIcon } from '@/components/docs/sidebar-icons';
import { site } from '@/lib/site';
import type { SidebarSection } from '@/lib/sidebar';

type Props = {
  sections: SidebarSection[];
  commit?: string;
};

// The docs sidebar, fixed at the left edge as in the Blackevin docs. On a
// wide screen it is always open. On a phone, a top bar has the logo, search,
// and a menu button that opens the sidebar as a drawer.
export function DocsSidebar({ sections, commit }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const overlayClass = [
    'fixed inset-0 z-40 bg-deep/60 backdrop-blur-sm transition-opacity lg:hidden',
    open ? 'opacity-100' : 'pointer-events-none opacity-0',
  ].join(' ');

  const asideClass = [
    'docs-sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r border-line bg-navy',
    'transition-transform duration-300 lg:translate-x-0',
    open ? 'translate-x-0' : '-translate-x-full',
  ].join(' ');

  return (
    <>
      <MobileBar onOpen={() => setOpen(true)} />

      <div className={overlayClass} onClick={() => setOpen(false)} aria-hidden="true" />

      <aside className={asideClass} aria-label="Docs">
        <div className="flex h-14 flex-none items-center justify-between border-b border-line pl-5 pr-3">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Anway home">
              <Logo height={20} />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-sub">docs</span>
            </Link>

            <VersionBadge />
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex size-9 items-center justify-center rounded-xs text-sub hover:bg-panel2 hover:text-ink lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-none px-3 pt-3">
          <SearchButton />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {sections.map(section => (
            <SectionGroup key={section.title} section={section} pathname={pathname} />
          ))}
        </nav>

        <SidebarFooter commit={commit} />
      </aside>
    </>
  );
}

function MobileBar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="docs-mobile-bar fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-navy/95 pl-4 pr-2 pt-[env(safe-area-inset-top)] backdrop-blur lg:hidden">
      <div className="flex items-center gap-2.5">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Anway home">
          <Logo height={20} />

          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-sub">docs</span>
        </Link>

        <VersionBadge />
      </div>

      <div className="flex items-center">
        <SearchIconButton />

        <button
          type="button"
          onClick={onOpen}
          className="flex size-10 items-center justify-center rounded-xs text-ink hover:bg-panel2"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </div>
  );
}

function SearchButton() {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="flex h-9 w-full items-center gap-2 rounded-xs border border-line bg-deep px-3 text-[14px] text-sub hover:border-line2 hover:text-ink"
    >
      <Search size={15} />

      <span className="flex-1 text-left">Search</span>

      <kbd className="rounded-xs border border-line px-1.5 font-mono text-[11px] text-sub">⌘K</kbd>
    </button>
  );
}

function SearchIconButton() {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="flex size-10 items-center justify-center rounded-xs text-ink hover:bg-panel2"
      aria-label="Search the docs"
    >
      <Search size={18} />
    </button>
  );
}

// Next renders paths with a trailing slash, and the tree has none.
function normalize(path: string) {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

function SectionGroup({ section, pathname }: { section: SidebarSection; pathname: string }) {
  const current = normalize(pathname);
  const active = section.items.some(item => item.href === current);

  const [open, setOpen] = useState(active);
  const [wasActive, setWasActive] = useState(active);
  const activeRef = useRef<HTMLAnchorElement>(null);

  if (active !== wasActive) {
    setWasActive(active);

    if (active) setOpen(true);
  }

  useEffect(() => {
    if (active) activeRef.current?.scrollIntoView({ block: 'nearest' });
  }, [active, pathname]);

  const listClass = [
    'grid transition-all duration-200 ease-out',
    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
  ].join(' ');

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 rounded-xs px-3 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink hover:bg-panel"
      >
        <SectionIcon href={section.href} size={14} className="text-sub" />

        <span className="flex-1">{section.title}</span>

        {!open && active && <span className="size-1.5 rounded-full bg-green" aria-label="Has the open page" />}

        <ChevronDown size={13} className={`text-sub transition-transform duration-200 ${open ? '' : '-rotate-90'}`} />
      </button>

      <div className={listClass}>
        <div className="overflow-hidden">
          <div className="pb-1 pt-0.5">
            {section.items.map(item => (
              <SidebarLink key={item.href} item={item} active={item.href === current} activeRef={activeRef} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type LinkProps = {
  item: SidebarSection['items'][number];
  active: boolean;
  activeRef: React.RefObject<HTMLAnchorElement | null>;
};

function SidebarLink({ item, active, activeRef }: LinkProps) {
  const linkClass = [
    'flex items-center gap-2.5 border-l-2 py-1.5 pl-[14px] pr-3 text-[14px] transition-colors',
    active ? 'border-green bg-panel2 font-medium text-ink' : 'border-transparent text-sub hover:bg-panel hover:text-ink',
  ].join(' ');

  return (
    <Link href={item.href} ref={active ? activeRef : undefined} className={linkClass} aria-current={active ? 'page' : undefined}>
      <PageIcon href={item.href} size={16} className={active ? 'text-green' : 'opacity-70'} />

      {item.title}
    </Link>
  );
}

function SidebarFooter({ commit }: { commit?: string }) {
  return (
    <div className="flex-none border-t border-line px-5 py-3">
      {commit && <p className="mb-2 font-mono text-[11px] text-sub">build {commit}</p>}

      <div className="flex items-center gap-4">
        <a href={site.github} className="flex items-center gap-2 text-[13px] text-sub hover:text-ink" aria-label="Anway on GitHub">
          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>

        <Link href="/" className="text-[13px] text-sub hover:text-ink">
          anway.clowk.in
        </Link>

        <a href={site.cloud} className="ml-auto text-[13px] font-medium text-green hover:text-ink">
          Sign in
        </a>
      </div>
    </div>
  );
}
