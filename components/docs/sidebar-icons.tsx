import type { LucideIcon, LucideProps } from 'lucide-react';
import { createElement } from 'react';
import {
  BookMarked,
  BookOpen,
  Boxes,
  Braces,
  Briefcase,
  Cable,
  Clock,
  CodeXml,
  Cog,
  Compass,
  Container,
  Download,
  FileText,
  FlaskConical,
  Fingerprint,
  Folder,
  Gauge,
  Gem,
  HardDrive,
  Hexagon,
  Layers,
  LayoutDashboard,
  Lightbulb,
  ListOrdered,
  Lock,
  Plug,
  Rocket,
  RotateCcw,
  Server,
  Share2,
  SlidersHorizontal,
  Tag,
  TrainFront,
  Zap,
} from 'lucide-react';

// Icons by URL. A section uses the URL of its folder, and a page its own URL.
// A page with no icon here gets the default one, so a new page still works.

const sections: Record<string, LucideIcon> = {
  '/docs/getting-started': Rocket,
  '/docs/concepts': Lightbulb,
  '/docs/ruby': Gem,
  '/docs/go': CodeXml,
  '/docs/nodejs': Hexagon,
  '/docs/server': Server,
  '/docs/reference': BookMarked,
};

const pages: Record<string, LucideIcon> = {
  '/docs': BookOpen,
  '/docs/getting-started': Zap,
  '/docs/getting-started/install': Download,

  '/docs/concepts': Compass,
  '/docs/concepts/jobs': Briefcase,
  '/docs/concepts/queues': ListOrdered,
  '/docs/concepts/retries': RotateCcw,
  '/docs/concepts/scheduled-jobs': Clock,
  '/docs/concepts/unique-jobs': Fingerprint,
  '/docs/concepts/bulk-push': Layers,
  '/docs/concepts/batches': Boxes,
  '/docs/concepts/topics': Share2,
  '/docs/concepts/autoscale': Gauge,

  '/docs/ruby': Gem,
  '/docs/ruby/workers': Cog,
  '/docs/ruby/active-job': TrainFront,
  '/docs/ruby/configuration': SlidersHorizontal,
  '/docs/ruby/topics': Share2,
  '/docs/ruby/testing': FlaskConical,

  '/docs/go': CodeXml,
  '/docs/go/workers': Cog,
  '/docs/go/topics': Share2,

  '/docs/nodejs': Hexagon,
  '/docs/nodejs/workers': Cog,
  '/docs/nodejs/topics': Share2,

  '/docs/server': Server,
  '/docs/server/configuration': SlidersHorizontal,
  '/docs/server/docker': Container,
  '/docs/server/tls': Lock,
  '/docs/server/console': LayoutDashboard,
  '/docs/server/http-api': Braces,
  '/docs/server/operations': HardDrive,

  '/docs/reference/protocol': Cable,
  '/docs/reference/faktory': Plug,
  '/docs/reference/versions': Tag,
};

function sectionIcon(href: string): LucideIcon {
  const folder = href.split('/').slice(0, 3).join('/');

  return sections[folder] ?? Folder;
}

type IconProps = LucideProps & { href: string };

export function SectionIcon({ href, ...props }: IconProps) {
  return createElement(sectionIcon(href), props);
}

export function PageIcon({ href, ...props }: IconProps) {
  return createElement(pages[href] ?? FileText, props);
}
