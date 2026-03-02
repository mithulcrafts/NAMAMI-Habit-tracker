# Technical

This page summarizes the implementation approach used in NAMAMI.

## Stack

- React 19 + Vite 7
- Tailwind CSS
- Context API for app state
- IndexedDB via `localforage`
- `react-calendar-heatmap` and `recharts` for visualizations
- Service worker + web manifest for PWA support

## Architecture

- Single-page app with no backend
- `AppContext` is the source of truth for habits, rewards, settings, badges, and points
- State is persisted to IndexedDB and migrated by schema version
- UI pages are selected in `App.jsx` (`home`, `rewards`, `settings`)

## Module Map

- `src/context/AppContext.jsx`: global state, actions, and persistence wiring
- `src/pages/`: route-like page surfaces for Home, Rewards, Settings, and detail pages
- `src/components/`: reusable UI blocks (cards, charts, heatmaps, rewards)
- `src/utils/`: date helpers and notification-related utilities

## Data Model (high level)

- `habit`: metadata, goal config, history, streak-related fields
- `settings`: gamification defaults, theme, quote category
- `rewards` + `claimedRewards`
- `earnedBadges` + `manualAdjustment` + `streakFreezes`

## Persistence Behavior

- App state is saved to IndexedDB using `localforage`
- Existing data is restored on app load
- Schema versioning supports migration as data structures evolve

## Scoring Rules

Total MITHURA combines:

- per-habit completion points
- daily all-habits bonus
- per-habit streak bonus
- global streak bonus
- manual adjustments

Scoring values are deterministic from stored settings and habit history.

## Offline Behavior

- Service worker precaches shell assets
- Navigation and assets use network-first with cache fallback
- Runtime requests use cache with background refresh

## Operational Limits

- No server-side processing or cloud data backup
- Data continuity depends on browser storage retention
- Cross-device sync is not part of current architecture

See [FEATURES.md](FEATURES.md) for user-level behavior.
