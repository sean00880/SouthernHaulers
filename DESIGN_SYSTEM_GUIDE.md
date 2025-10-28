# Southern Haulers Design System Guide

## Overview

This document describes the comprehensive design system implemented for the Southern Haulers NextJS monorepo, based on professional UI/UX principles from industry-leading design videos.

## Design Principles

### 1. Depth System (3-Shadows Pattern)

The depth system creates visual hierarchy through tonal layers and balanced shadows, making interfaces feel more professional and engaging.

#### Tonal Layers

We use HSL-based tonal layers that automatically adapt between light and dark modes:

**Light Mode:**
- `--L-bg: 98%` - Background layer
- `--L-surface: 100%` - Surface layer (cards, panels)
- `--L-elevated: 100%` - Elevated elements (buttons)
- `--L-highlight: 96%` - Highlighted elements

**Dark Mode:**
- `--L-bg: 14%` - Background layer
- `--L-surface: 18%` - Surface layer
- `--L-elevated: 24%` - Elevated elements
- `--L-highlight: 32%` - Highlighted elements

#### Shadow System

Three types of shadows create depth:

1. **Rim Light** - Soft inset highlight on top edge
   ```css
   --rim-light: inset 0 1px 0 rgba(255,255,255,.25);
   ```

2. **Ambient Shadow** - Soft shadow for resting state
   ```css
   --shadow-ambient: 0 8px 24px rgba(0, 0, 0, 0.12);
   ```

3. **Hover Shadow** - Stronger shadow for hover state
   ```css
   --shadow-hover: 0 10px 30px rgba(0, 0, 0, 0.16);
   ```

4. **Press Shadow** - Compressed shadow for active state
   ```css
   --shadow-press: 0 3px 8px rgba(0, 0, 0, 0.18);
   ```

#### Usage Classes

**Card Depth:**
```html
<div className="card-depth">
  <!-- Card content -->
</div>
```

**Button Depth:**
```html
<button className="button-depth">
  Click me
</button>
```

**Input Depth:**
```html
<input className="input-depth" />
```

### 2. Typography System

Fluid, responsive typography system using `clamp()` for optimal readability across all screen sizes.

#### Type Scale

```css
--step--1: clamp(0.80rem, 0.75rem + 0.2vw, 0.90rem);  /* Small labels */
--step-0:  clamp(0.94rem, 0.90rem + 0.2vw, 1.00rem);  /* Body text */
--step-1:  clamp(1.13rem, 1.05rem + 0.3vw, 1.25rem);  /* H6/H5 */
--step-2:  clamp(1.35rem, 1.20rem + 0.5vw, 1.50rem);  /* H4/H3 */
--step-3:  clamp(1.62rem, 1.40rem + 0.8vw, 1.88rem);  /* H2 */
--step-4:  clamp(1.94rem, 1.60rem + 1.2vw, 2.35rem);  /* H1 */
```

#### Optical Spacing

```css
--lh-tight: 1.1;   /* For large headings */
--lh-base: 1.45;   /* For body text */
--ls-tight: -0.01em;  /* For large headings */
--ls-base: 0.01em;    /* For labels/buttons */
```

#### Text Contrast

```css
--text-L: 14%;     /* Primary text (light mode) / 86% (dark mode) */
--muted-L: 36%;    /* Secondary text (light mode) / 64% (dark mode) */
```

### 3. Light/Dark Mode

The design system automatically adapts to light and dark modes by inverting lightness values:

- Background layers go from dark to light
- Text contrast goes from light to dark
- Shadows adjust opacity for visibility

Users can toggle between modes using the theme toggle in the navigation.

## Components

### New Components

#### 1. Container LFD Tracker

**Location:** `apps/web/components/container-lfd-tracker.tsx`

Features:
- Container number input with validation
- Port/terminal dropdown (8 locations)
- Real-time container status
- Last Free Day (LFD) tracking with warnings
- Demurrage/detention risk alerts
- Schedule pickup and quote request actions

**Usage:**
```tsx
import { ContainerLFDTracker } from '../components/container-lfd-tracker';

<ContainerLFDTracker />
```

#### 2. Enhanced Quote Calculator

**Location:** `apps/web/components/quote-calculator.tsx`

Features:
- South Georgia Hubs dropdown
- 8 port/terminal options
- Container type selection (20ft, 40ft, 40ft HC)
- Container condition (Dry/Refrigerated)
- Real-time pricing calculation: `$2.25/mile × 2 (round-trip)`
- Distance input with automatic calculation

**Pricing Formula:**
```
Total = $2.25 × distance × 2 (round-trip)
```

#### 3. Services Section

**Location:** `apps/web/components/services-section.tsx`

Displays all Southern Haulers services with:
- Professional service cards with depth effects
- Service-specific icons and descriptions
- Feature tags
- Hover animations with elevation changes

Services include:
- Bulk Transport
- Container Drayage
- Flatbed
- Over the Road (Dryvan) Trucking
- Agricultural (in Bulk)

### Enhanced Components

#### Theme Toggle

**Location:** `apps/web/components/theme-toggle.tsx`

Enhanced with:
- Depth system styling
- Smooth icon rotation animations
- Persistent theme preference in localStorage
- Accessibility improvements

## Pages

### Track Page

**Location:** `apps/web/app/track/page.tsx`

Features:
- Tabbed interface for Shipment Tracking and Container LFD Tracker
- Seamless switching between tracking modes
- Depth system applied to all UI elements

## CSS Architecture

### Global Styles

**Location:** `apps/web/app/globals.css`

Structure:
1. Base CSS variables (depth system, typography)
2. Base styles (HTML elements)
3. Utility classes (depth effects, animations)

### Tailwind Integration

The design system works seamlessly with Tailwind CSS:
- Custom CSS variables for depth system
- Utility classes for quick application
- Compatible with existing Tailwind utilities

## Best Practices

### 1. Applying Depth to Cards

```html
<div className="card-depth rounded-lg border bg-card p-6">
  <!-- Content -->
</div>
```

### 2. Interactive Elements

```html
<button className="button-depth rounded-lg bg-primary text-primary-foreground px-6 py-3">
  Click Me
</button>
```

### 3. Form Inputs

```html
<input 
  className="input-depth w-full px-4 py-3 rounded-lg border border-input bg-background"
  type="text"
/>
```

### 4. Consistent Light Source

Always maintain a consistent light source from the top. Shadows should be below elements, and rim lights should be on top edges.

### 5. Hover States

Add hover states to interactive elements to indicate affordance:

```html
<div className="card-depth hover:shadow-hover transition-all">
  <!-- Content -->
</div>
```

## Accessibility

### 1. Color Contrast

- All text meets WCAG AA standards
- High contrast mode supported
- Theme toggle for user preference

### 2. Keyboard Navigation

- All interactive elements are keyboard accessible
- Focus states visible and clear
- Tab order logical and intuitive

### 3. Screen Readers

- Semantic HTML used throughout
- ARIA labels where needed
- Alt text for all images

## Performance

### 1. CSS Custom Properties

Using CSS variables ensures:
- Minimal CSS overhead
- Fast theme switching
- Easy maintenance

### 2. Typography

Using `clamp()` for fluid typography:
- No JavaScript required
- Automatic scaling
- Better performance

### 3. Animations

All animations use CSS transforms and opacity:
- GPU-accelerated
- 60fps performance
- Smooth transitions

## Future Enhancements

### Planned Improvements

1. **Component Library Documentation**
   - Storybook integration
   - Interactive component showcase
   - Code examples

2. **Design Tokens**
   - Export tokens for Figma
   - Automated design-to-code pipeline
   - Version control for design system

3. **Additional Utility Classes**
   - More depth variations
   - Animation presets
   - Spacing scale

4. **Accessibility Enhancements**
   - High contrast mode
   - Reduced motion preferences
   - Focus trap utilities

## Resources

### Design References

- Video A: "The Easy Way to Fix Boring UIs" - Depth system principles
- Video B: "The 80% of UI Design – Typography" - Typography hierarchy

##