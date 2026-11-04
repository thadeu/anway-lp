// The hero picture: apps in three languages push jobs to one Anway server,
// the jobs wait in queues on disk, and workers in three languages run them.
// Jobs travel the lines as dots, white on the way in and green on the way
// out, as in the mark. The wide drawing is for desktop, the tall one for a
// phone. The dots stop when the reader asks for less motion (globals.css).

type Box = { x: number; y: number; w: number; h: number };

type Point = [number, number];

type Layout = {
  width: number;
  height: number;
  apps: Box[];
  server: Box;
  workers: Box[];
  inPaths: string[];
  outPaths: string[];
  compact: boolean;
};

const apps = [
  { name: 'Rails app', short: 'Rails', sub: 'perform_async' },
  { name: 'Go service', short: 'Go', sub: 'client.Push' },
  { name: 'Node.js API', short: 'Node.js', sub: 'client.push' },
];

const workers = [
  { name: 'Ruby worker', short: 'Ruby', from: 0.25, to: 0.85, delay: '0s' },
  { name: 'Go worker', short: 'Go', from: 0.4, to: 1, delay: '1.5s' },
  { name: 'Node.js worker', short: 'Node.js', from: 0.15, to: 0.6, delay: '3s' },
];

const totals = [
  { name: 'Scheduled', count: '48' },
  { name: 'Retries', count: '12' },
  { name: 'Dead', count: '0' },
];

const queues = [
  { name: 'default', count: '1,204', fill: 0.62 },
  { name: 'mailers', count: '86', fill: 0.18 },
  { name: 'products', count: '3,410', fill: 0.94 },
];

function horizontal(from: Point, to: Point) {
  const bend = (to[0] - from[0]) / 2;

  return `M ${from[0]} ${from[1]} C ${from[0] + bend} ${from[1]}, ${to[0] - bend} ${to[1]}, ${to[0]} ${to[1]}`;
}

function vertical(from: Point, to: Point) {
  const bend = (to[1] - from[1]) / 2;

  return `M ${from[0]} ${from[1]} C ${from[0]} ${from[1] + bend}, ${to[0]} ${to[1] - bend}, ${to[0]} ${to[1]}`;
}

function wideLayout(): Layout {
  const rows = [28, 158, 288];
  const doors = [150, 190, 230];

  const appBoxes = rows.map(y => ({ x: 1, y, w: 220, h: 64 }));
  const server = { x: 440, y: 20, w: 240, h: 340 };
  const workerBoxes = rows.map(y => ({ x: 899, y, w: 220, h: 64 }));

  const inPaths = appBoxes.map((box, i) => horizontal([box.x + box.w, box.y + 32], [server.x, doors[i]]));
  const outPaths = workerBoxes.map((box, i) => horizontal([server.x + server.w, doors[i]], [box.x, box.y + 32]));

  return {
    width: 1120,
    height: 380,
    apps: appBoxes,
    server,
    workers: workerBoxes,
    inPaths,
    outPaths,
    compact: false,
  };
}

function tallLayout(): Layout {
  const columns = [1, 128, 255];
  const doors = [140, 180, 220];

  const appBoxes = columns.map(x => ({ x, y: 1, w: 104, h: 56 }));
  const server = { x: 30, y: 190, w: 300, h: 330 };
  const workerBoxes = columns.map(x => ({ x, y: 653, w: 104, h: 66 }));

  const inPaths = appBoxes.map((box, i) => vertical([box.x + box.w / 2, box.y + box.h], [doors[i], server.y]));
  const outPaths = workerBoxes.map((box, i) => vertical([doors[i], server.y + server.h], [box.x + box.w / 2, box.y]));

  return {
    width: 360,
    height: 720,
    apps: appBoxes,
    server,
    workers: workerBoxes,
    inPaths,
    outPaths,
    compact: true,
  };
}

function Hops({ path, color, offset }: { path: string; color: string; offset: number }) {
  const starts = [0, 1.1, 2.2];

  return (
    <g className="hop">
      {starts.map(start => (
        <circle key={start} r="4.5" fill={color} opacity="0">
          <animateMotion dur="3.3s" begin={`${start + offset}s`} repeatCount="indefinite" path={path} />

          <animate
            attributeName="opacity"
            dur="3.3s"
            begin={`${start + offset}s`}
            repeatCount="indefinite"
            values="0;1;1;0"
            keyTimes="0;0.12;0.86;1"
          />
        </circle>
      ))}
    </g>
  );
}

function Node({ box, title, sub }: { box: Box; title: string; sub?: string }) {
  const middle = box.y + box.h / 2;

  return (
    <g>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="2" className="fill-panel stroke-line" />

      <text x={box.x + 16} y={sub ? middle - 4 : middle + 5} className="fill-ink text-[14px] font-medium">
        {title}
      </text>

      {sub && (
        <text x={box.x + 16} y={middle + 15} className="fill-sub font-mono text-[12px]">
          {sub}
        </text>
      )}
    </g>
  );
}

function WorkerNode({ box, worker, compact }: { box: Box; worker: (typeof workers)[number]; compact: boolean }) {
  const pad = compact ? 12 : 16;
  const barWidth = box.w - pad * 2;
  const barY = box.y + box.h - (compact ? 18 : 20);

  const barStyle = {
    '--bar-from': worker.from,
    '--bar-to': worker.to,
    '--bar-delay': worker.delay,
    transformBox: 'fill-box',
  } as React.CSSProperties;

  return (
    <g>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="2" className="fill-panel stroke-line" />

      <text x={box.x + pad} y={box.y + (compact ? 24 : 26)} className="fill-ink text-[14px] font-medium">
        {compact ? worker.short : worker.name}
      </text>

      {!compact && (
        <text x={box.x + box.w - pad} y={box.y + 26} textAnchor="end" className="fill-sub text-[12px]">
          autoscale
        </text>
      )}

      <rect x={box.x + pad} y={barY} width={barWidth} height="5" rx="1" className="fill-line" />

      <rect x={box.x + pad} y={barY} width={barWidth} height="5" rx="1" className="thread-bar fill-green" style={barStyle} />
    </g>
  );
}

function Server({ layout }: { layout: Layout }) {
  const { server } = layout;
  const pad = 18;
  const rowHeight = 46;

  const markSize = 26;
  const headY = server.y + 22;

  return (
    <g>
      <rect x={server.x} y={server.y} width={server.w} height={server.h} rx="2" className="fill-bar stroke-line2" />

      <image href="/brand/mark-on-dark.svg" x={server.x + pad - 4} y={headY - 2} width={markSize} height={markSize} />

      <text x={server.x + pad + markSize + 4} y={headY + 17} className="fill-ink font-display text-[18px] font-semibold">
        anway
      </text>

      <text x={server.x + server.w - pad} y={headY + 17} textAnchor="end" className="fill-sub font-mono text-[12px]">
        :7419
      </text>

      <line
        x1={server.x}
        x2={server.x + server.w}
        y1={headY + 40}
        y2={headY + 40}
        className="stroke-line"
      />

      <text x={server.x + pad} y={headY + 66} className="fill-sub text-[12px]">
        Queues on disk
      </text>

      {queues.map((queue, i) => {
        const top = server.y + 100 + i * rowHeight;
        const barWidth = server.w - pad * 2;

        return (
          <g key={queue.name}>
            <text x={server.x + pad} y={top + 14} className="fill-ink font-mono text-[13px]">
              {queue.name}
            </text>

            <text x={server.x + server.w - pad} y={top + 14} textAnchor="end" className="fill-sub font-mono text-[13px]">
              {queue.count}
            </text>

            <rect x={server.x + pad} y={top + 24} width={barWidth} height="4" rx="1" className="fill-line" />

            <rect x={server.x + pad} y={top + 24} width={barWidth * queue.fill} height="4" rx="1" className="fill-sky" />
          </g>
        );
      })}

      <Totals server={server} />
    </g>
  );
}

// The sets beside the queues, in one row at the bottom of the server.
function Totals({ server }: { server: Box }) {
  const pad = 18;
  const top = server.y + server.h - 66;
  const column = (server.w - pad * 2) / totals.length;

  return (
    <g>
      <line x1={server.x} x2={server.x + server.w} y1={top} y2={top} className="stroke-line" />

      {totals.map((total, i) => {
        const x = server.x + pad + column * i;

        return (
          <g key={total.name}>
            <text x={x} y={top + 26} className="fill-sub text-[12px]">
              {total.name}
            </text>

            <text x={x} y={top + 48} className="fill-ink font-mono text-[15px]">
              {total.count}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Drawing({ layout, className }: { layout: Layout; className: string }) {
  const label =
    'Diagram: a Rails app, a Go service, and a Node.js API push jobs to one Anway server. The jobs wait in queues on disk, and Ruby, Go, and Node.js workers run them. Each worker adds threads when its queue grows.';

  return (
    <svg viewBox={`0 0 ${layout.width} ${layout.height}`} className={className} role="img" aria-label={label}>
      {layout.inPaths.map(path => (
        <path key={path} d={path} fill="none" strokeWidth="2" className="stroke-line2" />
      ))}

      {layout.outPaths.map(path => (
        <path key={path} d={path} fill="none" strokeWidth="2" className="stroke-line2" />
      ))}

      {layout.inPaths.map((path, i) => (
        <Hops key={path} path={path} color="#E7ECF5" offset={i * 0.35} />
      ))}

      {layout.outPaths.map((path, i) => (
        <Hops key={path} path={path} color="#3DDC97" offset={1.6 + i * 0.35} />
      ))}

      {layout.apps.map((box, i) => (
        <Node
          key={apps[i].name}
          box={box}
          title={layout.compact ? apps[i].short : apps[i].name}
          sub={layout.compact ? undefined : apps[i].sub}
        />
      ))}

      <Server layout={layout} />

      {layout.workers.map((box, i) => (
        <WorkerNode key={workers[i].name} box={box} worker={workers[i]} compact={layout.compact} />
      ))}
    </svg>
  );
}

export function RouteMap() {
  return (
    <div>
      <Drawing layout={wideLayout()} className="hidden h-auto w-full md:block" />

      <Drawing layout={tallLayout()} className="mx-auto block h-auto w-full max-w-[400px] md:hidden" />
    </div>
  );
}
