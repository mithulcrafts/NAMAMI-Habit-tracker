# Installation

This guide covers local setup, production build, and common troubleshooting.

## Prerequisites

- Node.js 18+
- npm 9+

Verify versions:

```bash
node -v
npm -v
```

## Local Setup

### Standard Setup

```bash
npm install
npm run dev
```

Default URL: `http://localhost:5173`

### First Run Checklist

- Ensure there are no terminal errors after `npm install`
- Open the URL and verify the Home screen loads
- Keep the dev server running while making changes

If dependencies fail to install, delete `node_modules` and `package-lock.json`, then run `npm install` again.

If the app does not start correctly:

```bash
npm run dev -- --host
```

Use this when local network or host binding behavior causes startup issues.

## Build & Preview

```bash
npm run build
npm run preview
npm run lint
```

- `build` generates static assets in `dist/`
- `preview` serves the production build locally
- `lint` checks code style and common issues

## Deploy

This is a static Vite app. Deploy the `dist/` folder to any static host.

### Vercel / Netlify

- Build command: `npm run build`
- Output directory: `dist`

### GitHub Pages

Set `base` in `vite.config.js` to your repo path if hosting under a subpath, then publish `dist/`.

## PWA Notes

- Install prompt availability depends on browser support and engagement rules
- After deployment updates, service-worker cache may require a hard refresh

## Quick Troubleshooting

- Port conflict: `npm run dev -- --port 3000`
- Blank deploy: verify `base` config and hard refresh
- Offline cache issue: clear site data and reload
- Missing local data: check IndexedDB in browser devtools

For contribution workflow and PR expectations, see [CONTRIBUTING.md](CONTRIBUTING.md).
