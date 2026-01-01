# NAMAMI – Offline-First Habit Tracker

A production-ready PWA habit tracker with streaks, MITHURA points, gamification, rewards, daily quotes, and Android home-screen widget support. Built with React + Vite, fully offline-capable, no backend required.

**NEW:** Binary, count-based, and duration-based goal types. Track habits with flexible, measurable targets (read 10 pages, meditate 20 minutes, or simple done/missed). Heatmap system (global + per-habit), optional target days, fully customizable gamification per habit, and complete reward management.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit the local URL printed in terminal. Use Chrome/Edge > **Install app** to install as PWA.

---

## ✨ Features

### 1. Habit Management

**Create habits** with name, description, and frequency (daily/weekly/custom):

#### Habit Types
- **Daily habits**: Ongoing with no target date (streak-based progress)
- **Target-based habits**: Limited duration with a target number of completion days

#### Goal Types (FLEXIBLE TRACKING)
Choose how you want to measure progress:

1. **Binary** (done / not done) — Simple checkbox style
   - Mark habit as completed or missed each day
   - Day counts toward streak only if marked done
   - Example: "Morning meditation" (you either did it or didn't)

2. **Count-based** — Numeric target per day
   - Set a target count (e.g., "Read 10 pages")
   - Log how many items completed each day
   - Day counts toward streak only if entered count ≥ target
   - Partial progress stored (e.g., "7 pages" not meeting 10-page target)
   - Example habits: "Read 10 pages", "Do 30 push-ups", "Drink 8 glasses of water"

3. **Duration-based** — Time in minutes
   - Set a target duration (e.g., "Meditate 20 minutes")
   - Log minutes spent each day
   - Day counts toward streak only if minutes ≥ target
   - Partial progress stored (e.g., "15 minutes" not meeting 20-minute target)
   - Example habits: "Meditate 20 minutes", "Exercise 45 minutes", "Read 30 minutes"

**Daily check-ins**:
- **Binary**: Simple "Mark done" button
- **Count/Duration**: Input field to log today's count or minutes, "Log" button
  - Shows visual feedback: "7 / 10 completed" with ✓ indicator when target met

**Other features**:
- **Streak counter**: Auto-resets only when daily target NOT met
- **Edit anytime**: Change habit details, goal type, or targets without losing history
- **Delete**: Remove habits with confirmation
- **Habit colors**: Each habit has a unique color for visual distinction in heatmaps

### 2. Heatmap System (DUAL VIEW)

**Global Heatmap** (Dashboard):
- Aggregates all habits' completions per date
- Shows overall consistency across all habits
- Color intensity indicates how many habits were completed that day
  - Light blue: 1-2 habits completed
  - Medium blue: 3-4 habits completed
  - Bright cyan: 5+ habits completed (or all habits)
- Updated in real-time from IndexedDB
- 120-day historical view

**Individual Heatmaps** (Habit Detail page):
- Shows ONE habit's completion history per page
- Uses that habit's unique color for distinction
- 120-day historical view
- Easy to track individual habit patterns

**Heatmap Logic**:
- **Date formatting**: Uses ISO format (YYYY-MM-DD) for consistency
- **Start/End dates**: Automatically calculated as Date objects (not strings)
- **Empty cells**: Dark gray (#132035) for days with no completions
- **Filled cells**: Habit color (cyan/purple/green/etc.) for completed days
- Both work offline and sync from local storage automatically.

### 3. Tracking & Visualization

**Completion heatmaps** (GitHub-style): 120-day calendar showing completions
- Global view: Aggregated completions (all habits)
- Per-habit view: Individual habit with unique color
- **Completion logic**:
  - **Binary**: Heatmap shows days where habit was marked done
  - **Count-based**: Heatmap shows days where entered count ≥ target
  - **Duration-based**: Heatmap shows days where logged minutes ≥ target

**Progress charts**:
- Weekly completions bar chart (last 8 weeks) — counts completed days
- Monthly completions area chart (last 6 months) — counts completed days

**Progress bars**:
- **Daily habits** (binary): Streak-based (days accumulated)
- **Daily habits** (count/duration): Percentage of daily target achieved
- **Target-based habits**: Percentage progress toward target completion days
  - Example: "Read 10 pages every other week for 20 days" → shows (days completed / 20) × 100%

**Streak summary**: Best streak across all habits (only counts days where daily targets were met)

### 4. Gamification System (MITHURA Points)

Points are called **MITHURA** (✨ constellation of motivation).

#### How MITHURA is Awarded (by Goal Type)

**Binary habits**:
- Completing a habit (marked done): **10 MITHURA** (configurable per-habit)

**Count-based & Duration-based habits**:
- Only earn MITHURA when daily target is **MET** (count ≥ target or minutes ≥ target)
- No partial points for incomplete entries
- When target IS met: **10 MITHURA** (configurable per-habit)
- When target NOT met: **0 MITHURA** (partial progress is tracked but not rewarded)

**All habits**:
- Completing all habits in a day: **+20 MITHURA bonus** (applies when ALL habits meet targets)
- 3-day streak (all days target met): **+2 MITHURA bonus** (configurable)
- 7-day streak: **+5 MITHURA bonus** (configurable)
- 30-day streak: **+10 MITHURA bonus** (configurable)

#### Global Defaults (Settings page):
Configure baseline values for all habits:
- **MITHURA per completion**: Base points earned (default: 10)
- **Daily bonus**: Extra MITHURA for completing all habits (default: 20)
- **Streak bonuses**: Extra points for maintaining streaks:
  - 3-day streak: +2 MITHURA
  - 7-day streak: +5 MITHURA
  - 30-day streak: +10 MITHURA

#### Per-Habit Customization (Habit Detail page):
Override global defaults for specific habits:
- Toggle: "Use global MITHURA rules" or "Custom MITHURA for this habit"
- When custom is enabled:
  - Set custom MITHURA per completion
  - Set custom streak bonuses (3/7/30 days)
- Per-habit values override global when enabled

**Scoring pipeline**:
1. Base points: (days where target met × points-per-habit)
2. Daily bonus: +20 MITHURA if ALL habits meet daily targets (global only)
3. Streak bonus: +bonus amount based on longest streak
4. **Total MITHURA** = base + daily bonus + streak bonus

**Badge system** (auto-unlocked):
- 🏅 3-day Streak (3+ days of meeting all daily targets)
- 🏅 7-day Streak
- 🏅 30-day Streak
- 💎 100+ MITHURA points

Badges persist and display with visual styling (glow effect when unlocked).

### 5. Rewards System (Full CRUD)

**Create rewards**:
- Enter reward name
- Set required MITHURA threshold
- Reward becomes available when MITHURA threshold reached

**Edit rewards**:
- Click "Edit" on any reward
- Change name or MITHURA cost
- Only available for unclaimed rewards

**Delete/Remove rewards**:
- Click "Remove" to delete from available rewards
- Deletion does NOT affect already-claimed reward history
- Removed rewards no longer appear in the active list

**Claim rewards**:
- Auto-unlock when MITHURA threshold reached
- One-click claim button appears
- Claimed rewards tracked in history
- Can only be claimed once

---

### 6. Daily Quotes & Motivation
- **Two quote categories**:
  - General inspirational quotes
  - Bhagavad Gita wisdom quotes
- **Daily rotation**: Different quote each day (deterministic seed)
- **Custom quotes**: Add your own quotes anytime
- **Web notifications**: Send quote as notification (requires permission)
- **Settings**: Switch quote category in dashboard

### 7. PWA Installation & Widget
- **Install on laptop/mobile**: *Install app* prompt in Chrome/Chromium
- **Home screen widget**: Shows:
  - Quote of the day
  - Current longest streak
  - Total MITHURA points
- **App shortcuts**: Quick links to check-ins and widget via manifest
- **Offline-first**: Service worker precaches shell; works without internet

### 8. Settings Page

**Global Gamification** (apply to all habits):
- MITHURA per completion
- Daily bonus (all habits completed)
- Streak bonuses (3 / 7 / 30 days)

**Per-habit Customization**:
- Available on Habit Detail page
- Toggle between global defaults and custom values
- Visually labeled to avoid confusion

**Feature toggles**:
- Enable/disable gamification system
- Enable/disable notifications
- Quote category preference

---

## 🛠 Technical Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + Vite 7 (HMR, ESM) |
| **Styling** | Tailwind CSS 3.4 (dark mode, responsive) |
| **State** | React hooks + Context API (no Redux) |
| **Storage** | IndexedDB via localforage (offline-first) |
| **Charts** | Recharts (area + bar charts) |
| **Heatmap** | react-calendar-heatmap (dual-mode) |
| **Notifications** | Web Notifications API (no server) |
| **PWA** | Service Worker + Web App Manifest |
| **Build** | Vite (bundles to ~622 KB gzip) |

---

## 📁 Project Structure

```
src/
├── context/
│   └── AppContext.jsx        # Global state, storage, gamification logic, migration
├── pages/
│   ├── Dashboard.jsx          # Main view: habits, global heatmap, stats, quotes
│   ├── HabitDetail.jsx        # Habit detail: individual heatmap, charts, badges, gamification, rewards
│   └── Settings.jsx           # Global configuration, feature toggles
├── components/
│   ├── HabitForm.jsx          # Habit creation/edit with daily/target-based toggle
│   ├── HabitCard.jsx          # Habit quick-view card with toggle
│   ├── DashboardStats.jsx     # Summary stats (today, streak, MITHURA)
│   ├── GlobalHeatmap.jsx      # Aggregated completion heatmap (all habits)
│   ├── Heatmap.jsx            # Individual habit heatmap with unique color
│   ├── ProgressCharts.jsx     # Weekly + monthly completion charts
│   ├── Badges.jsx             # Badge cards (3/7/30 day, 100+ points)
│   ├── HabitGamificationPanel.jsx  # Per-habit MITHURA customization UI
│   ├── Rewards.jsx            # Reward management (add/edit/remove/claim)
│   ├── QuoteCard.jsx          # Daily quote + category toggle + notify button
│   └── WidgetCard.jsx         # Widget preview (quote + streak + MITHURA)
├── utils/
│   ├── date.js                # Date helpers: streak, history buckets, formatting
│   └── notifications.js       # Web Notifications API wrapper
├── data/
│   └── quotes.js              # Quote pools (General + Gita)
├── App.jsx                    # App shell: route to pages, state binding
├── main.jsx                   # Service worker registration
├── index.css                  # Tailwind imports + custom utilities
└── App.css                    # Animations, badge glow, heatmap colors

public/
├── manifest.webmanifest       # PWA manifest (name, icons, theme, shortcuts)
├── service-worker.js          # Offline caching + precache strategy
├── icons/
│   └── namami-icon.svg        # App icon (192/512 px)

index.html                      # Root HTML (PWA meta tags)
tailwind.config.js              # Tailwind theme: colors, spacing, fonts
postcss.config.js               # PostCSS plugins
vite.config.js                  # Vite config
```

---

## 🔄 Data Flow & Architecture

### State Management
- **AppContext**: Single source of truth in React Context
- **Auto-persist**: Any state change synced to IndexedDB via localforage
- **Hydration**: On app load, IndexedDB state restored; defaults used if empty
- **Schema versioning**: Built-in migration system for data upgrades

### Habit Schema (Extended v3)
```javascript
habit = {
  id: string,
  name: string,
  description: string,
  frequency: 'daily' | 'weekly' | 'custom',
  customDays: number[],
  isDailyHabit: boolean,              // Daily vs Target-based
  targetDays: number | null,          // Optional for daily habits
  habitColor: string,                 // Unique color per habit
  useGlobalGamification: boolean,     // Toggle for custom overrides
  customPoints: number | null,        // Custom MITHURA per completion
  customStreakBonuses: {3,7,30},      // Per-habit streak bonuses
  goalType: 'binary' | 'count' | 'duration',  // NEW: Goal type
  goalTarget: number | null,          // NEW: Target count/minutes (null for binary)
  history: { [dateKey]: boolean },    // Completion status (true if target met)
  dailyValueHistory: { [dateKey]: number },  // NEW: Actual values logged (for count/duration)
  createdAt: dateKey,
}
```

**Goal Type Details**:
- `goalType: 'binary'`: Daily done/missed toggle (original behavior)
- `goalType: 'count'`: User logs a count (e.g., "10 pages read")
  - `goalTarget`: 10 (the daily target)
  - `dailyValueHistory['2026-01-15']: 7` (logged 7 pages, target not met)
  - `history['2026-01-15']: false` (derived: 7 < 10)
- `goalType: 'duration'`: User logs minutes (e.g., "20 minute meditation")
  - `goalTarget`: 20 (the daily target in minutes)
  - `dailyValueHistory['2026-01-15']: 15` (logged 15 minutes, target not met)
  - `history['2026-01-15']: false` (derived: 15 < 20)

### Reward Schema (Extended)
```javascript
reward = {
  id: string,
  name: string,
  requiredPoints: number,
  claimed: boolean,
  deleted: boolean,  // NEW: Soft delete (doesn't affect history)
}
```

### Gamification Pipeline
1. **Daily completion status** determined by goal type:
   - **Binary**: `history[dateKey] === true` (user marked done)
   - **Count-based**: `dailyValueHistory[dateKey] >= goalTarget` (logged amount ≥ target)
   - **Duration-based**: `dailyValueHistory[dateKey] >= goalTarget` (logged minutes ≥ target)
2. **Streaks** computed backward from today (only count days where target was met)
3. **MITHURA calculation**:
   - Check per-habit overrides first (if useGlobalGamification = false)
   - Fall back to global settings otherwise
   - Only award points when daily target IS met (no partial points)
   - Daily bonus awarded only if ALL habits meet their daily targets
4. **Badges** unlocked when streak ≥ threshold or points ≥ threshold
5. **Rewards** unlocked when points ≥ required; can be edited or deleted
6. **Heatmaps** show completion (green) only when target was met; partial progress tracked but not displayed in heatmap

### Offline Strategy
- **Service Worker**: Precaches index.html, manifest, icons, service worker itself
- **Network-first with fallback**: Fetch assets, fall back to cache
- **IndexedDB**: All app state stored locally; no server calls needed
- **Notifications**: Queued locally if no internet

### Data Migration (Built-in)
- Schema version tracked in IndexedDB (currently v3)
- On app load, if version mismatch detected:
  - v1 → v2: Adds habit colors, gamification override fields, soft-delete for rewards
  - v2 → v3: Adds goal types (binary/count/duration), goalTarget, dailyValueHistory
  - Existing habits migrated to new schema
  - Missing fields populated with sensible defaults:
    - `goalType` defaults to `'binary'` (original behavior)
    - `goalTarget` defaults to `null` (not applicable for binary)
    - `dailyValueHistory` defaults to `{}` (empty, only used for count/duration)
  - No data loss; backward compatible
  - **All existing binary habits continue working unchanged**

---

## 🎯 Key Algorithms

### Streak Calculation (Updated)
```javascript
computeStreak(habit) {
  // Count consecutive days backward from today
  // Day counts ONLY if target is met
  
  let streak = 0
  let cursor = new Date()
  while (true) {
    const key = formatDate(cursor)
    
    let dayTargetMet = false
    if (habit.goalType === 'binary') {
      dayTargetMet = habit.history[key] === true
    } else {
      // Count/Duration: check if logged value >= target
      const value = habit.dailyValueHistory?.[key] ?? 0
      dayTargetMet = value >= (habit.goalTarget || 1)
    }
    
    if (dayTargetMet) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}
```

**Key behavior**:
- Streak resets on first day where target is NOT met
- Partial progress does NOT continue a streak (e.g., logging 5 when target is 10 breaks the streak)
- Works identically for all three goal types: if target is met, increment; if not, reset

### Daily Bonus Detection
```javascript
// If all habits completed on a given day, user earns daily bonus
const completedDates = {}  // count completions per date
const allHabits = habits.length
const bonusDays = Object.entries(completedDates)
  .filter(([_, count]) => count >= allHabits)  // all habits done
```

### Per-Habit Gamification Logic
```javascript
// For each habit, determine points per completion
const pointsPerCompletion = habit.useGlobalGamification
  ? globalSettings.pointsPerHabit
  : (habit.customPoints ?? globalSettings.pointsPerHabit)

// Same for streak bonuses
const bonuses = habit.useGlobalGamification
  ? globalSettings.streakBonuses
  : (habit.customStreakBonuses ?? globalSettings.streakBonuses)
```

### Quote Selection (Deterministic)
```javascript
// Same quote each day, different every day
const seed = Number(todayKey().replaceAll('-', ''))  // e.g., 20250101
const idx = seed % quotes.length
const quote = quotes[idx]
```

### Habit Color Generation
```javascript
const getHabitColor = (id) => {
  const colors = ['#38bdf8', '#c084fc', '#34d399', '#fbbf24', '#f87171', '#818cf8', '#ec4899', '#14b8a6']
  const hash = id.charCodeAt(0) + id.charCodeAt(id.length - 1)
  return colors[hash % colors.length]
}
```

---

## 🔐 Storage Details

**IndexedDB via localforage**
- **Single store key**: `namami-state-v1`
- **Schema version**: Tracked for safe migrations (currently v3)
- **Stored object**:
  ```javascript
  {
    schemaVersion: 3,
    habits: [...],              // Extended with goal types, dailyValueHistory
    rewards: [...],             // Extended with deleted flag
    settings: {...},
    customQuotes: [...],
    claimedRewards: [...],
  }
  ```
- **Sync**: Auto-saved after every state change
- **Init**: App checks IndexedDB on mount; uses defaults if empty
- **Migration**: Automatic data upgrade if schema version changes

**Service Worker Cache**
- **Cache name**: `namami-cache-v1`
- **Precache**: `index.html`, `/`, manifest, icons, SW itself
- **On fetch**: Match cache → fetch → update cache → fallback to offline URL

---

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Visit app in Chromium-based browser
2. Look for "Install app" prompt (or menu > "Install NAMAMI")
3. Confirm installation
4. App opens in window, can be pinned to taskbar

### Android (Chrome)
1. Visit app in mobile Chrome
2. Tap menu > "Install app" or use install prompt
3. App appears on home screen
4. Long-press icon → *Widgets* to add widget shortcut
5. Widget shows daily quote + streak + MITHURA (updates when app opens)

### Manifest Shortcuts
Users can add app shortcuts to home screen:
- **Quick Check-ins**: Jump to daily habit view
- **Widget**: Quick access to widget preview

---

## 🧪 Testing Checklist

- [ ] **Habit Creation**: Create daily + target-based habits with all three goal types
  - [ ] Binary: Simple done/missed toggle
  - [ ] Count-based: Set target count (e.g., 10), log values, check "X / 10" display
  - [ ] Duration-based: Set target minutes (e.g., 20), log minutes, check "X / 20 min" display

- [ ] **Daily Check-ins**:
  - [ ] Binary: "Mark done" button works
  - [ ] Count-based: Input field accepts numbers, "Log" button updates display
  - [ ] Duration-based: Input field accepts minutes, "Log" button updates display
  - [ ] Partial progress shows but doesn't mark as "complete" until target met

- [ ] **Streaks**:
  - [ ] Binary: Auto-reset on missed day
  - [ ] Count-based: Auto-reset when logged count < target
  - [ ] Duration-based: Auto-reset when logged minutes < target
  - [ ] Partial progress does NOT continue streak

- [ ] **Heatmaps**:
  - [ ] Global heatmap shows aggregated (all habits) with color intensity
  - [ ] Per-habit heatmaps show with unique color per habit
  - [ ] Binary: Green on done days
  - [ ] Count-based: Green only when count >= target
  - [ ] Duration-based: Green only when minutes >= target

- [ ] **Gamification**:
  - [ ] Binary: Points awarded on completion
  - [ ] Count-based: Points awarded ONLY when count >= target (no partial)
  - [ ] Duration-based: Points awarded ONLY when minutes >= target (no partial)
  - [ ] Daily bonus appears only when ALL habits meet targets
  - [ ] Streak bonuses unlock at 3/7/30 days
  - [ ] Per-habit custom MITHURA overrides work
  - [ ] Badges unlock visually

- [ ] **Progress Bars**:
  - [ ] Daily binary habits: Show streak-based % (streak × 10)
  - [ ] Daily count/duration: Show % of today's target achieved
  - [ ] Target-based habits: Show % of target days completed

- [ ] **Rewards**: Create, edit, delete (unclaimed only), claim, history persists
- [ ] **Quotes**: Daily rotation, custom quotes save, category toggle works, notification sends
- [ ] **Offline**: Close network, app still loads, data persists, count/duration values persist
- [ ] **PWA**: Install on desktop/Android, widget shows data, shortcuts work
- [ ] **Charts**: Heatmaps display correctly; weekly/monthly charts render
- [ ] **Settings**: All toggles and inputs save and persist after refresh
- [ ] **Data migration**: Old app data (if any) upgrades cleanly: v1 → v2 → v3, binary goals work unchanged

---

## 🚢 Build & Deployment

### Development
```bash
npm run dev   # Vite dev server at http://localhost:5173
```

### Production Build
```bash
npm run build  # Outputs to dist/
npm run preview # Preview prod build locally
```

### Deploy
- Static hosting (Vercel, Netlify, GitHub Pages, AWS S3, etc.)
- No server-side logic needed
- Service worker handles offline caching
- HTTPS required for PWA + notifications on production

---

## ⚡ Performance Notes

- **Bundle size**: ~622 KB gzip (includes Recharts + calendar heatmap)
- **Fast load**: Vite HMR, Tailwind JIT
- **Offline-first**: No network requests blocking UI
- **IndexedDB**: Async storage, minimal re-renders
- **Heatmaps**: Optimized for 120-day rendering; color computed on-demand
- **Chunk warning**: Normal for chart libraries; can be code-split if needed

---

## 🎨 Design & Styling

- **Color palette**: Dark mode by default (slate-950 background, brand-500 cyan accent)
- **Habit colors**: 8-color palette for unique habit distinction in heatmaps
- **Responsive**: Mobile-first, adapts to tablet/desktop
- **Animations**: Fade-in transitions, badge glow on unlock, smooth hovers
- **Fonts**: System fonts (Inter for body, DM Sans for headers) via Google Fonts
- **Dark mode utility class**: `.glass` for frosted effect, `.card-hover` for interactive cards

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Data not persisting | Check browser IndexedDB support; clear storage & reload |
| Heatmap colors not showing | Ensure browser CSS supports custom properties; check console for errors |
| Per-habit gamification not applying | Confirm "Use custom MITHURA" toggle is enabled in Habit Detail |
| Notifications not showing | Grant browser notification permission; check notifications toggle in settings |
| Widget not updating | Open app to trigger data sync; widgets update on next app load |
| Service worker not caching | Hard refresh (Ctrl+Shift+R) to clear stale cache |
| Charts not rendering | Check browser console for Recharts errors; ensure window size > 300px |
| Target-based progress stuck at 0% | Verify `isDailyHabit` is false and `targetDays` is set; check completions in history |

---

## 📄 License

Open source. No attribution required. Built for personal habit tracking.

---

## 🤝 Contributing

To extend NAMAMI:
1. Fork/clone the repo
2. Make changes in feature branches
3. Test offline, PWA, and data persistence
4. Test per-habit vs global gamification scenarios
5. Ensure no console errors
6. Keep bundle size in mind
7. Update README if schema changes

---

**Built with ❤️ for habit builders everywhere.**
**Last updated:** January 2026 – Binary, count-based, and duration-based goal types with flexible tracking. Full schema v3 migration with backward compatibility.
