# UI Design

## Layout

- Three main sections: Home, Rewards, Settings
- Mobile-first spacing with responsive grid expansion on larger screens
- Card-based surfaces with consistent rounded corners and subtle borders

## Visual System

- Tailwind utility classes + CSS variables for theme-aware colors
- Two themes: dark and light
- Habit cards support selectable accent colors used in per-habit heatmaps

## Interaction Patterns

- Inline habit actions: check-in, edit, delete, detail view
- Date navigation for backfill and historical tracking
- Reward redemption and streak freeze purchase from Rewards page
- Settings apply global defaults; habit detail handles per-habit tuning

## Accessibility Baseline

- Keyboard-usable controls
- Clear focus states on interactive elements
- Readable contrast in both themes

For behavior details, see [FEATURES.md](FEATURES.md).
