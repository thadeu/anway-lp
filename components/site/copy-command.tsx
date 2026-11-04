'use client';

import { Check, Copy } from 'lucide-react';
import { Fragment, useState } from 'react';

// One shell command with a copy button. A long command wraps between words,
// never inside one, so the reader sees all of it on a narrow screen.
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);

    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const Icon = copied ? Check : Copy;
  const words = command.split(' ');

  return (
    <div className="flex min-w-0 items-stretch rounded-xs border border-line bg-deep">
      <span className="select-none py-2.5 pl-3 font-mono text-[12.5px] leading-snug text-sub sm:pl-3.5 sm:text-[13px]" aria-hidden="true">
        $
      </span>

      <code className="min-w-0 flex-1 px-2.5 py-2.5 font-mono text-[12.5px] leading-snug text-ink sm:text-[13px]">
        {words.map((word, index) => (
          <Fragment key={index}>
            {index > 0 && ' '}

            <span className="whitespace-nowrap">{word}</span>
          </Fragment>
        ))}
      </code>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy command'}
        className="flex w-10 flex-none items-center justify-center border-l border-line text-sub hover:bg-panel2 hover:text-ink"
      >
        <Icon size={15} className={copied ? 'text-green' : undefined} />
      </button>
    </div>
  );
}
