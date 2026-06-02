# Design System Handover

## Overview

This document captures the design system used across the Dynamic Content POC and Variants Vision demos to ensure visual consistency.

---

## Design Tokens (CSS Variables)

### Surfaces
```css
--bg:        #FAFAF7;    /* Page background */
--surface:   #FFFFFF;    /* Card background */
--surface-2: #F4F4EF;    /* Elevated surface, input backgrounds */
--surface-3: #ECECE5;    /* Highest elevation */
```

### Ink (Text Colors)
```css
--ink:        #1B1F2A;    /* Primary text */
--ink-soft:   #4A5260;    /* Secondary text */
--ink-mute:   #6B7280;    /* Tertiary text, labels */
--ink-faint:  #9BA0AB;    /* Disabled, placeholders */
```

### Borders
```css
--border:        #E4E4DD;    /* Default border */
--border-strong: #CFCFC6;    /* Emphasized border */
```

### Brand Colors
```css
--dh-red:    #D61F26;    /* Delivery Hero primary */
--red-tint:  #FCE8E9;    /* Light background */
--red-edge:  #F2C9CB;    /* Border for tint */
```

### Status Colors
```css
/* Green (success, positive) */
--green:      #00A86B;
--green-2:    #008C58;
--green-tint: #E4F6EC;
--green-edge: #BFE5CF;

/* Amber (warning, attention) */
--amber:      #C8870D;
--amber-tint: #FBF0D6;
--amber-edge: #ECCF93;

/* Blue (info, neutral) */
--blue:       #0066B3;
--blue-2:     #004F8C;
--blue-tint:  #E1EEF7;
--blue-edge:  #B7D6EC;

/* Purple (accent, special) */
--purple:     #7B3FA0;
--purple-tint: #F1E7F8;
```

### Tier Colors (for model tiers)
```css
--t-lite:      #6B7280;   --t-lite-tint:   #EEEEF1;
--t-pro:       #0066B3;   --t-pro-tint:    #E1EEF7;
--t-plus:      #7B3FA0;   --t-plus-tint:   #F1E7F8;
--t-ent:       #B07005;   --t-ent-tint:    #FBF0D6;
```

### Typography
```css
--font: "Outfit", system-ui, sans-serif;
--mono: "JetBrains Mono", ui-monospace, monospace;
```

### Radius
```css
--radius-sm: 6px;
--radius:    10px;
--radius-lg: 14px;
--radius-xl: 22px;
```

### Shadows
```css
--shadow-1: 0 1px 2px rgba(20,22,30,0.04), 0 1px 1px rgba(20,22,30,0.03);
--shadow-2: 0 4px 14px -6px rgba(20,22,30,0.10), 0 2px 4px rgba(20,22,30,0.04);
--shadow-3: 0 12px 32px -12px rgba(20,22,30,0.16);
```

---

## Typography Classes

### Eyebrow (Labels)
```html
<div class="eyebrow">Section Label</div>
```
- Font: Outfit, 600 weight, 11px
- Letter-spacing: 0.14em, uppercase
- Color: var(--ink-mute)

### Mono (Code/Data)
```html
<div class="mono">monospace text</div>
```
- Font: JetBrains Mono
- Feature settings: "calt", "liga"

### Headings
```jsx
// H1 — Hero
style={{
  fontFamily: "var(--font)", fontWeight: 800,
  fontSize: "clamp(56px, 8vw, 104px)", lineHeight: 1.0,
  letterSpacing: "-0.04em", color: "var(--ink)",
}}

// H2 — Scene title
style={{
  fontFamily: "var(--font)", fontWeight: 700,
  fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05,
  letterSpacing: "-0.025em", color: "var(--ink)",
}}

// Lede paragraph
style={{
  fontSize: 19, lineHeight: 1.5,
  color: "var(--ink-soft)", maxWidth: 760, fontWeight: 400,
}}
```

---

## Core Components

### DCTag (Pill Tags)
```jsx
<DCTag tone="purple">From Image</DCTag>
<DCTag tone="neutral" mono>Barcode: 12345678</DCTag>
```

**Tones:** `neutral`, `red`, `green`, `amber`, `blue`, `purple`, `ink`

**Style:**
- Padding: 3px 9px
- Border-radius: 999px
- Font-size: 11.5px, font-weight: 600
- Border: 1px solid tone-edge

### DCCard (Container)
```jsx
<DCCard padded style={{ borderTop: "3px solid var(--purple)" }}>
  Content
</DCCard>
```

**Props:**
- `padded`: boolean (default: true) — adds 22px padding
- `accent`: string — color for top border
- `style`: object — additional styles

**Style:**
- Background: var(--surface)
- Border: 1px solid var(--border)
- Border-radius: var(--radius-lg)
- Box-shadow: var(--shadow-1)

### DCMark (Logo Icon)
```jsx
<DCMark size={32} accent="var(--dh-red)" />
```

Abstract "tier stack" — four rounded bars representing content flow.

### DCLockup (Logo + Wordmark)
```jsx
<DCLockup size={32} fontSize={18} color="var(--ink)" />
```

### DHBadge (Co-brand)
```jsx
<DHBadge size={18} />
```

Shows "by Delivery Hero" with logo.

### TopNav (Navigation)
```jsx
<TopNav active="home" />
```

**Links:**
- home → index.html
- strategy → Walkthrough.html
- demo → Demo.html

**Style:**
- Sticky top, backdrop blur
- Border-bottom: 1px solid var(--border)

---

## Scene Components

### Scene Wrapper
```jsx
<Scene 
  id="problems" 
  num={1} 
  total={8}
  kicker="The Problem" 
  eyebrowTone="red"
  title="The current approach hits a wall."
  lede="Description..."
  message="Key takeaway..."
>
  {children}
</Scene>
```

**Props:**
- `id`: unique identifier (for URL hash)
- `num`: scene number (1-indexed)
- `total`: total scenes
- `kicker`: eyebrow label
- `eyebrowTone`: color tone for badge/label
- `title`: H2 heading
- `lede`: introductory paragraph
- `message`: optional key message box

**Style:**
- Min-height: 100vh
- Padding: 100px clamp(28px, 5vw, 80px) 80px
- Max-width: 1060px, centered

### SceneBadge (Numbered Badge)
```jsx
<SceneBadge num={1} tone="red" />
```

**Style:**
- 36×36px, border-radius: 10px
- Border: 1.5px solid tone color
- Mono font, 13px, bold

### StepIndicator (Progress Pills)
```jsx
<StepIndicator step={2} total={5} tone="purple" />
```

**Style:**
- Horizontal pills, 6px height
- Active pill: 22px width
- Transition: 280ms ease

---

## Hooks

### useInView
```jsx
const ref = useRef(null);
const inView = useInView(ref, { threshold: 0.35 });
```

Returns `true` when element is in viewport.

### useSceneSteps
```jsx
const { step, inView, playing } = useSceneSteps(5, 1200, ref, { threshold: 0.35 });
```

Auto-advances `step` from 0 to `total-1` at `intervalMs` when in view.

**Parameters:**
- `total`: number of steps
- `intervalMs`: delay between steps
- `ref`: element ref
- `opts.threshold`: intersection threshold

---

## Animations

### Keyframes
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulseDot {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50%      { transform: scale(1.3); opacity: 1; }
}

@keyframes drift {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Usage
```jsx
<div className="fade-up" style={{ animationDelay: "60ms" }}>
```

---

## Layout Patterns

### Hero Section
```jsx
<section style={{
  padding: "92px 28px 72px",
  maxWidth: 1200, margin: "0 auto",
  textAlign: "center",
}}>
```

### Feature Cards Grid
```jsx
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 16,
}}>
```

### Team Grid
```jsx
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 14,
}}>
```

### Side Rail Navigation
```jsx
<nav className="rail">
  {scenes.map(s => (
    <a key={s.id} href={`#${s.id}`} className={activeId === s.id ? "active" : ""}>
      <span className="dot"/>
    </a>
  ))}
</nav>
```

**Style:**
- Position: fixed, left: 18px, top: 50%
- Dot: 8px circle, scales to 1.4× when active
- Hidden below 1200px viewport

### Progress Bar
```jsx
<div className="progress-track">
  <div className="progress-fill" style={{ width: `${progress}%` }} />
</div>
```

**Style:**
- Fixed top: 0, height: 3px
- Background: var(--dh-red)

---

## Icon Components

### CheckBig / XBig
```jsx
<CheckBig size={18} color="var(--green-2)" animate={true} />
<XBig size={18} color="var(--dh-red)" />
```

### ArrowRightSm / ArrowDownSm
```jsx
<ArrowRightSm size={16} color="var(--ink-mute)" />
<ArrowDownSm size={16} color="var(--ink-mute)" />
```

---

## Color Tone Mapping

Use `toneColor(tone)` function to get color from tone name:

```javascript
function toneColor(tone) {
  return {
    red: "var(--dh-red)",
    green: "var(--green-2)",
    amber: "var(--amber)",
    blue: "var(--blue-2)",
    purple: "var(--purple)",
    neutral: "var(--ink-mute)"
  }[tone] || "var(--dh-red)";
}
```

---

## File Structure

```
project/
├── index.html          # CSS variables, fonts, page structure
├── v-brand.jsx         # Brand components (DCMark, DCLockup, DHBadge, TopNav)
├── v-shell.jsx         # Scene wrapper, DCTag, DCCard, hooks, icons
└── v-scenes.jsx        # Scene content
```

---

## CDN Dependencies

```html
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Consistency Checklist

When creating new pages or components:

- [ ] Use CSS variables from index.html
- [ ] Follow typography scale (eyebrow, H1, H2, lede)
- [ ] Use DCTag for pills, DCCard for containers
- [ ] Apply tone colors consistently
- [ ] Include fade-up animations with staggered delays
- [ ] Add side rail navigation for multi-scene pages
- [ ] Use useSceneSteps for scroll-driven reveals
- [ ] Test responsive at 375px and 1440px
- [ ] Verify dark theme variables are defined (if applicable)