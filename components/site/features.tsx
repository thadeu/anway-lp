import { Database, Gauge, Layers, LayoutDashboard, RotateCcw, Share2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
  href: string;
};

const features: Feature[] = [
  {
    icon: Database,
    title: 'Jobs on disk',
    text: 'The server writes each job to disk before it replies OK. A crash or a kill -9 does not lose a job that the server accepted.',
    href: '/docs/server/operations',
  },
  {
    icon: RotateCcw,
    title: 'Retries and the Dead set',
    text: 'A failed job runs again later, with a longer wait each time. After its last retry it goes to the Dead set, and you can run it again from the console.',
    href: '/docs/concepts/retries',
  },
  {
    icon: Share2,
    title: 'Topics',
    text: 'Publish one event, and each subscribed service gets its own copy in its own queue. An event with no subscriber waits in the Dead set.',
    href: '/docs/concepts/topics',
  },
  {
    icon: Gauge,
    title: 'Thread autoscale',
    text: 'Workers add threads when jobs wait and remove them when the queue is quiet. Set a maximum, or change the count from the console.',
    href: '/docs/concepts/autoscale',
  },
  {
    icon: Layers,
    title: 'Bulk push',
    text: 'Push up to 1,000 jobs with one call and one disk write. Rails perform_all_later uses it.',
    href: '/docs/concepts/bulk-push',
  },
  {
    icon: LayoutDashboard,
    title: 'Web console',
    text: 'See queues, jobs, workers, topics, and throughput as they change. Retry, delete, and scale from the browser.',
    href: '/docs/server/console',
  },
];

function FeatureItem({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <a href={feature.href} className="group flex flex-col gap-3 bg-navy p-6 outline-1 outline-line hover:bg-panel md:p-7">
      <Icon size={20} className="text-green" aria-hidden="true" />

      <h3 className="text-[17px] font-medium text-ink">{feature.title}</h3>

      <p className="text-[15px] leading-relaxed text-sub">{feature.text}</p>
    </a>
  );
}

export function Features() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <h2 className="max-w-2xl font-display text-[30px] font-semibold leading-tight tracking-[-0.03em] text-ink md:text-[40px]">
          What the server does for you
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xs border border-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => (
            <FeatureItem key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
