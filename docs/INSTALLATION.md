# Installation

## Prerequisites

- Node.js 18+
- npm 9+

## Local Setup

```bash
npm install
npm run dev
```

Default URL: `http://localhost:5173`

## Build & Preview

```bash
npm run build
npm run preview
npm run lint
```

## Deploy

This is a static Vite app. Deploy the `dist/` folder to any static host.

### Vercel / Netlify

- Build command: `npm run build`
- Output directory: `dist`

### GitHub Pages

Set `base` in `vite.config.js` to your repo path if hosting under a subpath, then publish `dist/`.

## Quick Troubleshooting

- Port conflict: `npm run dev -- --port 3000`
- Blank deploy: verify `base` config and hard refresh
- Offline cache issue: clear site data and reload
- Missing local data: check IndexedDB in browser devtools
