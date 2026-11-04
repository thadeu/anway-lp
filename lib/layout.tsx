import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { Logo } from '@/components/brand/logo';
import { site } from '@/lib/site';

// The options that the docs layout shares with any other Fumadocs layout.
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo height={20} />,
    url: '/',
  },
  githubUrl: site.github,
  themeSwitch: { enabled: false },
};
