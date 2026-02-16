# NAMAMI – Offline-First Habit Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Built with React](https://img.shields.io/badge/Built%20with-React%2019-61dafb)](https://react.dev) [![Vite](https://img.shields.io/badge/Vite-7.3-646cff)](https://vitejs.dev)

A **production-ready, offline-first PWA** habit tracker that works completely without internet. Track your habits, earn MITHURA gamification points, celebrate streaks, and build lasting routines—no backend, no accounts, no servers.

## ⚠️ Development Notice

This project was created as a hobby and shared publicly in the hope that it may
be useful to others.

It was developed using AI-assisted ("vibe coding") techniques, and large
portions of the code were not manually reviewed. As a result, the
codebase may contain bugs, edge-case failures, performance issues, or security
problems.

This repository is provided for learning, experimentation, and personal use.
Do not rely on it for production, backups, financial tracking, health data,
or anything important.

Use at your own risk.


## ✨ Key Features

- **Three flexible goal types**: Binary (done/missed), Count-based (10 pages), Duration-based (20 minutes)
- 🔥 **Dual heatmap system**: Global completion overview + per-habit color-coded calendars
- 🏆 **MITHURA gamification**: Points, streaks, badges, daily bonus, rewards system
- 🎨 **8 custom colors**: Unique color for each habit's heatmap
- 🌓 **Light & Dark themes**: Switch between themes for comfortable viewing
- 💾 **100% offline**: Works completely offline, data syncs when reconnected
- 📱 **PWA support**: Install on any device as a progressive web app
- 🎯 **Two habit types**: Daily (ongoing) or Target-based (30-day challenges)
- 📊 **Charts & analytics**: Weekly/monthly completion trends
- 💬 **Daily quotes**: General or Bhagavad Gita quotes with custom quote support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+ or yarn
- Modern browser (Chrome 90+, Safari 15+, Firefox 88+)

### Installation & Development

```bash
# Clone & setup
git clone <repository>
cd namami
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

**Mobile Testing on Same Network:**
```bash
# Get your IP (Windows)
ipconfig

# Open on mobile
http://<YOUR_IP>:5173
```

### Install as PWA

**Desktop (Chrome/Edge)**: Click "Install app" prompt in browser menu  
**Mobile (Android)**: Menu → "Install app"  
**Mobile (iOS)**: Share → "Add to Home Screen"

---

## 📚 Complete Documentation

| Document | Purpose |
|----------|---------|
| [📖 OVERVIEW.md](docs/OVERVIEW.md) | Product philosophy, motivation, and high-level vision |
| [✨ FEATURES.md](docs/FEATURES.md) | Detailed user feature explanations |
| [🛠 TECHNICAL.md](docs/TECHNICAL.md) | Architecture, data flow, state management, storage |
| [🎨 UI_DESIGN.md](docs/UI_DESIGN.md) | Design system, colors, typography, theme |
| [⚙️ INSTALLATION.md](docs/INSTALLATION.md) | Detailed setup and deployment guides |
| [🤝 CONTRIBUTING.md](docs/CONTRIBUTING.md) | Contribution guidelines, coding standards, PR process |
| [🗺 ROADMAP.md](docs/ROADMAP.md) | Future plans and planned features |
| [🖼 ASSETS.md](docs/ASSETS.md) | Visual references, screenshots, logo |

---

## 📁 Project Structure

```
src/
├── context/AppContext.jsx      # Global state + storage
├── pages/                       # Full page components (Home, Rewards, Settings)
├── components/                  # Reusable UI components
├── utils/                       # Helper utilities (dates, notifications)
├── data/                        # Static data (quotes)
└── App.jsx                      # Main component

public/
├── manifest.webmanifest         # PWA metadata
├── service-worker.js            # Offline caching strategy
└── icons/                       # App icons

docs/                           # Complete documentation
```

---

## 🚢 Build & Deploy

### Development
```bash
npm run dev   # Vite dev server with HMR
```

### Production
```bash
npm run build     # Optimized dist/ folder
npm run preview   # Preview production build locally
npm run lint      # Check code quality
```

### Deployment Options
- **GitHub Pages** (recommended, free): See [INSTALLATION.md](docs/INSTALLATION.md#github-pages)
- **Vercel**: Zero-config deployment with auto HTTPS
- **Netlify**: Drag & drop or GitHub integration
- **Self-hosted**: Deploy `dist/` to any static host

For detailed deployment instructions, see [INSTALLATION.md](docs/INSTALLATION.md).

---

## 🎯 Use Cases

**Personal Productivity**: Daily meditation, exercise, reading targets  
**Health Tracking**: Sleep, water intake, fitness goals  
**Learning**: Language studies, code challenges, skill building  
**Wellness**: Mental health check-ins, journaling prompts  
**Challenges**: 30-day habit challenges with progress tracking  

---

## 🏆 For Contributors

Want to help? Read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for:
- Code guidelines and standards
- Branch naming and commit conventions
- PR process and testing requirements
- Architecture understanding

---

## 📄 License

**MIT License** – Use freely in commercial and personal projects.

---

## 🌟 Built With

- **React 19** – UI library
- **Vite 7** – Lightning-fast build tool with HMR
- **Tailwind CSS 3.4** – Utility-first styling
- **Recharts** – Charts and visualizations
- **react-calendar-heatmap** – Heatmap visualizations
- **localforage** – Offline IndexedDB storage

---

## 📞 Questions or Feedback?

- 📖 Browse full [documentation](docs/)
- 🐛 Report issues on GitHub
- 💡 Create GitHub discussions for feature requests
- ⭐ Star us on GitHub if NAMAMI helps you!

---

**Made with 🔥 for habit builders everywhere.**

**Start building better habits – offline, with no servers attached.**



