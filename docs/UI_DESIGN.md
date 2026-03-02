# UI Design

This page describes how the interface is structured and how users interact with core workflows.

## Layout

- Three main sections: Home, Rewards, Settings
- Mobile-first spacing with responsive grid expansion on larger screens
- Card-based surfaces with consistent rounded corners and subtle borders

## Information Architecture

- **Home** prioritizes logging and daily visibility
- **Rewards** centralizes motivation mechanics (badges, redemption, freeze)
- **Settings** isolates global preferences from day-to-day actions

## Visual System

- Tailwind utility classes + CSS variables for theme-aware colors
- Two themes: dark and light
- Habit cards support selectable accent colors used in per-habit heatmaps

## Interaction Patterns

- Inline habit actions: check-in, edit, delete, detail view
- Date navigation for backfill and historical tracking
- Reward redemption and streak freeze purchase from Rewards page
- Settings apply global defaults; habit detail handles per-habit tuning

## Responsiveness

- Optimized for small screens first, then expanded layouts on larger viewports
- Component spacing and card stacking prioritize readability over density
- Controls remain directly accessible without nested navigation

## Accessibility Baseline

- Keyboard-usable controls
- Clear focus states on interactive elements
- Readable contrast in both themes

For behavior details, see [FEATURES.md](FEATURES.md).
