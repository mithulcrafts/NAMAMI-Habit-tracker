# INSTALLATION – Setup & Deployment

## Local Development

### Prerequisites
- Node.js 18+
- npm 9+ or yarn
- Modern browser

### Setup

```bash
git clone <repository>
cd namami
npm install
npm run dev
```

App opens at `http://localhost:5173` with HMR enabled.

**Mobile testing on same WiFi**:
```bash
ipconfig  # Get your IP
# Open on mobile: http://YOUR_IP:5173
```

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build locally
npm run lint     # Check code quality
```

## Deployment

### GitHub Pages (Recommended - Free)

1. **Update `vite.config.js`**:
```javascript
export default defineConfig({
  base: '/your-repo-name/',  // Your repo name
  plugins: [react()],
})
```

2. **Deploy**:
```bash
npm run build
git add -A && git commit -m "Deploy" && git push origin main
```

3. **Enable Pages** in repo Settings:
   - Source: Deploy from branch
   - Branch: `main` / Folder: `/ (root)`

Live at: `https://yourusername.github.io/your-repo-name/`

### GitHub Actions (Auto-Deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Every push to main auto-deploys.

### Vercel (Alternative - Zero Config)

1. Connect GitHub repo at [vercel.com](https://vercel.com)
2. Vercel auto-detects Vite
3. Click Deploy
4. Live with HTTPS ✅

### Netlify (Alternative - Drag & Drop)

```bash
npm run build
```

Drag `dist/` folder to [netlify.com/drop](https://netlify.com/drop)

Or connect GitHub repo for auto-deploys.

### Self-Hosted (Nginx)

```bash
npm run build
scp -r dist/ user@server:/var/www/namami/
```

**nginx.conf**:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/namami;
    
    location / {
        try_files $uri /index.html;
    }
}
```

## Post-Deployment Checklist

- [ ] App loads correctly
- [ ] Offline mode works (toggle Network in DevTools)
- [ ] Heatmaps render
- [ ] Charts display
- [ ] Dark/light theme toggle works
- [ ] All habit types functional
- [ ] MITHURA calculates correctly
- [ ] PWA installable (production only)
- [ ] HTTPS working

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 in use | `npm run dev -- --port 3000` |
| Blank page on deploy | Clear cache (Ctrl+Shift+R), check console |
| SW not caching | Clear storage, unregister old SW |
| Data not persisting | Check IndexedDB in DevTools |
| Heatmap not rendering | Verify dates ISO format (YYYY-MM-DD) |

---

**For local development help, see [CONTRIBUTING.md](CONTRIBUTING.md)**
