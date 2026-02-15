# FEATURES – What You Can Do

## Habit Management

**Create habits** with:
- Name, description, custom color (8 options)
- Goal type: Binary (done/missed), Count (numeric), Duration (minutes)
- Habit type: Daily (ongoing) or Target-based (30-day challenges)
- MITHURA points per completion (configurable)

**Track daily** with:
- Binary: Simple "Done" / "Missed" toggle
- Count: Log numeric value (e.g., "10 pages read")
- Duration: Log minutes (e.g., "20 minutes exercise")

**Manage** by editing, deleting, or backfilling past dates

## Three Goal Types

| Type | Input | Streak Logic | Example |
|------|-------|--------------|---------|
| Binary | Done/Missed | Continues only if done | Meditation |
| Count | Number | Continues if count ≥ target | Read 10 pages |
| Duration | Minutes | Continues if minutes ≥ target | Exercise 30 min |

**Key**: No partial points. Streaks only continue when target is MET.

## Heatmaps

**Global Heatmap**: Aggregated completions across all habits (colored by completion %)
- Dark gray: 0 habits done
- Light → Dark green: 1% → 100% of habits completed

**Per-Habit Heatmaps**: Individual 120-day calendar in habit's unique color
- Binary: Full color (done) or empty (missed)
- Count/Duration: Opacity scales with progress toward target

## Progress Tracking

- **Streaks**: Consecutive days meeting goal (resets on miss)
- **Progress Bars**: Visual % toward daily or target completion
- **Charts**: Weekly bars and monthly area charts
- **Statistics**: Today's habits, best streak, lifetime stats

## Gamification (MITHURA)

**Earning points**:
- Completing habit: +10 points (customizable per habit)
- All habits done in day: +20 daily bonus
- 3/7/30-day streaks: Per-habit bonuses
- Global streak bonuses: When ALL habits hit for consecutive days

**Badges** (automatic):
- 🔥 3-day, 🌟 7-day, 👑 30-day streaks (per habit)
- 💎 100+ points, ✨ 500+ points (global)

**Rewards** (you create):
- Define custom rewards (e.g., "movie night" for 50 points)
- Claim when you have enough MITHURA
- Spend points = redeem rewards

**Customization**:
- Enable/disable gamification globally
- Adjust points per completion
- Custom streak bonuses per habit
- All optional—works without gamification

## Daily Quotes

- Quote of the day displayed on home page
- Two categories: General or Bhagavad Gita
- Add custom quotes anytime
- Same quote all day, different every day
- Optional: Send as browser notification

## Pages & Navigation

| Page | Features |
|------|----------|
| **Home** | Dashboard with quote, stats, heatmaps, habit cards |
| **Rewards** | Earned badges gallery, reward management, claim history |
| **Settings** | Gamification, notifications, theme, quote category |

## PWA Installation

**Desktop (Chrome/Edge)**: Click "Install app" in menu  
**Android (Chrome)**: Menu → "Install app"  
**iOS (Safari)**: Share → "Add to Home Screen"

## Themes & Customization

- **Dark Mode**: Toggle anytime in Settings
- **Habit Colors**: 8 preset colors for heatmap visualization
- **Responsive**: Works on mobile, tablet, desktop

## Offline & Storage

- Works completely offline
- All data stored locally (IndexedDB)
- No internet required for any feature
- Automatic sync when reconnected

## Accessibility

- Keyboard navigation throughout
- Screen reader support
- High contrast ratios (4.5:1+)
- 44px touch targets

---

**For implementation details, see [TECHNICAL.md](TECHNICAL.md)**
