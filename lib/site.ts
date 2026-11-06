// The current server version. The server and all clients share one version
// number, so this is also the client version. Change it at each release.
const version = '0.5.3';

// One place for the names and links that the landing page, the docs, and the
// metadata share.
export const site = {
  name: 'Anway',
  url: 'https://anway.clowk.in',
  description:
    'Anway is an open source background job server. Ruby, Go, and Node.js apps push jobs to one server, and workers in any of them run the jobs.',
  github: 'https://github.com/thadeu/anway',
  clowk: 'https://clowk.in',
  version,
  release: `https://github.com/thadeu/anway/releases/tag/v${version}`,
};
