'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/brand/logo';
import { VersionBadge } from '@/components/brand/version-badge';
import { site } from '@/lib/site';

const links = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/getting-started', label: 'Quickstart' },
  { href: '/docs/concepts', label: 'Concepts' },
  { href: site.github, label: 'GitHub' },
];

// The bar hides when the reader scrolls down and shows again on the way up.
// On a phone, the menu button opens a full screen menu and locks the page
// scroll behind it.
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;

      setHidden(y > lastScrollY.current && y > 80);

      lastScrollY.current = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const barClass = [
    'fixed inset-x-0 top-0 z-40 border-b border-line bg-navy/90 pt-[env(safe-area-inset-top)] backdrop-blur',
    'transition-transform duration-300',
    hidden && !open ? '-translate-y-full' : 'translate-y-0',
  ].join(' ');

  // The menu is a sibling of the header, not a child: the blur and the slide
  // of the header make it the box of any fixed child, and the menu must cover
  // the whole screen.
  return (
    <>
      <header className={barClass}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <Link href="/" aria-label="Anway home" className="rounded-xs">
              <Logo height={22} />
            </Link>

            <VersionBadge />
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map(link => (
              <a key={link.href} href={link.href} className="rounded-xs px-3 py-2 text-[14px] text-sub hover:bg-panel2 hover:text-ink">
                {link.label}
              </a>
            ))}

            <a
              href={site.cloud}
              className="ml-2 rounded-xs border border-line px-3.5 py-2 text-[14px] font-medium text-ink hover:bg-panel2"
            >
              Sign in
            </a>

            <Link
              href="/docs/getting-started"
              className="ml-2 rounded-xs bg-green px-3.5 py-2 text-[14px] font-medium text-navy hover:bg-[#5ce6aa]"
            >
              Get started
            </Link>
          </nav>

          <MenuButton open={open} onToggle={() => setOpen(value => !value)} />
        </div>
      </header>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}

function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const bar = 'absolute left-0 h-0.5 w-5 rounded-full bg-ink transition-all duration-200';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="relative -mr-2 flex size-10 items-center justify-center rounded-xs md:hidden"
    >
      <span className="relative block h-3.5 w-5">
        <span className={`${bar} ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />

        <span className={`${bar} top-1.5 ${open ? 'opacity-0' : 'opacity-100'}`} />

        <span className={`${bar} ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
      </span>
    </button>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <nav
      id="mobile-menu"
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-40 flex flex-col gap-1 bg-navy px-4 py-6 md:hidden"
    >
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="rounded-xs px-3 py-3 font-display text-[22px] font-medium text-ink hover:bg-panel2"
        >
          {link.label}
        </a>
      ))}

      <a
        href={site.cloud}
        onClick={onClose}
        className="mt-4 rounded-xs border border-line px-4 py-3 text-center text-[16px] font-medium text-ink"
      >
        Sign in
      </a>

      <Link
        href="/docs/getting-started"
        onClick={onClose}
        className="mt-2 rounded-xs bg-green px-4 py-3 text-center text-[16px] font-medium text-navy"
      >
        Get started
      </Link>
    </nav>
  );
}
