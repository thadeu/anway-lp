import { site } from '@/lib/site';

// The current server version, as a small link to its GitHub release.
export function VersionBadge() {
  return (
    <a
      href={site.release}
      title={`Anway server v${site.version}: release notes`}
      className="rounded-xs border border-greenwash bg-greenwash/60 px-1.5 py-0.5 font-mono text-[11px] leading-none text-green hover:border-green/50"
    >
      v{site.version}
    </a>
  );
}

// The release line above the hero title: the version, and a link to what
// changed in it.
export function ReleaseLine() {
  return (
    <a
      href={site.release}
      className="inline-flex items-center gap-2.5 rounded-xs border border-line bg-panel px-3 py-1.5 text-[13px] text-sub hover:border-line2 hover:text-ink"
    >
      <span className="size-1.5 rounded-full bg-green" aria-hidden="true" />

      <span>
        Server <span className="font-mono text-ink">v{site.version}</span>
      </span>

      <span className="h-3.5 w-px bg-line2" aria-hidden="true" />

      <span className="text-green">Release notes</span>
    </a>
  );
}
