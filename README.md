# NAMAMI – Offline-First Habit Tracker

A production-ready PWA habit tracker with streaks, MITHURA points, gamification, rewards, daily quotes, and Android home-screen widget support. Built with React + Vite, fully offline-capable, no backend required.

**NEW:** Binary, count-based, and duration-based goal types. Track habits with flexible, measurable targets (read 10 pages, meditate 20 minutes, or simple done/missed). Heatmap system (global + per-habit), optional target days, fully customizable gamification per habit, and global reward management on Dashboard.

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
- **Binary**: Simple "Mark done" button (marks today as complete/incomplete)
- **Count/Duration**: Input field to log today's count or minutes, "Log" button
  - Shows visual feedback: "7 / 10 completed" with ✓ indicator when target met
  - Partial progress shown (e.g., "7 / 10" even if 7 < 10)

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
- **Color intensity levels**:
  - Dark gray: Days with 0 habits completed
  - Light cyan (rgba 35%): 1-2 habits completed
  - Medium cyan (rgba 60%): 3-4 habits completed
  - Bright cyan (#38bdf8): 5+ habits completed (or all habits)
- 120-day historical view
- Updated in real-time as you log habits

**Per-Habit Heatmaps** (Dashboard grid):
- Individual 120-day calendar for each habit
- Uses that habit's **unique color** for visual distinction
- Color is customizable when creating or editing the habit
- 8 preset colors available: cyan, purple, green, amber, red, indigo, pink, teal
- Shows exactly which days the habit target was met
- Easy to spot patterns per habit at a glance

**Heatmap Rendering**:
- **Library**: React Calendar Heatmap
- **Date format**: ISO format (YYYY-MM-DD) for accuracy
- **Computation**: Automatic Date object calculation for 120-day range
- **Empty cells**: Dark gray (#132035) indicates no completion
- **Filled cells**: Habit color shows target was met that day
- **Responsive**: Scrollable on mobile, full view on desktop
- **Offline**: Rendered entirely client-side, fully works offline

**Completion Logic**:
- **Binary**: Heatmap shows green on days marked "done"
- **Count-based**: Heatmap shows color only when logged count ≥ target
- **Duration-based**: Heatmap shows color only when logged minutes ≥ target
- Partial progress NOT shown in heatmap (but tracked in dailyValueHistory)

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
- Note: Rewards are global (managed on Dashboard, not in Habit Detail)
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

### 5. Rewards System (Full CRUD - Global)

**Location**: Global rewards panel on Dashboard (not per-habit)

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
│   └── AppContext.jsx              # Global state, storage, gamification logic, migration
├── pages/
│   ├── Dashboard.jsx               # Main view: habits, global heatmap, per-habit heatmaps, stats, quotes, global rewards
│   ├── HabitDetail.jsx             # Habit detail: individual heatmap, charts, badges, gamification settings
│   └── Settings.jsx                # Global configuration, feature toggles
├── components/
│   ├── HabitForm.jsx               # Habit creation/edit with color picker, daily/target-based toggle, goal type selector
│   ├── HabitCard.jsx               # Habit quick-view card with daily toggle
│   ├── DashboardStats.jsx          # Summary stats (today, best streak, MITHURA)
│   ├── GlobalHeatmap.jsx           # Aggregated completion heatmap (all habits, color intensity)
│   ├── Heatmap.jsx                 # Individual habit heatmap with unique color per habit
│   ├── ProgressCharts.jsx          # Weekly + monthly completion charts
│   ├── Badges.jsx                  # Badge cards (3/7/30 day streaks, 100+ points)
│   ├── HabitGamificationPanel.jsx  # Per-habit MITHURA customization UI
│   ├── Rewards.jsx                 # Global reward management (add/edit/remove/claim) - displayed on Dashboard
│   ├── QuoteCard.jsx               # Daily quote + category toggle + notify button
│   └── WidgetCard.jsx              # Widget preview (quote + streak + MITHURA)
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

### Habit Schema (Current: v3)
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
  useGlobalGamification: boolean,     // Toggle for per-habit point customization
  customPoints: number | null,        // Custom MITHURA per completion (if not global)
  customStreakBonuses: {3,7,30},      // Custom streak bonus values (if not global)
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
  pointsPerHabit: number,             // Default MITHURA per completion (default: 10)
  dailyBonus: number,                 // MITHURA for all habits done (default: 20)
  gamificationEnabled: boolean,       // Master gamification toggle (default: true)
  notificationsEnabled: boolean,      // Web notifications toggle (default: false)
  quoteCategory: 'general' | 'gita',  // Daily quote source (default: 'general')
  streakBonuses: {3: 2, 7: 5, 30: 10},// Bonuses at milestone streaks (customizable)
}
```

### Reward Schema
```javascript
reward = {
  id: string,                         // UUID
  name: string,                       // Reward title
  requiredPoints: number,             // MITHURA threshold to unlock
  claimed: boolean,                   // If user has claimed this reward
  deleted: boolean,                   // Soft delete (doesn't appear in active list but persists in history)
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
   // For each habit, determine points per completion
   const pointsPerCompletion = habit.useGlobalGamification
     ? settings.pointsPerHabit
     : (habit.customPoints ?? settings.pointsPerHabit)
   
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
   const bonuses = habit.useGlobalGamification
     ? settings.streakBonuses
     : (habit.customStreakBonuses ?? settings.streakBonuses)
   
   if (habit.streak >= 30) totalMITHURA += bonuses[30]  // +10
   else if (habit.streak >= 7) totalMITHURA += bonuses[7]   // +5
   else if (habit.streak >= 3) totalMITHURA += bonuses[3]   // +2
   ```

6. **Final Total**: Base points + daily bonus + streak bonus
   ```javascript
   totalPoints = basePoints + dailyBonusPoints + streakBonus
   ```

7. **Badges** unlocked when:
   - 3-day streak: `habit.streak >= 3`
   - 7-day streak: `habit.streak >= 7`
   - 30-day streak: `habit.streak >= 30`
   - 100+ points: `totalPoints >= 100`

8. **Heatmaps** show completion (colored cell) only when target met:
   - **Binary**: Green on days where `history[date] === true`
   - **Count-based**: Green only when `dailyValueHistory[date] >= goalTarget`
   - **Duration-based**: Green only when `dailyValueHistory[date] >= goalTarget`
   - Partial progress NOT shown (but tracked for future reference)

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

### Progress Bars & Stats
- [ ] **Daily Habits (Binary)**: Shows streak × 10 % (e.g., 5 days = 50%)
- [ ] **Daily Habits (Count/Duration)**: Shows % of today's target achieved (e.g., 7/10 = 70%)
- [ ] **Target-based Habits**: Shows % progress toward target days (e.g., 12/20 days = 60%)
- [ ] **DashboardStats**: Habits today, best streak, total MITHURA all accurate

### Rewards System (Global - Dashboard)
- [ ] **Location**: Rewards panel visible on Dashboard (not in Habit Detail)
- [ ] **Create**: Add reward name + MITHURA cost
- [ ] **Edit**: Click edit on unclaimed reward, change name/cost, save
- [ ] **Delete**: Click remove on unclaimed reward, confirm deletion
- [ ] **Claim**: When MITHURA ≥ required, claim button appears and works
- [ ] **History**: Claimed rewards persist even after deletion (in history, not active list)
- [ ] **Global Access**: All rewards shared across all habits, not per-habit

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
- [ ] **Widget**: Home screen widget shows daily quote + streak + MITHURA
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
