import type { Metadata } from 'next';

import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Terms',
  description: 'The terms for the Anway website, the software, and its licenses.',
  path: '/terms/',
});

const sections = [
  {
    title: 'The software',
    text: 'Anway is open source. The server is licensed under the GNU Affero General Public License, version 3. The Ruby, Go, and Node.js clients are licensed under the MIT License. The license file in each repository is the full and only license of that code.',
  },
  {
    title: 'No warranty',
    text: 'The software comes as is, with no warranty of any kind, as its licenses say. You are responsible for how you run it, for your data, and for your backups.',
  },
  {
    title: 'This website',
    text: 'This website has documentation only. It does not ask for an account, it does not set cookies, and it does not collect personal data. The search in the docs runs in your browser.',
  },
  {
    title: 'Names and marks',
    text: 'Anway and Clowk are names of Clowk products. The Anway logo files are in the brand folder of the server repository. Do not use them in a way that suggests that Clowk made or approves a product that it did not make.',
  },
  {
    title: 'Changes',
    text: 'These terms can change. The current version is always on this page.',
  },
];

export default function Terms() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-32 md:px-6 md:pt-40">
        <h1 className="font-display text-[40px] font-semibold tracking-[-0.035em] text-ink">Terms</h1>

        <div className="mt-10 flex flex-col gap-10">
          {sections.map(section => (
            <section key={section.title} className="flex flex-col gap-3">
              <h2 className="text-[19px] font-medium text-ink">{section.title}</h2>

              <p className="text-[16px] leading-relaxed text-sub">{section.text}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 text-[14px] text-sub">
          Questions: open an issue on <a href={site.github} className="text-green hover:underline">GitHub</a>.
        </p>
      </main>

      <Footer />
    </>
  );
}
