# TECHNICAL – Architecture & Stack

## Technology Stack

| Layer | Tech | Purpose |
|-------|------|---------|
| UI | React 19 | Component-based interface |
| Build | Vite 7 | Fast, ES module bundler |
| Styling | Tailwind CSS 3.4 | Utility-first, dark mode |
| State | Context API | Global state (no Redux) |
| Storage | IndexedDB (localforage) | Client-side database |
| Charts | Recharts 3.6 | Weekly/monthly visualization |
| Heatmap | react-calendar-heatmap | GitHub-style graphs |
| PWA | Service Worker | Offline caching |

**Bundle**: ~622 KB gzipped

## Architecture

Single Page App (SPA) with no backend:
- All data stored locally (IndexedDB)
- Service Worker precaches app shell
- State changes trigger UI updates
- Auto-save to storage on every change

```
User Action → Component Handler → AppContext → IndexedDB Save → UI Response
```

## Project Structure

```
src/
├── context/AppContext.jsx      # Global state + storage logic
├── pages/                       # Full pages (Home, Rewards, Settings)
├── components/                  # Reusable UI components
├── utils/                       # date.js, notifications.js
├── data/quotes.js               # Quote database
└── App.jsx                      # Main app shell

public/
├── manifest.webmanifest         # PWA metadata
├── service-worker.js            # Offline caching
└── icons/                       # App icons
```

## Data Schema (v4)

**Habit**:
```javascript
{
  id, name, description,
  isDailyHabit,        // true: ongoing, false: 30-day challenge
  targetDays,          // only for target-based
  habitColor,          // hex code (#38bdf8)
  goalType,            // 'binary' | 'count' | 'duration'
  goalTarget,          // null for binary, number for count/duration
  customPoints,        // points per completion
  customStreakBonuses, // {3: 2, 7: 5, 30: 10}
  history,             // { "2026-01-15": true|false }
  dailyValueHistory,   // { "2026-01-15": 7 } for count/duration
  createdAt, updatedAt
}
```

**Settings**:
```javascript
{
  dailyBonus,           // +20 when all habits done
  globalStreakBonuses,  // {3: 5, 7: 10, 30: 20}
  gamificationEnabled,  // true|false
  notificationsEnabled, // true|false
  quoteCategory         // 'general' | 'gita'
}
```

**Rewards**: `{ id, name, requiredPoints, deleted }`  
**Badges**: Auto-calculated from streaks and points  

## State Management

`AppContext` is single source of truth:
- All state in one context (no Redux needed)
- Every action updates state
- State changes auto-save to IndexedDB
- Components re-render on relevant state changes

## Offline Strategy

**Service Worker**:
- Precaches app shell (HTML, CSS, JS)
- Network-first for navigation (falls back to cached shell)
- Stale-while-revalidate for assets

**IndexedDB**:
- All data stored locally
- Async, queryable database
- Survives app close/browser restart
- localforage library handles complexity

**Result**: App works without internet

## Key Algorithms

**Streak Calculation**:
```
Count backward from today.
Day counts only if target IS met (not partial).
Stop at first day target NOT met.
Return streak number.
```

**MITHURA Calculation**:
```
Base: Sum of (habit completions × points per habit)
+ Per-habit streaks bonuses (3/7/30 day thresholds)
+ Daily bonus (if ALL habits done)
+ Global streak bonuses (if ALL habits done for N consecutive days)
= Total MITHURA
```

**Heatmap Colors** (count/duration only):
```
0% progress → gray
1-24% → 25% opacity habit color
25-49% → 50% opacity
50-74% → 75% opacity
75%+ → 100% opacity (full color)
```

## Data Persistence

**IndexedDB via localforage**:
- Database: `namami`
- Store: `state`
- Key: `namami-state-v1`
- Auto-save on every state change

**Schema Versioning**:
- Current: v4
- On load, detect version and migrate if needed
- v1→v2, v2→v3, v3→v4: all backward compatible
- No data loss on updates

## Performance

- **Load time**: ~1.5s (includes Recharts)
- **Heatmap render**: 120 cells = instant
- **Streak calculation**: ~5ms (O(n) for days)
- **Re-renders**: Batched via Context
- **Storage query**: <5ms IndexedDB operations

---

**See [FEATURES.md](FEATURES.md) for user features**  
**See [INSTALLATION.md](INSTALLATION.md) for setup**
