# Variants Vision Demo — Design Handover Prompt

## Project Overview

I'm Necmettin Tamgüney, Senior/Lead PM at Delivery Hero Q-Commerce. I'm working on a vision document to propose a new approach for **variant grouping** — moving from a fixed attribute-based system to a semantic/neural classification approach.

**Audience:**
1. Engineering team first (feasibility discussion)
2. Leadership second (vision/scope alignment)

**Goal:** Create a polished, visually compelling demo to articulate the vision and trigger productive technical discussions.

---

## Current Demo Location

```
~/Desktop/variants-vision/
├── index.html      # Main HTML with CSS variables, imports
├── v-brand.jsx     # Brand components (DCMark, DCTag, DCCard, TopNav)
├── v-shell.jsx     # Shell components including SemanticNetwork visualization
└── v-scenes.jsx    # 8 scenes with content and animations
```

**To run:** `python3 -m http.server 8907` then open `http://localhost:8907`

---

## The Story We're Telling

### Problem (Current State)
- Fixed product types → fixed variant attributes (flavor, scent, color, content size)
- Products must have all required attributes extracted before grouping
- Dataforge coverage < 100%, niche attributes inaccurate
- Adding new dimension = delete + recreate variant group in PIM
- Limited scalability, operational complexity

### Solution (Proposed)
- Universal flow for ALL products (existing + new)
- Neural/node structure where products connect by shared attributes
- Core attributes (brand, category, product type) = stable grouping nodes
- Granular attributes (flavor, size, protein type, sugar level, etc.) = variation nodes
- Dimensions emerge from data, not predefined
- Images strengthen attribute detection
- New variation discovered → auto-added to group (no delete/recreate)

### Key Decisions
| Topic | Decision |
|-------|----------|
| PIM Flexibility | Can change schema if we prove value |
| Core vs Granular | Hybrid — predefined + self-learning |
| Multi-dimensional | Hierarchical + analytics (min/max/avg/median) |
| Downstream | Apps consume variant groups |
| Reliability | Must be robust with retry mechanisms |

---

## Design Refinement Needs

### 1. SemanticNetwork Visualization (HIGH PRIORITY)
**Current state:** Multi-directional neural-style visualization with SVG connections

**Needs improvement:**
- The network should feel more organic and interconnected
- Consider adding subtle animations (pulsing nodes, flowing connections)
- Better illustrate how variant detection works visually
- Show "discovered" dimensions more clearly

**Reference:** Think of it like a neural network or knowledge graph, not a tree or hierarchy. Products connect across multiple dimensions simultaneously.

### 2. Scene Flow and Pacing
- Review the 8 scenes for narrative coherence
- Ensure smooth scroll-driven reveals
- Consider if any scenes need merging or splitting

### 3. Visual Hierarchy
- Strengthen the "aha moment" in Scene 4 (Neural Classification)
- Make the comparison in Scene 3 (Core Shift) more impactful
- Improve the "How It Works" clarity

### 4. Brand Consistency
- Uses Delivery Hero color palette (dh-red, purple, amber, etc.)
- Maintain clean, professional aesthetic
- Avoid flashy or overly technical visuals

### 5. Image Scene (Scene 6)
- Currently shows placeholder for product image
- Consider how to better visualize "image as always-on intelligence"
- The 6 use cases flowing from image could be more dynamic

---

## Technical Constraints

- **Format:** Single-page HTML with embedded React/Babel
- **No build step:** Must run directly in browser via local server
- **CDN dependencies:** React, ReactDOM, Babel from unpkg
- **CSS variables:** Defined in `index.html` for theming
- **Scroll-driven animations:** Use IntersectionObserver (via `useSceneSteps` hook)

---

## Content Reference

### Scene Structure

1. **Intro** — "From attributes to meaning" — sets the vision
2. **Current Problems** — 5 problems with current approach (attribute dependency, static schema, PIM rigidity, operational complexity, limited scalability)
3. **Core Shift** — Comparison table: schema-first vs semantic-first
4. **Neural Classification** — "How It Works" — semantic network visualization
5. **Static vs Dynamic** — What stays fixed vs what emerges
6. **Image Role** — 6 use cases for image-based intelligence
7. **Bonus Use Cases** — Duplicate detection, shrinkflation, product change, category quality
8. **Open Questions** — 6 technical questions for engineering
9. **Next Steps** — 3-phase rollout plan

---

## Key Example: Lays Chips

Used throughout the demo to illustrate the concept:

```
Brand: Lays
Core: Chips, Potato
Variations: Paprika, Oven, 50g
Connected to: Pringles (shares Chips, Potato core)
```

Two products sharing **common nodes** = variant candidates. Where their connections diverge = variant dimension.

---

## What I Need From Design

1. **Visual polish** — Make the neural network feel alive and intuitive
2. **Narrative flow** — Ensure the story builds clearly from problem to solution
3. **"How it works" clarity** — Scene 4 should make the approach immediately understandable
4. **Professional finish** — Ready to share with engineering leads and leadership

---

## Files to Work With

All files are in `~/Desktop/variants-vision/`:

- `index.html` — CSS variables, page structure, CDN imports
- `v-brand.jsx` — Reusable UI components (DCMark, DCTag, DCCard, TopNav)
- `v-shell.jsx` — Scene wrapper, SemanticNetwork, ComparisonTable, hooks
- `v-scenes.jsx` — 8 scenes with content

---

## How to Start

1. Run `python3 -m http.server 8907` in the variants-vision directory
2. Open `http://localhost:8907` in browser
3. Scroll through all scenes to understand the current state
4. Focus first on SemanticNetwork in `v-shell.jsx` (the "How It Works" visualization)
5. Then review scene flow and visual hierarchy

---

## Success Criteria

After design refinement:
- Engineering can understand the proposal in 5 minutes
- The "why" and "how" are immediately clear
- Visual quality matches the strategic importance of the topic
- Ready to present without apologies or caveats

---

## Contact Context

This is for internal Delivery Hero discussion. The demo will be shared via:
- Live URL during meetings
- Screenshots in documentation
- Potentially embedded in Confluence

---

## Related Memory File

See `~/claude/projects/-Users-necmettin-tamgueney/memory/variants-grouping-vision.md` for full project context including current architecture, problems, and proposed solution details.