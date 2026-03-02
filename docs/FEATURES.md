# Features

This document explains what users can do in NAMAMI and how key features behave in practice.

## Habit Tracking

- Create, edit, and delete habits
- Goal types: `binary`, `count`, `duration`
- Habit modes: daily or target-based challenge
- Backfill and review previous dates from the date navigator
- Each habit stores its own progress history and streak state
- Habit cards support quick actions for daily logging

<img width="1920" height="3043" alt="image" src="https://github.com/user-attachments/assets/acb71c12-f031-4840-b60d-29638f3f1c52" />


### Goal Types

- `binary`: complete or not complete
- `count`: complete when numeric target is reached
- `duration`: complete when time-based target is reached


## Progress & Insights

- Current streak and total completions per habit
- Global completion heatmap
- Per-habit heatmap with color intensity based on progress
- Dashboard stats including available and lifetime MITHURA
- Charts summarize completion trends over time
- Date navigation allows historical review without changing habit setup

<img width="614" height="985" alt="image" src="https://github.com/user-attachments/assets/a05738cf-b43b-4c9e-92da-54f32a114131" />

## Gamification

- Points per completion (global + per-habit settings)
- Daily bonus when all habits are completed
- Streak bonuses (per habit and global)
- Auto-earned badges and custom reward redemption
- Streak freeze purchase/use flow
- Manual point adjustments supported through existing state model

<img width="1920" height="1131" alt="image" src="https://github.com/user-attachments/assets/46d2b0bd-a1af-4008-bdbf-bef7bad2d5f0" />


### Reward System Behavior

- Available MITHURA can be spent on rewards and streak freeze
- Lifetime MITHURA reflects total earned value over time
- Badges are earned automatically when their conditions are met


## Settings

- Daily quote card on Home
- Quote category: general or Bhagavad Gita
- Light/dark theme toggle
- Global defaults for points and streak-related rules
<img width="1920" height="1092" alt="image" src="https://github.com/user-attachments/assets/cd245a71-75f9-439d-a0b3-48add3a11d83" />


## Offline & PWA

- Uses local IndexedDB storage (`localforage`)
- No account or server required
- Installable PWA with service worker caching

## Feature Boundaries

- Data is local to the browser/device profile
- Clearing browser storage removes local app data
- There is no built-in cloud sync or multi-device merge

See [TECHNICAL.md](TECHNICAL.md) for implementation details.

