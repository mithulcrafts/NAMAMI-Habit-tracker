# NAMAMI – Offline-First Habit Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Built with React](https://img.shields.io/badge/Built%20with-React%2019-61dafb)](https://react.dev) [![Vite](https://img.shields.io/badge/Vite-7.3-646cff)](https://vitejs.dev)

A **production-ready, offline-first PWA** habit tracker that works completely without internet. Features streaks, MITHURA gamification points, flexible goal types, global rewards, daily quotes, and heatmap visualization. No backend, no accounts, no servers—just pure client-side habit tracking.

### Key Features at a Glance
- ✅ **Three flexible goal types**: Binary (done/missed), Count-based (10 pages), Duration-based (20 minutes)
- 🔥 **Dual heatmap system**: Global completion overview + per-habit color-coded calendars with intensity-based coloring
- 🏆 **MITHURA gamification**: Points, streaks, badges, daily bonus, rewards system
- 🎨 **8 custom colors**: Choose unique color for each habit's heatmap
- 🌓 **Light & Dark themes**: Switch between themes for comfortable viewing in any environment
- 💾 **100% offline**: Works completely offline, syncs when reconnected
- 📱 **PWA support**: Install on any device as a progressive web app
- 🎯 **Two habit types**: Daily (ongoing) or Target-based (30-day challenges)
- 📊 **Charts & analytics**: Weekly/monthly completion trends
- 💬 **Daily quotes**: General or Bhagavad Gita quotes with custom quote support

---

## 📥 Installation & Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** 9+ or **yarn**
- Modern browser (Chrome 90+, Edge 90+, Safari 15+, Firefox 88+)

### Setup (Local Development)

```bash
# Clone repository
git clone https://github.com/yourusername/namami.git
cd namami

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at:
- **Local**: `http://localhost:5173`
- **Network**: `http://YOUR_IP:5173` (for mobile testing on same WiFi)

### Deployment Options

#### GitHub Pages (Recommended for Free Hosting)
```bash
npm run build
# Push to GitHub, enable Pages in repo settings
```
See [Deployment Guide](#deployment) below.

#### Vercel (Fastest, Automatic HTTPS)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Drag `dist` folder to netlify.com/drop
```

#### Self-Hosted
```bash
npm run build
# Deploy `dist` folder to any static host
```

---

## 🚀 Quick Start

### First Time Setup
```bash
npm install
npm run dev
```

### Mobile Testing (Same Network)
1. Get your laptop IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On mobile browser: `http://YOUR_IP:5173`
3. Tap menu → "Add to Home Screen" for PWA experience

### Install as PWA

**Desktop (Chrome/Edge)**:
1. Open app in browser
2. Click "Install app" prompt (or menu > Install)
3. App opens in window

**Mobile**:
- **Android (Chrome)**: Menu → "Install app"
- **iOS (Safari)**: Share → "Add to Home Screen"
- **Note**: Requires HTTPS (works on deployed apps, not local)

---

## ✨ Features

### App Structure & Navigation
- 🏠 **Home Page**: Main dashboard with quotes, heatmaps, and habit tracking
- 🏠 **Home Page**: Main dashboard with quotes, heatmaps, and habit tracking
- 🎁 **Rewards Page**: Dedicated page for viewing and redeeming rewards
- ⚙️ **Settings Page**: Centralized app configuration, theme switcher, and preferences
- 🌓 **Theme switcher**: Toggle between light and dark themes in Settings → Appearance
- 🎯 **Simple tab navigation**: Clean, minimal page switching with active state indicators
- 📱 **Responsive design**: Works seamlessly across all screen sizes

### Daily Quotes
- 💬 **Quote of the Day**: Displayed prominently at the top of Home page
- 🎯 **Two categories**: General motivational quotes or Bhagavad Gita quotes
- ✏️ **Custom quotes**: Add your own personal quotes to rotation
- 🔄 **Different daily**: New quote shown each day

### PWA Support
- 📱 **Progressive Web App**: Install on desktop, tablet, and mobile
- 📴 **Works offline**: All data cached locally with IndexedDB
- 🔄 **Auto-sync**: Data syncs across devices when online
- ⚡ **Fast & responsive**: Optimized for all screen sizes

### 1. Habit Management

**Create habits** with name, description, frequency, and **custom color**:

#### Habit Types
- **Daily habits**: Ongoing with no target date (streak-based progress)
  - UI: Target days field is hidden in the form
  - Storage: `targetDays` is removed from saved data (not stored)
  - Badge: "Target: X days" badge is hidden on habit cards
- **Target-based habits**: Limited duration with a target number of completion days
  - UI: Shows "Target days" input field in form (default 30)
  - Storage: `targetDays` number is saved with habit data
  - Badge: "Target: X days" badge displays on habit cards

#### Goal Types (Flexible & Per-Habit Targets)
Choose how you want to measure progress and set a daily target per habit:

1. **Binary** (done / not done)
  - Mark habit as completed or missed each day
  - Counts toward streak only if marked done
  - Example: "Morning meditation" (you either did it or didn't)

2. **Count-based** — Numeric target per day
  - Set a per-habit target count (e.g., "Read 12 pages" for Habit A, "Do 20 push-ups" for Habit B)
  - Log how many items completed each day
  - Counts toward streak only if entered count ≥ that habit’s target
  - Partial progress stored (e.g., "7 pages" shows in cards and heatmap intensity)

3. **Duration-based** — Time in minutes
  - Set a per-habit target minutes (e.g., "Meditate 25 minutes" for Habit C)
  - Log minutes spent each day
  - Counts toward streak only if minutes ≥ that habit’s target
  - Partial progress stored (e.g., "15 minutes" shows in cards and heatmap intensity)

**Daily check-ins**:
- **Binary**: Simple "Mark done" button (marks today as complete/incomplete)
- **Count/Duration**: Input field to log today's count or minutes, "Log" button
  - Shows visual feedback: "7 / 10 completed" with ✓ indicator when target met
  - Partial progress shown (e.g., "7 / 10" even if 7 < 10)

**Date navigation & backfill**:
- Single top bar with left/right arrows flanking a centered date; calendar icon opens a date picker (future dates blocked)
- Quickly jump to any past day, then mark or log values for that specific date; changes stay scoped to the selected date
- Habit cards mirror the selected date context so it is clear which day you are editing

**Color Customization**:
- Choose from 8 preset colors when creating/editing a habit
- Color used in per-habit heatmap on Dashboard
- Color persists with habit; can be changed anytime
- Available colors: Cyan, Purple, Green, Amber, Red, Indigo, Pink, Teal

**Other features**:
- **Streak counter**: Auto-resets only when daily target NOT met
- **Edit anytime**: Change habit details, goal type, color, or targets without losing history
- **Delete**: Remove habits (history is deleted but heatmap data remains for past displays)
- **Progress bars**: Visual progress indicators with different logic per habit type

### 2. Heatmap System (DUAL VIEW)

**Global Heatmap** (Dashboard):
- Aggregates all habits' completions per date
- Shows overall consistency across all habits at a glance
- **Intensity-based color levels** (scales with percentage of habits completed):
  - Dark gray: Days with 0 habits completed
  - Light green: 1-24% of total habits completed
  - Medium-light green: 25-49% of total habits completed
  - Medium-dark green: 50-74% of total habits completed
  - Full bright green: 75%+ of total habits completed
- 120-day historical view
- Updated in real-time as you log habits

**Per-Habit Heatmaps** (Dashboard grid):
- Individual 120-day calendar for each habit
- Uses that habit's **unique color** for visual distinction
- **Intensity-based coloring** (reflects progress toward that habit’s daily target):
  - **Binary habits**: Full color when completed, empty when missed
  - **Numeric goals** (count/duration): Color intensity scales with progress vs the habit’s target
    - 25% opacity: >0% progress (some activity logged)
    - 50% opacity: ~50% of target reached
    - 75% opacity: ~75% of target reached
    - 100% opacity: Goal met or exceeded (100%+)
- Theme-aware empty state: empty cells use light/dark neutral depending on theme
- Color is customizable when creating or editing the habit
- 8 preset colors available: cyan, purple, green, amber, red, indigo, pink, teal
- Provides at-a-glance visualization of both completion and effort level
- Easy to spot patterns and partial progress per habit across themes

**Heatmap Rendering**:
- **Library**: React Calendar Heatmap
- **Date format**: ISO format (YYYY-MM-DD) for accuracy
- **Computation**: Automatic Date object calculation for 120-day range
- **Empty cells**: Dark gray (#132035) indicates no completion
- **Filled cells**: Habit color shows target was met that day
- **Responsive**: Scrollable on mobile, full view on desktop
- **Offline**: Rendered entirely client-side, fully works offline

**Completion & Intensity Logic**:
- **Binary**: Heatmap shows color on days marked "done"
- **Count-based/Duration-based**: Heatmap varies color opacity by progress vs target; shows partial progress
- Empty days: neutral theme-aware color (dark gray in dark theme, light gray in light theme)

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
- **Daily habits** (binary): Streak × 10% (e.g., 5-day streak = 50%)
- **Daily habits** (count/duration): Percentage of daily target achieved (e.g., 7/10 pages = 70%)
- **Target-based habits**: Percentage progress toward target completion days
  - Example: "Read 10 pages for 20 days" → shows (days completed / 20) × 100%
  - Note: Daily habits have no target days, so progress bar works differently

**Streak summary**: Best single-habit streak plus global “all-habits” streak (only counts days where targets were met)

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

**All habits (global bonuses)**:
- Completing all habits in a day: **+20 MITHURA bonus** (applies when ALL habits meet targets)
- Global streak (all habits completed for N consecutive days): **3d +5**, **7d +10**, **30d +20** (configurable)

#### Global Defaults (Settings page):
- **Daily bonus**: Extra MITHURA for completing all habits (default: 20)
- **Global streak bonuses**: Extra points for consecutive days where ALL habits were completed (defaults: 3d +5, 7d +10, 30d +20)

#### Per-Habit Customization (Habit Detail page):
- Each habit stores its own **MITHURA per completion** (default: 10) and **streak bonuses** (defaults: 3d +2, 7d +5, 30d +10)
- Configure these when creating a habit or editing its gamification panel
- Global bonuses (daily + global streak) remain global and stack on top
- Rewards stay global (managed on Dashboard)

**Scoring pipeline**:
1. Base points: sum of (habit completions × that habit’s points)
2. Per-habit streak bonus: add each habit’s streak bonus (based on its streak)
3. Daily bonus: +global daily bonus if ALL habits met targets
4. Global streak bonus: based on consecutive days where ALL habits were completed
5. **Lifetime MITHURA** = base + per-habit streaks + daily bonus + global streak bonus
6. **Available balance** = lifetime MITHURA − total spent on rewards

**Points display**:
- Dashboard stats show "MITHURA balance" (available to spend)
- Tooltip shows: "Earned X · Spent Y · Bonuses on Z days"
- Badges unlock based on lifetime MITHURA (unaffected by spending)
- Rewards check available balance (not lifetime) to determine if claimable

**Badge system** (auto-unlocked):
- 🔥 3-day Streak (3+ days of meeting all daily targets)
- 🌟 7-day Streak (7+ days of meeting all daily targets)
- 👑 30-day Streak (30+ days of meeting all daily targets)
- 💎 100+ MITHURA points
- ✨ 500+ MITHURA points

**Badge Features**:
- **Per-habit badges**: Streak badges are earned per habit and can be earned multiple times for different habits
- **Persistent tracking**: Badges earned are permanently recorded and never disappear, even if a streak is lost
- **Repeatable**: Same badge can be earned multiple times (e.g., a 3-day streak badge for Habit A, then again for Habit B)
- **Detailed history**: Track which habit each badge was earned for and how many times
- **Visual display**: Each badge has an emoji icon (🔥🌟👑💎✨) for visual engagement
- **Badges page**: View all earned badges with breakdown by habit on the Rewards page

### 5. Rewards System (Full CRUD - Global)

**Location**: Global rewards panel on Dashboard (not per-habit)

**Create rewards**:
- Enter reward name
- Set required MITHURA threshold
- Reward becomes available when MITHURA threshold reached

**Navigate to Rewards page**:
- Click "Rewards" tab in navigation to access dedicated rewards page
- View all earned badges with detailed breakdowns
- See which habits earned each badge and how many times

**Earned Badges Section** (on Rewards page):
- **Badge gallery**: Display all earned badges with emoji icons (🔥🌟👑💎✨)
- **Earn counter**: Shows how many times each badge was earned
- **Per-habit details**: Lists which habits earned each streak badge
- **Permanent history**: All earned badges are displayed; never disappear even if streak is lost
- **Visual feedback**: Emerald accent design with badge details clearly visible
- **Multiple occurrences**: Same badge displays for each habit that earned it

**Edit rewards**:
- Click "Edit" on any reward
- Change name or MITHURA cost
- Available at any time, even after claiming

**Delete/Remove rewards**:
- Click "Remove" to delete from available rewards
- Deletion does NOT affect already-claimed reward history
- Removed rewards no longer appear in the active list

**Claim rewards**:
- Auto-unlock when MITHURA balance ≥ threshold
- Click "Claim now" → inline confirmation panel appears in card (mobile-friendly)
- "Confirm" button deducts MITHURA balance by reward cost and records claim
- "Cancel" button closes confirmation without claiming
- **Re-claim support**: Claim the same reward multiple times when you have enough MITHURA
- **Claim counter**: Displays "Claimed Nx" badge showing total times claimed
- Claimed rewards tracked in history with cost, name, and timestamp

---

### 6. Daily Quotes & Motivation
- **Two quote categories**:
  - General inspirational quotes
  - Bhagavad Gita wisdom quotes
- **Daily rotation**: Different quote each day (deterministic seed)
- **Custom quotes**: Add your own quotes anytime
- **Web notifications**: Send quote as notification (requires permission)
- **Settings**: Switch quote category in dashboard

### 7. PWA Installation

- **Install on laptop/mobile**: Click *Install app* prompt in Chrome/Chromium/Edge or Menu → Install
- **Home screen icon**: App launches in standalone mode (no browser UI)
- **App shortcuts**: Quick links via manifest to:
  - Quick check-ins page
  - Add new habit
- **Offline-first**: Service worker precaches shell; works without internet
- **iOS support**: Share → "Add to Home Screen" on Safari
- **Android support**: Menu → "Install app"
- **Cross-platform**: Works on desktop, tablet, and mobile devices

### 8. Navigation & Page Structure

- **Home Page**: Main dashboard with daily quote, stats, global heatmap, per-habit heatmaps, habit cards, and add habit form
  - **View Details**: Click "View detail →" on any habit card to see the detailed view **inline below the card**
  - Detail view includes individual heatmap, charts, badges, and gamification settings
  - Detail view only displays on Home page (not on other pages)
- **Rewards Page**: Dedicated page for viewing available rewards, claiming rewards, and managing reward history
  - **🏆 Badges Earned section**: View all earned badges with emoji icons and detailed breakdown
  - Shows which habits earned each badge and how many times
  - Displays total count of badge earnings per habit
- **Settings Page**: Centralized configuration for gamification settings, notifications, and app preferences
- **Simple tab navigation**: Clean pill-style tabs with active state highlighting
- **Responsive layout**: Navigation adapts to screen size (icons only on small screens)
- **Persistent storage**: Custom quotes and earned badges saved in IndexedDB

### 9. Settings Page

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
│   └── AppContext.jsx              # Global state, storage, gamification logic, migration
├── pages/
│   ├── Home.jsx                    # Main dashboard with quote, stats, heatmaps, habit cards, add habit form, inline detail view
│   ├── HabitDetail.jsx             # Habit detail: individual heatmap, charts, badges, gamification settings
│   ├── RewardsPage.jsx             # Rewards page: earned badges section + reward management
│   ├── Dashboard.jsx               # (Legacy) Main view component
│   ├── QuotesPage.jsx              # Quotes page
│   └── Settings.jsx                # Global configuration, feature toggles
├── components/
│   ├── HabitForm.jsx               # Habit creation/edit with color picker, daily/target-based toggle, goal type selector
│   ├── HabitCard.jsx               # Habit quick-view card with daily toggle
│   ├── DashboardStats.jsx          # Summary stats (today, best streak, MITHURA balance with earned/spent breakdown)
│   ├── GlobalHeatmap.jsx           # Aggregated completion heatmap (all habits, color intensity)
│   ├── Heatmap.jsx                 # Individual habit heatmap with unique color per habit
│   ├── ProgressCharts.jsx          # Weekly + monthly completion charts
│   ├── Badges.jsx                  # Badge cards (3/7/30 day streaks, 100+ points) with emoji icons
│   ├── EarnedBadges.jsx            # Display earned badges with per-habit breakdown and emoji icons
│   ├── HabitGamificationPanel.jsx  # Per-habit MITHURA customization UI
│   ├── Rewards.jsx                 # Global reward management (add/edit/remove/claim)
│   └── QuoteCard.jsx               # Daily quote + category toggle + custom quote input
├── utils/
│   ├── date.js                     # Date helpers: streak, history buckets, formatting, past dates
│   └── notifications.js            # Web Notifications API wrapper
├── data/
│   └── quotes.js                   # Quote pools (General + Bhagavad Gita)
├── App.jsx                         # App shell: route to pages, context binding
├── main.jsx                        # Service worker registration (dev/prod aware)
├── index.css                       # Tailwind imports + custom utilities
└── App.css                         # Animations, badge glow, heatmap cell colors

public/
├── manifest.webmanifest            # PWA manifest (name, icons, theme, shortcuts)
├── service-worker.js               # Offline caching + precache strategy
└── icons/
    └── namami-icon.svg             # App icon (192/512 px)

index.html                          # Root HTML (PWA meta tags, root div)
tailwind.config.js                  # Tailwind theme: colors, spacing, fonts
postcss.config.js                   # PostCSS plugins (autoprefixer)
vite.config.js                      # Vite config (React plugin)
package.json                        # Dependencies (React, Vite, Recharts, Calendar Heatmap, localforage)
```

---

## 🔄 Data Flow & Architecture

### State Management
- **AppContext**: Single source of truth in React Context API (no Redux needed)
- **Auto-persist**: Any state change automatically synced to IndexedDB via localforage
- **Hydration**: On app load, IndexedDB state restored; defaults used if empty
- **Schema versioning**: Built-in safe migration system for data schema upgrades (v1 → v2 → v3)
- **Real-time updates**: Heatmaps, charts, badges, and stats update immediately on habit log

### Habit Schema (Current: v4)
```javascript
habit = {
  id: string,                         // UUID
  name: string,                       // Habit title
  description: string,                // User description
  frequency: 'daily' | 'weekly' | 'custom',  // Frequency type
  customDays: number[],               // Days of week (0-6) for custom frequency
  isDailyHabit: boolean,              // Daily vs Target-based toggle
  targetDays: number | undefined,     // Only exists for target-based habits; removed from daily habits before save
  habitColor: string,                 // Hex color for heatmap (e.g., '#38bdf8')
  customPoints: number,               // MITHURA per completion for this habit
  customStreakBonuses: {3,7,30},      // Per-habit streak bonus values
  goalType: 'binary' | 'count' | 'duration',  // How to measure: done/missed, count, or time
  goalTarget: number | null,          // Target count or minutes (null for binary)
  history: { [dateKey]: boolean },    // Completion status; true if target met that day
  dailyValueHistory: { [dateKey]: number },  // Actual logged values (for count/duration)
  createdAt: dateKey,                 // Creation date
}
```

**Goal Type Details**:
- `goalType: 'binary'`: 
  - User marks day as done (true) or missed (false)
  - `goalTarget: null`
  - `history['2026-01-15']: true` → day complete
  - **Streak continues**: Only if true on consecutive days
  - **Points awarded**: On completion (true)

- `goalType: 'count'`: 
  - User logs a numeric count (e.g., "10 pages read")
  - `goalTarget: 10` (the daily target)
  - `dailyValueHistory['2026-01-15']: 7` (logged 7, target not met)
  - `history['2026-01-15']: false` (derived: 7 < 10, day incomplete)
  - **Streak continues**: Only if dailyValueHistory[date] ≥ goalTarget
  - **Points awarded**: Only when target IS met (count ≥ goalTarget)

- `goalType: 'duration'`: 
  - User logs minutes (e.g., "20 minute meditation")
  - `goalTarget: 20` (the daily target in minutes)
  - `dailyValueHistory['2026-01-15']: 15` (logged 15 min, target not met)
  - `history['2026-01-15']: false` (derived: 15 < 20, day incomplete)
  - **Streak continues**: Only if dailyValueHistory[date] ≥ goalTarget
  - **Points awarded**: Only when target IS met (minutes ≥ goalTarget)

### Settings Schema
```javascript
settings = {
  dailyBonus: number,                      // Global MITHURA for all habits done (default: 20)
  globalStreakBonuses: {3: 5, 7: 10, 30: 20}, // Global streak bonuses when ALL habits are done
  gamificationEnabled: boolean,            // Master gamification toggle (default: true)
  notificationsEnabled: boolean,           // Web notifications toggle (default: false)
  quoteCategory: 'general' | 'gita',       // Daily quote source (default: 'general')
}
```

### Reward Schema
```javascript
reward = {
  id: string,                         // UUID
  name: string,                       // Reward title
  requiredPoints: number,             // MITHURA threshold to unlock
  deleted: boolean,                   // Soft-delete flag (hidden from UI)
}

claimedReward = {
  rewardId: string,                   // Reference to reward.id
  claimedAt: dateKey,                 // Date of claim (ISO format)
  cost: number,                       // MITHURA spent (snapshot at claim time)
  name: string,                       // Reward name (snapshot for history)
  deleted: boolean,                   // Soft delete (doesn't appear in active list but persists in history)
}

// Badge definitions (system-wide)
badge = {
  id: string,                         // Badge identifier (e.g., 'streak-3', 'points-100')
  label: string,                      // Display name (e.g., '3-day Streak')
  icon: string,                       // Emoji icon (🔥 🌟 👑 💎 ✨)
  habitSpecific: boolean,             // true for streak badges, false for points badges
  requirement: number,                // Threshold (3, 7, 30 for streaks; 100, 500 for points)
  type: 'streak' | 'points',          // Category
}

earnedBadge = {
  id: string,                         // Unique ID for this earning (e.g., 'habit-123-streak-3')
  badgeId: string,                    // Reference to badge.id
  habitId: string | null,             // Habit ID if streak badge, null if points badge
  habitName: string | null,           // Habit name (snapshot), null if points badge
  earnedAt: dateKey,                  // Date earned (ISO format)
}
```

### Gamification Pipeline (Complete Flow)

1. **Daily Completion Status** determined by goal type:
   ```javascript
   // Binary: User marked done?
   const binaryDone = history[dateKey] === true
   
   // Count-based: Logged amount ≥ target?
   const countMet = dailyValueHistory[dateKey] >= goalTarget
   
   // Duration-based: Logged minutes ≥ target?
   const durationMet = dailyValueHistory[dateKey] >= goalTarget
   
   // All three: Combined check
   const dayComplete = (goalType === 'binary') ? binaryDone : (dailyValueHistory[dateKey] >= goalTarget)
   ```

2. **Streaks** computed backward from today:
   ```javascript
   // Count consecutive days where target was met
   let streak = 0
   for (let i = 0; i < 365; i++) {
     const date = yesterday(i)
     if (isDayComplete(date)) streak++
     else break  // Streak ends on first incomplete day
   }
   ```

3. **MITHURA Calculation**:
   ```javascript
  // For each habit, determine points per completion (per-habit only)
  const pointsPerCompletion = habit.customPoints ?? 10
  
  // Only award points if target WAS met
  if (dayComplete) {
    totalMITHURA += pointsPerCompletion
  }
  // No partial points for count/duration below target
   ```

4. **Daily Bonus** (all habits completed):
   ```javascript
   const completedToday = habits.filter(h => isDayComplete(h, today))
   if (completedToday.length === habits.length) {
     totalMITHURA += settings.dailyBonus  // +20
   }
   ```

5. **Streak Bonuses** (per milestone):
   ```javascript
  const bonuses = habit.customStreakBonuses ?? { 3: 2, 7: 5, 30: 10 }
  
  if (habit.streak >= 30) totalMITHURA += bonuses[30]  // +10
  else if (habit.streak >= 7) totalMITHURA += bonuses[7]   // +5
  else if (habit.streak >= 3) totalMITHURA += bonuses[3]   // +2
   ```

6. **Global streak bonus** (ALL habits completed):
  ```javascript
  // Count consecutive days where every habit was done
  const bonuses = settings.globalStreakBonuses ?? { 3: 5, 7: 10, 30: 20 }
  if (globalStreak >= 30) totalMITHURA += bonuses[30]
  else if (globalStreak >= 7) totalMITHURA += bonuses[7]
  else if (globalStreak >= 3) totalMITHURA += bonuses[3]
  ```

6. **Final Total**: Base points + daily bonus + streak bonus
   ```javascript
   totalPoints = basePoints + dailyBonusPoints + streakBonus
   ```

7. **Badges** earned and tracked:
   - **Streak badges** (per-habit): 3-day 🔥, 7-day 🌟, 30-day 👑 earned when `habit.streak >= requirement`
   - **Points badges** (global): 100+ MITHURA 💎, 500+ MITHURA ✨ earned when `totalPoints >= requirement`
   - **Tracking**: Each earned badge stored in `earnedBadges` array with badge ID, habit reference, and earn date
   - **Persistence**: Badges never disappear; remain recorded even if streak is lost
   - **Multiple earnings**: Same badge can be earned multiple times for different habits or repeated achievement
   - **Display**: All earned badges shown on Rewards page with emoji icon and per-habit breakdown

8. **Heatmaps** show completion (colored cell) only when target met:
   - **Binary**: Green on days where `history[date] === true`
   - **Count-based**: Green only when `dailyValueHistory[date] >= goalTarget`
   - **Duration-based**: Green only when `dailyValueHistory[date] >= goalTarget`
   - Partial progress NOT shown (but tracked for future reference)

### Offline Strategy
- **Service Worker (auto-refresh)**: Versioned caches; precaches shell assets (`/`, manifest, icons); installs with `skipWaiting` + `clientsClaim` and triggers a one-time client refresh so new deploys show without manual hard reloads.
- **Navigation = network-first**: HTML/navigation requests fetched with `cache: 'no-store'`, cached as fallback; offline returns the cached shell.
- **Assets = stale-while-revalidate**: Cached assets served instantly while the service worker refreshes them in the background.
- **IndexedDB**: All app state stored locally; no server calls needed.
- **Notifications**: Queued locally if no internet.

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
const pointsPerCompletion = habit.customPoints ?? 10

// Per-habit streak bonuses
const bonuses = habit.customStreakBonuses ?? { 3: 2, 7: 5, 30: 10 }
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
- **Canonical key**: `namami-state-v1` (with legacy fallbacks auto-read and re-saved to the canonical key to preserve old installs)
- **Config**: Stable database name `namami`, storeName `state` for consistent persistence across releases
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
- **Init**: Attempts legacy keys first, migrates if needed, and re-saves to canonical key; defaults used if empty
- **Migration**: Automatic data upgrade if schema version changes; data is retained across deployments

**Service Worker Cache**
- **Versioned caches per deploy**: Names are generated per build to avoid stale assets
- **Navigation strategy**: Network-first `no-store` for HTML with cached fallback for offline use
- **Asset strategy**: Stale-while-revalidate; cached response first, background refresh
- **Client refresh**: New service worker claims clients and triggers a one-time reload so the latest bundle is shown automatically

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
4. App opens in standalone mode (no browser UI)

### Manifest Shortcuts
Users can add app shortcuts to home screen:
- **Quick Check-ins**: Jump to daily habit view
- **Add Habit**: Quick access to add new habit

---

## 🎨 UI/UX Improvements & View Details

### Inline Habit Details (Home Page)
- **View Details Button**: Click "View detail →" on any habit card to expand details inline
- **Positioned Below Habit**: Detail view appears immediately below the clicked habit for better UX
- **Page-Scoped**: Detail view only displays on the Home page, not on other pages
- **Contains**: 
  - Individual heatmap for the habit
  - Weekly/monthly progress charts
  - Earned badges specific to this habit
  - Gamification customization panel
  - Streak, total completed, and progress percentage
- **Quick Navigation**: Easy to close detail view and continue with other habits

### Badge Display & Icons
- **Visual Icons**: All badges display with emoji icons (🔥 🌟 👑 💎 ✨) for better recognition
- **Glow Effect**: Unlocked badges have a subtle glow effect; locked badges appear dimmed
- **Earned Count**: Shows how many times each badge was earned
- **Per-Habit Breakdown**: Display which habits earned streak badges and how many times per habit

### Rewards Page Badge Section
- **🏆 Badges Earned**: New dedicated section at the top of the Rewards page
- **Badge Gallery**: Grid layout displaying all earned badges with emoji icons
- **Detailed Breakdown**: Shows:
  - Badge name and description
  - Total earn count
  - Which habits earned it and how many times per habit
- **Visual Design**: Emerald accent background with clear typography
- **Never Disappears**: Earned badges permanently displayed, regardless of current streak status

---

## 🎨 Habit Colors & Heatmap Visualization

### Available Colors (8 preset options)
- **Cyan** (#38bdf8): Cool, calming; default for first habit
- **Purple** (#c084fc): Creative, reflective habits
- **Green** (#34d399): Growth, health, nature habits
- **Amber** (#fbbf24): Energetic, active habits
- **Red** (#f87171): Intense, challenging habits
- **Indigo** (#818cf8): Meditative, mental habits
- **Pink** (#ec4899): Personal, self-care habits
- **Teal** (#14b8a6): Balance, grounding habits

### How Colors Work in Heatmaps
1. **Pick color** when creating/editing habit
2. **Color persists** with that habit forever (unless changed)
3. **Per-habit heatmap** on Dashboard displays in that color
4. **Individual heatmaps** on HabitDetail also use that color
5. **CSS injection** dynamically applies color to calendar cells:
   ```css
   .heatmap-38bdf8 .color-github-4 { fill: #38bdf8 !important; }
   ```
6. **Global heatmap** uses fixed blue spectrum (color intensity = number of habits)

### Color Examples
- "Morning Meditation" = Purple heatmap
- "Exercise" = Green heatmap
- "Read" = Amber heatmap
- All visible at once on Dashboard in their unique colors

---

### Habit & Goal Type Testing
- [ ] **Habit Creation**: Create daily + target-based habits with all three goal types
  - [ ] Binary: Simple done/missed toggle works
  - [ ] Count-based: Set target count (e.g., 10), log values, check "X / 10" display and goal met indicator
  - [ ] Duration-based: Set target minutes (e.g., 20), log minutes, check "X / 20 min" display and goal met indicator
- [ ] **Color Picker**: Test all 8 preset colors, verify selection persists on edit
- [ ] **Partial Progress**: Log count/duration below target, verify display shows value but "Goal met" doesn't appear

### Daily Check-ins & Streaks
- [ ] **Binary Tracking**:
  - [ ] "Mark done" button toggles state
  - [ ] Streak increments on done, resets on missed
  - [ ] Progress bar shows streak × 10 %
- [ ] **Count-based Tracking**:
  - [ ] Input accepts numbers, "Log" button updates display
  - [ ] Shows "7 / 10 completed" format
  - [ ] Streak increments only when count ≥ target
  - [ ] Partial progress (7 < 10) does NOT increment streak
- [ ] **Duration-based Tracking**:
  - [ ] Input accepts minutes, "Log" button updates display
  - [ ] Shows "15 / 20 min" format
  - [ ] Streak increments only when minutes ≥ target
  - [ ] Partial progress (15 < 20) does NOT increment streak

### Heatmap Testing
- [ ] **Global Heatmap**:
  - [ ] Displays on Dashboard below DashboardStats
  - [ ] Shows 120-day calendar grid
  - [ ] Color intensity matches: gray (0) → light cyan (1-2) → medium cyan (3-4) → bright cyan (5+)
  - [ ] Updates in real-time when habits are logged
- [ ] **Per-Habit Heatmaps**:
  - [ ] Display in 2-column grid between global heatmap and habit cards
  - [ ] Each shows the habit's unique color
  - [ ] Binary: Green on days marked done
  - [ ] Count-based: Green only when logged count ≥ target
  - [ ] Duration-based: Green only when logged minutes ≥ target
  - [ ] Do NOT show green for partial progress (e.g., 5 when target is 10)
- [ ] **Heatmap Responsiveness**:
  - [ ] Scrollable on mobile
  - [ ] Full view on desktop
  - [ ] Date labels visible (weekdays + dates)

### Gamification & Points
- [ ] **Binary Points**:
  - [ ] Marking done awards MITHURA
  - [ ] Marking missed removes MITHURA
  - [ ] Daily bonus appears only when ALL habits done
- [ ] **Count-based Points**:
  - [ ] Points awarded ONLY when count ≥ target (no partial)
  - [ ] Logging 7 (target 10) earns 0 points
  - [ ] Logging 10 earns points + continues streak
- [ ] **Duration-based Points**:
  - [ ] Points awarded ONLY when minutes ≥ target (no partial)
  - [ ] Logging 15 min (target 20) earns 0 points
  - [ ] Logging 20 min earns points + continues streak
- [ ] **Streak Bonuses**: Unlock at 3/7/30 days visible in badges
- [ ] **Per-Habit Overrides**:
  - [ ] Toggle "Use custom MITHURA" on Habit Detail page (click "View detail" on habit card)
  - [ ] Custom points override global defaults
  - [ ] Custom streak bonuses override global defaults
  - [ ] Habit Detail shows: heatmap, charts, badges, gamification settings (rewards are on Dashboard)
  - [ ] Habit Detail page shows: heatmap, charts, badges, gamification panel (no rewards)

### Badges System
- [ ] **Streak Badges** (per-habit):
  - [ ] 🔥 3-day Streak unlocks at 3-day streak
  - [ ] 🌟 7-day Streak unlocks at 7-day streak
  - [ ] 👑 30-day Streak unlocks at 30-day streak
  - [ ] Each habit can earn its own badges
- [ ] **Points Badges** (global):
  - [ ] 💎 100+ MITHURA unlocks when total points ≥ 100
  - [ ] ✨ 500+ MITHURA unlocks when total points ≥ 500
- [ ] **Badge Persistence**:
  - [ ] Earned badges displayed on Habit Detail page
  - [ ] Badges never disappear, even if streak is lost
  - [ ] Badge appears again if streak is rebuilt (tracked separately)
- [ ] **Rewards Page Badges**:
  - [ ] View all earned badges in "🏆 Badges Earned" section
  - [ ] Shows each badge with emoji icon, count, and per-habit breakdown
  - [ ] Multiple earnings per badge displayed (e.g., "3-day Streak" earned for 2 habits = 2 entries)
- [ ] **Badge Visual**:
  - [ ] Unlocked badges show with full color and glow effect
  - [ ] Locked badges appear dimmed
  - [ ] Icons are clear and recognizable

### Progress Bars & Stats
- [ ] **Daily Habits (Binary)**: Shows streak × 10 % (e.g., 5 days = 50%)
- [ ] **Daily Habits (Count/Duration)**: Shows % of today's target achieved (e.g., 7/10 = 70%)
- [ ] **Target-based Habits**: Shows % progress toward target days (e.g., 12/20 days = 60%)
- [ ] **DashboardStats**: Habits today, best streak, total MITHURA all accurate

### Rewards System (Global - Dashboard)
- [ ] **Location**: Rewards panel visible on Dashboard (not in Habit Detail)
- [ ] **Rewards Page**: Click "Rewards" tab for dedicated rewards page with badges section
- [ ] **Create**: Add reward name + MITHURA cost
- [ ] **Edit**: Click edit on unclaimed reward, change name/cost, save
- [ ] **Delete**: Click remove on unclaimed reward, confirm deletion
- [ ] **Claim**: When MITHURA ≥ required, claim button appears and works
- [ ] **History**: Claimed rewards persist even after deletion (in history, not active list)
- [ ] **Global Access**: All rewards shared across all habits, not per-habit
- [ ] **Badges on Rewards Page**: Top section shows "🏆 Badges Earned" with all earned badges
- [ ] **Inline Habit Details**: Works on Home page only; clicking habit card shows detail inline below it

### Quotes & Notifications
- [ ] **Daily Rotation**: Different quote each day (deterministic seed based on date)
- [ ] **Category Toggle**: Switch between General and Bhagavad Gita quotes
- [ ] **Custom Quotes**: Add custom quote, verify it appears in rotation
- [ ] **Notifications**: Grant permission, send quote notification, verify display

### Offline & Persistence
- [ ] **Offline Loading**: Close network, reload app, data loads correctly
- [ ] **Offline Logging**: Close network, log a binary habit, count, and duration values
- [ ] **Persistence**: Reload app with network off, all logged data persists
- [ ] **Count/Duration Values**: Log count/duration offline, sync on reconnect

### PWA & Installation
- [ ] **Install**: Chrome > "Install app" works, opens in window
- [ ] **Quotes**: Daily quotes displayed at top of Dashboard
- [ ] **Shortcuts**: Quick check-ins shortcut works
- [ ] **Service Worker**: App loads offline with service worker active
- [ ] **Cache**: Hard refresh clears cache, SW re-registers

### Data Migration
- [ ] **Schema v1 → v2**: Old binary habits still work
- [ ] **Schema v2 → v3**: Goal types added, all habits default to binary (backward compatible)
- [ ] **New Data**: Count/duration habits created with proper goalType, dailyValueHistory
- [ ] **No Data Loss**: All existing history, streaks, rewards preserved

### Charts & Visualization
- [ ] **Weekly Bar Chart**: Shows last 8 weeks, counts days where targets met
- [ ] **Monthly Area Chart**: Shows last 6 months, counts days where targets met
- [ ] **Charts Responsive**: Adapt to screen size, readable on mobile

### Settings
- [ ] **Global MITHURA**: Change per-completion points, daily bonus, streak bonuses
- [ ] **Gamification Toggle**: Disable/enable, points recalculate correctly
- [ ] **Notifications Toggle**: Enable/disable web notifications
- [ ] **Quote Category**: Switch between General and Gita categories
- [ ] **Persistence**: All settings persist after refresh

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
| Quotes not changing | Quotes rotate daily; force refresh or check custom quotes in settings |
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

## 📤 Deployment Guide

### GitHub Pages (Recommended - Free, Automatic HTTPS)

1. **Update `vite.config.js`**:
```js
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

2. **Build and deploy**:
```bash
npm run build
git add -A
git commit -m "Deploy to GitHub Pages"
git push origin main
```

3. **Enable Pages in GitHub**:
   - Go to Repo Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` (or `gh-pages`)
   - Save

Your app will be live at: `https://yourusername.github.io/your-repo-name/`

**Auto-deploy with GitHub Actions**:

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

Every push to main will automatically deploy!

### Vercel (Zero Config, Fastest)

```bash
npm install -g vercel
vercel
```

Follow prompts. Auto HTTPS, edge caching, analytics included.

**Fresh HTML on every deploy (no manual hard refresh):**
- The repo includes `vercel.json` that sets `Cache-Control: no-cache, no-store, must-revalidate` for `/` and `/index.html` so the service worker sees the latest shell on each release.
- After deploy, the service worker auto-updates clients and triggers a one-time reload so mobile users get new code without clearing cache.

### Netlify (Drag & Drop)

```bash
npm run build
```

Visit [netlify.com/drop](https://netlify.com/drop) and drag the `dist` folder.

Or connect your GitHub repo for auto-deploys on each push.

### Self-Hosted (VPS/Cloud)

```bash
npm run build
# Deploy dist/ folder to any static web host
```

Example nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/namami/dist;
    
    location / {
        try_files $uri /index.html;
    }
}
```

---

## 💻 Development

### Setup

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:5173` with HMR (hot reload).

### Build for Production

```bash
npm run build           # Creates optimized dist/ folder
npm run preview        # Preview production build locally
npm run lint           # Check for linting errors (ESLint)
```

### Project Structure

```
src/
├── context/AppContext.jsx      # Global state + storage
├── pages/                       # Full page components
├── components/                  # Reusable UI components
├── utils/                       # Helpers (dates, notifications)
├── data/                        # Static data (quotes)
├── App.jsx                      # App shell
├── main.jsx                     # Entry + SW registration
└── index.css                    # Tailwind + custom utilities

public/
├── manifest.webmanifest         # PWA metadata
├── service-worker.js            # Offline caching
└── icons/                       # App icons

vite.config.js                  # Vite configuration
tailwind.config.js              # Tailwind theme
```

### Key Dependencies

- **React 19**: UI framework
- **Vite 7**: Build tool with lightning-fast HMR
- **Recharts**: Weekly/monthly charts
- **react-calendar-heatmap**: Heatmap visualization
- **localforage**: IndexedDB abstraction for offline storage
- **Tailwind CSS 3.4**: Utility-first CSS
- **ESLint**: Code quality checking

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Heatmap not rendering | Hard refresh (Ctrl+Shift+R), check dates in ISO format (YYYY-MM-DD) |
| Service Worker cached old code | Clear browser cache, hard refresh, DevTools > Application > Delete SW |
| Data not persisting | Check IndexedDB in DevTools, verify localforage working |
| Mobile can't reach localhost | Use Network IP (e.g., http://192.168.1.5:5173), ensure same WiFi |
| PWA install unavailable | Requires HTTPS (works on deployed apps, not local IPs) |
| Progress bar at 0% | Verify habit type and goal target; check history has completions |
| Custom MITHURA not applying | Enable "Use custom MITHURA" toggle on Habit Detail page |
| Streak not incrementing | Check that target was met; streaks only increment on completion |
| Count/Duration not saving | Verify input is a number; click Log button (Enter key doesn't work) |
| Notifications not working | Grant permission when prompted; enable in app Settings |
| Quote not changing daily | Clear cache if you changed system date |
| Theme colors not applying | Verify `habitColor` is valid hex code (#RRGGBB); hard refresh |

---

## ✅ Testing Checklist

### Habit Management
- [ ] **Create**: All three types (binary, count, duration) with color picker
- [ ] **Edit**: Change all fields without losing history
- [ ] **Delete**: Habit removed; heatmap history retained
- [ ] **Daily log**: Toggle binary, input count/duration, verify feedback

### Streaks & Progress
- [ ] **Streak increments**: Only when target met
- [ ] **Streak resets**: When target missed (not partial progress)
- [ ] **Progress bars**: Show correct % for all habit types

### Heatmaps
- [ ] **Global heatmap**: Color intensity matches completion count
- [ ] **Per-habit heatmaps**: Show in correct colors, 120-day view
- [ ] **Real-time update**: Refresh on habit log

### Gamification
- [ ] **MITHURA awards**: Added on completion
- [ ] **Streak bonuses**: Unlock at 3/7/30 days
- [ ] **Daily bonus**: +20 when all habits complete
- [ ] **Custom per-habit**: Override global values
- [ ] **Badges**: Display with glow effect when earned

### Rewards
- [ ] **Create/Edit/Delete**: Full CRUD operations
- [ ] **Claim**: Button appears at threshold
- [ ] **History**: Persists after deletion

### Settings
- [ ] **Global MITHURA**: Adjustments apply to all habits
- [ ] **Quote category**: Switch General ↔ Gita
- [ ] **Gamification toggle**: Disable/enable works
- [ ] **Notifications**: Toggle on/off

### Offline & PWA
- [ ] **Offline mode**: Disconnect network, app still works
- [ ] **Data persists**: Reload while offline, data remains
- [ ] **Service Worker**: Active in DevTools
- [ ] **"Add to Home Screen"**: Creates home screen icon
- [ ] **Quotes**: Daily quotes rotate and display correctly

### Cross-Browser
- [ ] Chrome/Edge: All features
- [ ] Safari: All features (desktop + mobile)
- [ ] Firefox: All features
- [ ] Mobile browsers: Touch interactions, installation

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with clear commit messages
4. **Test thoroughly** (desktop, mobile, offline)
5. **Push your branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request** with description of changes

### Code Guidelines

- Use ES6+ syntax
- Keep components under 400 lines
- Add comments for complex logic
- Follow existing code style
- Test on multiple devices/browsers

### Reporting Issues

Open an [Issue](https://github.com/yourusername/namami/issues) with:
- Clear description
- Steps to reproduce
- Screenshots if applicable
- Browser/device info

---

## 📄 License

MIT License – Use freely in commercial and personal projects.

See [LICENSE](LICENSE) file for full text.

---

## 🎉 Acknowledgments

Built with incredible open-source tools:
- **React 19** – UI library
- **Vite 7** – Build tool
- **Tailwind CSS** – Styling
- **Recharts** – Charts
- **react-calendar-heatmap** – Heatmaps
- **localforage** – Storage abstraction

---

## 📞 Get in Touch

Questions, suggestions, or just want to say hi?

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/namami/issues)
- **GitHub Discussions**: [Chat and ideas](https://github.com/yourusername/namami/discussions)
- **Email**: your-email@example.com

---

## 🚀 Habit Tracking Best Practices

### Getting Started
1. Start with 1-3 habits
2. Make them specific: "30-minute run" not "exercise"
3. Track daily
4. Review streaks weekly in Habit Detail

### Building Momentum
- Use heatmaps to spot patterns
- Celebrate badges
- Claim rewards regularly
- Customize MITHURA rewards for motivation

### Advanced Usage
- Mix all three goal types
- Use target-based for challenges
- Create color-coded habit groups
- Export data (coming soon)

---

## Quick Reference Tables

### Habit Types Comparison
| Feature | Daily | Target-Based |
|---------|-------|--------------|
| Duration | ∞ | Fixed (e.g., 30 days) |
| Form UI | No target input | Shows target days |
| Badge | Hidden | "Target: 30 days" |
| Use Case | Routines | Challenges |
| Example | "Meditate" | "30-day fitness challenge" |

### Goal Types Comparison
| Type | Input | Streak Logic | Points | Example |
|------|-------|--------------|--------|---------|
| Binary | Done/Missed | Done → +1 day | On completion | "Wake at 6am" |
| Count | Number | If ≥ target | Only if met | "Read 10 pages" |
| Duration | Minutes | If ≥ target | Only if met | "Exercise 30 min" |

### MITHURA Scoring
| Event | Points (Default) | Customizable |
|-------|------------------|--------------|
| Completion | +10 | Per habit |
| All done (daily) | +20 | Global |
| 3-day streak | +2 | Global |
| 7-day streak | +5 | Global |
| 30-day streak | +10 | Global |

---

**Made with 🔥 for habit builders everywhere.**

**Last updated**: January 2026 – Complete with binary, count-based, and duration-based goal types. Full schema v3 with backward compatibility. Global rewards system. Comprehensive deployment and development documentation.

---

### 🌟 Star us on GitHub!

If NAMAMI helps you build better habits, please consider [starring the repo](https://github.com/yourusername/namami) ⭐

Your support helps us reach more habit builders!


