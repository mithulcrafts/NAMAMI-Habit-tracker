# UI_DESIGN – Design System

## Color Palette

**Brand**:
- Primary: Cyan `#38bdf8` (buttons, links, focus)
- Background light: `#ffffff`
- Background dark: `#0f172a` (slate-950)

**Habit Colors** (8 options for heatmaps):
- Cyan, Purple, Green, Amber, Red, Indigo, Pink, Teal

**Semantic**:
- Success: Green `#34d399`
- Warning: Amber `#fbbf24`
- Error: Red `#f87171`
- Info: Cyan `#38bdf8`
- Neutral: Gray `#6b7280`

## Typography

- **Font**: System fonts (Inter via Tailwind)
- **Body**: 16px, 1.5 line-height
- **H1**: 32px bold
- **H2**: 24px bold
- **H3**: 20px bold
- **Small**: 14px
- **Tiny**: 12px

## Spacing

Use Tailwind scale (multiples of 0.25rem):
- xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px | 2xl: 48px

## Components

**Buttons**:
- Primary: Cyan bg, white text, 40px min-height
- Secondary: Transparent, cyan border
- Danger: Red bg for delete/remove
- Focus: 2px cyan outline, 2px offset

**Cards**:
- Padding: 1.5rem (desktop), 1rem (mobile)
- Border: 1px light/dark gray
- Border radius: 8px
- Shadow on hover

**Inputs**:
- Padding: 8px 12px
- Border radius: 4px
- Focus: 2px cyan border + shadow
- Error: Red border

**Heatmap Cells**:
- Desktop: 24×24px | Tablet: 20×20px | Mobile: 16×16px
- 2px gap between cells
- Opacity-based for partial progress

## Responsive Design

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, scrollable |
| Tablet | 640-1024px | Two columns where fit |
| Desktop | > 1024px | Multi-column, full heatmap |

## Theme System

**Light Mode** (default):
- Background: White
- Text: Dark gray
- Border: Light gray

**Dark Mode**:
- Background: Slate-950
- Text: Light gray
- Border: Slate-800

Toggle in Settings (applied instantly).

## Animations

- Page transitions: 300ms fade
- Hover effects: 200ms ease
- Badge glow: pulse 2s
- Entrance: fade + slide (200ms)

## Accessibility

- Contrast: 4.5:1 minimum (text on background)
- Focus: Visible outline on all interactive elements
- Touch targets: 44px minimum (mobile)
- Keyboard nav: Full tab support
- Screen reader: Semantic HTML, ARIA labels

## Icons

**Badges**: 🔥 🌟 👑 💎 ✨  
**UI**: 📅 ⚙️ 🎁 📊 🔔 🌓  
**Actions**: ✅ ❌ ✏️ 🔄 📤  

---

**See [FEATURES.md](FEATURES.md) for feature visuals**
