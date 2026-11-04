# anway-lp

The landing page and the docs of [Anway](https://github.com/thadeu/anway), at **https://anway.clowk.in** and **https://anway.clowk.in/docs**.

## Stack

- Next.js 16 with `output: 'export'`: a static site in `out/`.
- Fumadocs for the docs. The pages are MDX files in `content/docs/`, and each folder has a `meta.json` with its title and page order.
- Tailwind CSS 4, with the tokens of the web console (`app/globals.css`).
- Cloudflare Workers with static assets (`wrangler.toml`).

## Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Write docs

- Add or change a page in `content/docs/<section>/<page>.mdx`, with `title` and `description` in the frontmatter.
- Add a new page to the `pages` list of its folder `meta.json`.
- Components with no import: `Callout`, `Cards`, `Card`, `Tabs`, `Tab`, `Steps`, `Step`.
- Take every fact from the server and client repositories. The internal docs of the server are in `docs/dev/` of `thadeu/anway`.

## Version

The landing page and the docs show the current server version, with a link to its release notes. It is `version` in `lib/site.ts`. Change it at each release of the server.

## Build

```bash
pnpm lint
pnpm typecheck
pnpm build
```

`prebuild` runs `scripts/llm.mjs`, which writes `public/llms.txt`, `public/llms-full.txt`, and `public/llm.txt` from the docs. The build also writes `sitemap.xml` and `robots.txt`.

## Deploy

A push to `main` deploys with `.github/workflows/deploy.yml`. A pull request only builds. The workflow needs these repository secrets:

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | A token with Account > Workers Scripts: Edit, and Zone > Workers Routes: Edit on `clowk.in` |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account id |

The route `anway.clowk.in/*` needs a proxied DNS record for `anway.clowk.in` in the `clowk.in` zone. The proxied wildcard record `*.clowk.in` covers it, and the route answers before the request reaches its target. See `wrangler.toml`.

From a terminal: `pnpm deploy`.
