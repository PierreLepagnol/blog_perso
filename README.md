# Personal blog

A Next.js blog using Bun for dependency management and script execution. The site is exported as static files and deployed to GitHub Pages.

## Getting started

Install [Bun](https://bun.sh/docs/installation) 1.4.2, the version pinned in `package.json`, then install dependencies:

```bash
bun install --frozen-lockfile
```

Create `.env.local` with the public site URL:

```dotenv
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `app/page.tsx` or the articles in `posts/` to update the site.

## Checks and production build

```bash
bun run lint
bun run build
```

The build exports the site to `out/` and optimizes its images. Set `NEXT_PUBLIC_APP_URL` to the deployed site's URL when building for production. Because this project uses static export, serve `out/` with a static web server; `next start` does not support this output mode.

To convert source images to WebP:

```bash
bun run images:webp
```

## Dependencies and deployment

Use `bun add <package>` or `bun add --dev <package>` to add dependencies. Include changes to both `package.json` and `bun.lock` in commits.

The GitHub Pages workflow uses the Bun version from `package.json`, installs with `bun install --frozen-lockfile`, and deploys `out/`. Configure the `NEXT_PUBLIC_APP_URL` repository secret with the deployed site's URL.

The scripts explicitly select Bun's runtime, following [Bun's Next.js guide](https://bun.sh/guides/ecosystem/nextjs).
