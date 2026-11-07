import Link from 'next/link';

import { ReleaseLine } from '@/components/brand/version-badge';
import { CopyCommand } from '@/components/site/copy-command';
import { RouteMap } from '@/components/site/route-map';
import { site } from '@/lib/site';

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
      <div className="max-w-3xl">
        <ReleaseLine />

        <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink md:text-[64px]">
          Background jobs for every language in your stack
        </h1>

        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-sub md:text-[19px]">
          Anway is one small server for background jobs. Your Rails app, your Go services, and your Node.js APIs push
          jobs to the same queues, and workers in any of these languages run them.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={site.cloud}
            className="rounded-xs bg-green px-5 py-3 text-center text-[15px] font-medium text-navy hover:bg-[#5ce6aa]"
          >
            Start free on Anway Cloud
          </a>

          <Link
            href="/docs/getting-started"
            className="rounded-xs border border-line2 px-5 py-3 text-center text-[15px] font-medium text-ink hover:bg-panel2"
          >
            Read the quickstart
          </Link>

          <a
            href={site.github}
            className="rounded-xs border border-line2 px-5 py-3 text-center text-[15px] font-medium text-ink hover:bg-panel2"
          >
            View on GitHub
          </a>
        </div>

        <p className="mt-3 text-[13px] text-sub">A Hobby server on Anway Cloud is free forever. No card needed.</p>

        <div className="mt-6 max-w-2xl">
          <CopyCommand command="docker run -p 7419:7419 -v anway-data:/data ghcr.io/thadeu/anway" />
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <RouteMap />
      </div>
    </section>
  );
}
