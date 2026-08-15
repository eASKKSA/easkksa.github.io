# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** ASKKSA Digital Dojo
**Generated:** 2026-08-14 23:47:36
**Category:** Service Landing Page

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#B5222B` | `--color-primary` |
| Secondary | `#111111` | `--color-ink` |
| CTA/Accent | `#E1AD43` | `--color-gold` |
| Background | `#F4F0E8` | `--color-paper` |
| Text | `#111111` | `--color-text` |

**Color Notes:** ASKKSA vermilion + sumi ink + warm paper. Gold is reserved for small highlights and focus states.

### Typography

- **Heading Font:** Barlow Condensed
- **Body Font:** Barlow
- **Mood:** athletic, precise, editorial, modern, compact
- **Google Fonts:** [Barlow Condensed + Barlow](https://fonts.google.com/share?selection.family=Barlow+Condensed:wght@500;600;700|Barlow:wght@400;500;600;700)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Vertical Rhythm

- **Page title → first content block:** `32px` (`page-intro-gap`)
- **Heading → supporting paragraph:** `24px`
- **Introductory copy → card grid:** `48px` mobile, `64px` desktop
- **Card grid gap:** `24px`
- **Compact list/grid gap:** `16px`
- **Major page sections:** `64px` mobile, `96px` desktop

The homepage hero may use `28px` between its headline and supporting copy to
preserve its tighter conversion-focused composition.

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #B5222B;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #B5222B;
  border: 2px solid #B5222B;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FFFDF8;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #B5222B;
  outline: none;
  box-shadow: 0 0 0 3px #B5222B20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Editorial sports minimalism with social proof

**Keywords:** asymmetrical grid, bold condensed typography, warm paper, high contrast, precise motion, authentic training imagery

**Best For:** B2B SaaS, professional services, premium products, e-commerce conversion pages, established brands

**Key Effects:** restrained reveal, editorial numbering, high-contrast image crops, subtle brand-circle motif

### Page Pattern

**Pattern Name:** Single-goal sports club landing

- **Conversion Strategy:** Make the first training step concrete: schedule, location, trust and a short trial form.
- **CTA Placement:** Hero + schedule + final invitation.
- **Section Order:** 1. Hero, 2. Trust facts, 3. Method, 4. Schedule, 5. Dojo/location, 6. Final trial CTA.

---

## Anti-Patterns (Do NOT Use)

- ❌ Complex navigation
- ❌ Hidden contact info

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
