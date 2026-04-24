---
name: Digicraft
description: A digital agency platform offering B2B services
colors:
  primary: "#5eb1ff"
  neutral-bg: "#050505"
  surface: "#111111"
  surface-light: "#1a1a1a"
  border-translucent: "rgba(255, 255, 255, 0.1)"
typography:
  display:
    fontFamily: "\"Outfit\", ui-sans-serif, system-ui, sans-serif"
    fontWeight: 300
  body:
    fontFamily: "\"Outfit\", ui-sans-serif, system-ui, sans-serif"
    fontWeight: 300
    fontSize: "15px"
rounded:
  full: "9999px"
  3xl: "24px"
spacing:
  md: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#000000"
    rounded: "{rounded.full}"
    padding: "12px 32px"
  card-glass:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    rounded: "{rounded.3xl}"
    padding: "24px"
---

# Design System: Digicraft

## 1. Overview

**Creative North Star: "The Digital Vitality Lab"**

This system is engineered and technical, yet breathes with dynamic vitality. It serves as a precision instrument that demonstrates high-end technological capability to PME owners. It explicitly rejects the "dead AI" anti-pattern—instead, it feels alive, custom, and highly crafted. 

**Key Characteristics:**
- Engineered and technical
- Glassy and luminous
- Distinctly tactile and smooth
- Alive and fluid

## 2. Colors

A deep, dark canvas punctuated by vibrant, energetic light.

### Primary
- **Vitality Blue** (#5eb1ff): The core accent. Used for primary buttons, energetic text highlights, SVG strokes, and luminous ambient glows. It drives the "vitality" of the lab.

### Neutral
- **Deep Obsidian** (#050505): The absolute background. The void in which the interface floats.
- **Surface Dark** (#111111): Base color for solid elements resting directly on the background.
- **Surface Light** (#1a1a1a): Slightly elevated solid surfaces.
- **Translucent Border** (rgba(255, 255, 255, 0.1)): The structural linework that defines glass elements without weighing them down.

### Named Rules
**The Void and Light Rule.** The background must remain deeply dark and empty to allow the energetic primary color and glassy surfaces to shine. Avoid muddy mid-tones.

## 3. Typography

**Display Font:** Outfit
**Body Font:** Outfit
**Fallback:** ui-sans-serif, system-ui, sans-serif

**Character:** A highly modern, geometric-yet-approachable sans-serif that balances technical precision with friendly readability.

### Hierarchy
- **Display** (Light 300 / Bold 700, 4xl-6xl): Hero headlines. Uses extreme contrast in weight (light phrasing next to bold, brightly colored keywords).
- **Body** (Light 300, 15px): Standard text. Clean, unassuming, and highly legible.

## 4. Elevation

Depth is "glassy and luminous." The system relies heavily on translucent backgrounds, backdrop blurs, and thin white borders rather than heavy, opaque drop shadows.

### Shadow Vocabulary
- **Glass Glow** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)`): Adds a subtle physical presence beneath translucent cards to lift them from the obsidian void.

### Named Rules
**The Glass Light Rule.** Depth is created not through heavy shadows, but through luminous layers, glassmorphism, and translucent borders.

## 5. Components

Components are distinctly tactile and smooth, inviting interaction.

### Buttons
- **Shape:** Pill-shaped, fully rounded (9999px).
- **Primary:** Vitality Blue background with black text. Tactile and energetic.
- **Hover:** Smooth, snappy transition with a subtle color shift and lift.

### Cards / Containers
- **Corner Style:** Heavily rounded (24px / 3xl).
- **Background:** Barely-there translucent white (`rgba(255, 255, 255, 0.03)`).
- **Shadow Strategy:** Luminous and glassy with strong backdrop-blur.
- **Border:** Thin, delicate translucent white (`border-white/15`).

### Inputs / Fields
- **Style:** Pill-shaped or fully rounded, transparent or semi-transparent background with a delicate border.

## 6. Do's and Don'ts

### Do:
- **Do** use purposeful motion and interactive elements to create dynamic vitality.
- **Do** use `backdrop-blur` and translucent borders to build glassy, luminous layers.
- **Do** use extreme font-weight contrast in headlines to create technical elegance.

### Don't:
- **Don't** make the site look like a random, "dead," AI-generated template.
- **Don't** use identical card grids (same-sized cards repeated endlessly).
- **Don't** use side-stripe borders greater than 1px as a colored accent.
- **Don't** use gradient text combined with a gradient background.
