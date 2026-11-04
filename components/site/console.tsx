import Link from 'next/link';

const points = [
  'Throughput and threads on one chart, with a drag to zoom into a time slice',
  'Queues, workers, topics, and schedules, live as they change',
  'Retry, delete, pause, and scale from the browser',
];

export function Console() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.03em] text-ink md:text-[40px]">
            See every job as it runs
          </h2>

          <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-sub">
            {points.map(point => (
              <li key={point} className="flex gap-3">
                <span className="mt-[9px] size-1.5 flex-none rounded-full bg-green" aria-hidden="true" />

                {point}
              </li>
            ))}
          </ul>
        </div>

        <figure className="mt-12 overflow-hidden rounded-xs border border-line2 bg-deep">
          <a href="/screens/console-2576.webp" aria-label="Open the console screenshot at full size">
            <picture>
              <source type="image/webp" srcSet="/screens/console-1400.webp 1400w, /screens/console-2576.webp 2576w" sizes="(min-width: 1152px) 1104px, 100vw" />

              <img
                src="/screens/console-2576.webp"
                alt="The Anway web console: job counts, a throughput chart with a threads line, queues, workers, and running jobs."
                width={2576}
                height={1266}
                loading="lazy"
                className="block h-auto w-full"
              />
            </picture>
          </a>
        </figure>

        <p className="mt-3 text-[13px] text-sub md:hidden">Tap the image to see it at full size.</p>

        <p className="mt-6 text-[15px] text-sub">
          <Link href="/docs/server/console" className="text-green underline-offset-4 hover:underline">
            Run the console
          </Link>
        </p>
      </div>
    </section>
  );
}
