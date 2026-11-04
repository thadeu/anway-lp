import { CopyCommand } from '@/components/site/copy-command';

type Way = {
  title: string;
  text: string;
  commands: string[];
  href: string;
  link: string;
};

const ways: Way[] = [
  {
    title: 'Inside a Rails app',
    text: 'The gem carries the server for your platform, and bin/dev starts it with Puma. No Redis, and no migrations.',
    commands: ['bundle add anway', 'bin/rails generate anway:install', 'bin/dev'],
    href: '/docs/ruby',
    link: 'Ruby and Rails guide',
  },
  {
    title: 'As a container',
    text: 'One image for amd64 and arm64. Keep /data on a volume, and set a password before other hosts connect.',
    commands: ['docker run -p 7419:7419 -e SERVER_PASSWORD=change-me -v anway-data:/data ghcr.io/thadeu/anway'],
    href: '/docs/server/docker',
    link: 'Docker guide',
  },
  {
    title: 'With Go or Node.js',
    text: 'Add the client, and set ANWAY_URL to the server address. Workers and pushes use the same URL.',
    commands: ['go get github.com/thadeu/anway-go', 'pnpm add @anway/client'],
    href: '/docs/go',
    link: 'Go and Node.js guides',
  },
];

function WayColumn({ way }: { way: Way }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-xs border border-line bg-panel p-5 md:p-6">
      <h3 className="text-[17px] font-medium text-ink">{way.title}</h3>

      <p className="text-[15px] leading-relaxed text-sub">{way.text}</p>

      <div className="mt-auto flex flex-col gap-2">
        {way.commands.map(command => (
          <CopyCommand key={command} command={command} />
        ))}
      </div>

      <a href={way.href} className="text-[15px] text-green underline-offset-4 hover:underline">
        {way.link}
      </a>
    </div>
  );
}

export function RunIt() {
  return (
    <section className="border-t border-line bg-deep/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.03em] text-ink md:text-[40px]">
            Start where your app is
          </h2>

          <p className="mt-4 text-[17px] leading-relaxed text-sub">
            Anway speaks the Faktory work protocol, so Faktory clients in other languages connect too.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {ways.map(way => (
            <WayColumn key={way.title} way={way} />
          ))}
        </div>
      </div>
    </section>
  );
}
