# Feedback: Missing Narrative Gaps in Variants Vision Demo

## Overview

The current demo shows the "what" and "how" of the semantic approach, but it's missing the "why it solves what we struggle with today." The connection between current observed problems/learnings and how the new approach solves them needs to be more explicit.

---

## Gap 1: The Annotated Dataset Problem → Solution

### Current State (Missing from Demo)

- Dataforge requires annotated/labeled datasets to train attribute extraction models
- Getting thousands of products annotated is expensive and slow
- Niche attributes have poor accuracy because training data is thin
- The whole pipeline blocks on this annotation bottleneck
- We can't scale to new categories without new annotation campaigns

### How the New Approach Solves It

We flip the model:

| Current | Proposed |
|---------|----------|
| Annotate to **predict** attributes | Annotate to **build the graph** |
| Labels are training targets | Labels become graph nodes |
| Pipeline blocks until model is trained | Product enters graph with whatever signal exists |
| New category = new annotation campaign | New category = graph naturally extends |

**Key insight:** A product enters the graph with whatever signal we have (title, image, partial attributes). The graph strengthens over time as more signal arrives — no upfront blocking.

### Request to Design

Add a scene or expand "Core Shift" to show this flip explicitly. The narrative should be:

> "Today we annotate to train models. Tomorrow we annotate to build nodes. The same labeling work, but instead of blocking the pipeline, it expands the graph."

---

## Gap 2: Current PIM Constraints vs. Dynamic Future

### Current PIM Rules (Should Be Shown as Constraints)

The demo mentions "PIM rigidity" but doesn't show the actual constraints:

**All products in a variant group MUST:**
- Share the same variant attributes (predefined per product type)
- Be assigned to the same `master_category`
- Share the same `brand_id`
- Share the same `product_type`

**Consequences:**
- If any of these change, the group breaks
- Adding a new dimension = delete entire group + recreate
- Products can't be grouped if they don't fit the predefined template

### How the New Approach Removes These

The graph **is** the guardrail — we don't need external rules.

| Current | Proposed |
|---------|----------|
| External rules enforce groups | Graph connections define groups |
| Predefined attributes required | Nodes emerge from signal |
| Schema change to add dimension | New node auto-adds to group |
| Group breaks if attributes change | Group adapts as nodes evolve |

**Key insight:** If the system is confident that "Lays" is the brand node and "Chips" is the category node, that confidence **defines** the group boundary. We don't need to enforce `brand_id` and `master_category` as external constraints — they're already in the graph.

### Request to Design

Add a visual showing:

> "Current: External rules enforce groups"
> "Proposed: The graph itself is the guardrail"

This could be in the "Hybrid Model" scene or a new section. Show confident nodes (brand, category) as the boundary that defines the group — not as enforced fields.

---

## Gap 3: PIM Integration & Downstream Architecture

### Current PIM → Downstream Flow (Should Be Shown)

```
Variant Groups (fixed schema)
        ↓
       PIM (stores with strict format)
        ↓
   Downstream Apps (talabat, etc.)
   Expect fixed variant dimensions
```

**Problem:** Any schema change ripples to all downstreams.

### What Needs to Change

This is an **architecture redesign**, not just a pipeline change:

| Component | Current | Needs to Become |
|-----------|---------|-----------------|
| PIM storage | Fixed schema per product type | Dynamic schema per group |
| PIM → Downstream | Push fixed variant structure | Push dynamic variant structure |
| Downstream apps | Expect known dimensions | Consume any dimension dynamically |
| New dimension | Requires downstream coordination | Auto-propagates |

**Key insight:** The demo shows how groups become dynamic, but doesn't address how PIM and downstreams need to change to **consume** this dynamic data.

### Request to Design

Add a section or scene on "What PIM and downstreams need to change." This is a critical conversation starter for engineering. The narrative should be:

> "The graph makes groups dynamic. But PIM and downstream apps expect fixed structures. This is an architecture redesign, not just a pipeline change."

---

## Summary: Suggested Additions

| Gap | Where to Add | What to Show |
|-----|--------------|--------------|
| Annotation flip | Core Shift scene | "Train to predict" → "Label to build graph" |
| PIM constraints | Problems scene | List actual rules that constrain grouping |
| Graph as guardrail | Hybrid Model scene | Confident nodes define boundaries |
| Downstream impact | New scene or Next Steps | PIM + apps need architecture redesign |

---

## Desired Outcome

After this update, the demo should clearly answer:

1. **Why does this solve the annotation problem?** → We label to build, not to predict
2. **Why does this solve the PIM constraint problem?** → The graph is the guardrail
3. **What else needs to change?** → PIM and downstreams need architectural updates

These are the key conversation points for engineering — the demo should tee them up explicitly.