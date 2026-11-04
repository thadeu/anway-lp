import { highlight } from 'fumadocs-core/highlight';
import Link from 'next/link';

type Panel = {
  language: string;
  file: string;
  role: string;
  lang: 'go' | 'ruby' | 'ts';
  code: string;
};

const panels: Panel[] = [
  {
    language: 'Go',
    file: 'checkout/paid.go',
    role: 'Publishes',
    lang: 'go',
    code: `opts := anway.PublishOptions{ID: order.ID}

_, err := client.Publish(
	ctx,
	"order.paid",
	[]any{order},
	opts,
)

if err != nil {
	return err
}

log.Printf("order %s published", order.ID)

return nil`,
  },
  {
    language: 'Ruby',
    file: 'app/jobs/send_receipt.rb',
    role: 'Subscribes',
    lang: 'ruby',
    code: `class SendReceipt
  include Anway::Worker

  anway_options(
    queue: "mailers",
    topics: %w[order.paid]
  )

  def perform(order)
    ReceiptMailer
      .paid(order)
      .deliver_now
  end
end`,
  },
  {
    language: 'Node.js',
    file: 'reports/worker.ts',
    role: 'Subscribes',
    lang: 'ts',
    code: `import Anway from '@anway/client';

const worker = new Anway.Worker();

const subscribe = {
  queue: 'reports',
  topics: ['order.paid'],
};

worker.on(
  'reports.order',
  async job => {
    await reports.add(job.args[0]);
  },
  subscribe,
);

await worker.run();`,
  },
];

async function CodePanel({ panel }: { panel: Panel }) {
  const code = await highlight(panel.code, { lang: panel.lang, theme: 'github-dark-default' });

  return (
    <figure className="code-panel flex min-w-0 flex-col rounded-xs border border-line bg-deep">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="flex min-w-0 items-baseline gap-2.5">
          <span className="text-[14px] font-medium text-ink">{panel.language}</span>

          <span className="truncate font-mono text-[12px] text-sub">{panel.file}</span>
        </span>

        <span className="flex-none rounded-xs bg-panel2 px-2 py-0.5 text-[12px] text-sub">{panel.role}</span>
      </figcaption>

      {code}
    </figure>
  );
}

export function Flow() {
  return (
    <section className="border-t border-line bg-deep/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.03em] text-ink md:text-[40px]">
            One event, three services
          </h2>

          <p className="mt-4 text-[17px] leading-relaxed text-sub">
            A Go service publishes <code className="font-mono text-[15px] text-ink">order.paid</code>. The Rails app
            sends the receipt, and a Node.js service updates the reports. Each subscriber gets its own copy of the
            event, in its own queue, with its own retries. A slow subscriber never blocks the others.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {panels.map(panel => (
            <CodePanel key={panel.language} panel={panel} />
          ))}
        </div>

        <p className="mt-6 text-[15px] text-sub">
          <Link href="/docs/concepts/topics" className="text-green underline-offset-4 hover:underline">
            Read how topics work
          </Link>
        </p>
      </div>
    </section>
  );
}
