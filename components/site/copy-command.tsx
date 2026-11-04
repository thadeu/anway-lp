'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

// One shell command with a copy button. A long command wraps, so the reader
// sees all of it on a narrow screen.
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);

    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const Icon = copied ? Check : Copy;

  return (
    <div className="flex min-w-0 items-stretch rounded-xs border border-line bg-deep">
      <span className="select-none py-2.5 pl-3.5 font-mono text-[13px] leading-snug text-sub" aria-hidden="true">
        $
      </span>

      <code className="min-w-0 flex-1 px-2.5 py-2.5 font-mono text-[13px] leading-snug text-ink [overflow-wrap:anywhere]">
        {command}
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
