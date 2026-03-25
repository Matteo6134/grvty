# grvty — Product Website Design Spec

## Overview

Single-product website for **grvty**, a pyramidal smart RGB lamp. The site is a scroll-driven immersive experience showcasing the lamp via an interactive 3D model, gradient animations, and a dark/light mode where the lamp physically turns on/off.

## Stack

- **Framework:** Next.js 16 (App Router)
- **3D:** React Three Fiber + @react-three/drei
- **Scroll Animations:** GSAP ScrollTrigger
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page — scroll-driven product showcase |
| `/shop` | Order page — iPhone mockup with Instagram DM CTA |

## Landing Page — Scroll Sequence

The landing page is a single continuous scroll experience. A GSAP ScrollTrigger timeline drives all animations tied to scroll progress.

### Canvas Architecture

A single R3F `<Canvas>` is rendered at the page level with `position: fixed; inset: 0; z-index: 0`. It spans the full viewport and persists throughout the scroll. The gradient background plane and lamp model both live inside this canvas.

All HTML content (navbar, text, cards, CTA) is rendered as standard DOM elements above the canvas (`z-index: 1+`). The canvas acts purely as a visual layer behind the HTML content. Detail cards are positioned with CSS `position: absolute` relative to their scroll-triggered section containers, not via drei's `<Html>` component (to avoid complexity and maintain clean separation between 3D and DOM layers).

### Scroll Height Model

The total page scroll height is approximately **500vh**:
- Hero: 100vh (natural)
- Levitation: 100vh (natural scroll)
- Details (pinned): ~150vh of scroll distance (GSAP `pin: true` with `pinSpacing: true` adds this automatically)
- RGB Showcase (pinned): ~100vh of scroll distance
- CTA/Shop: ~50vh (natural)

The scroll percentages in the timeline table below refer to progress through the **total document scroll height** (including pin-added space). GSAP ScrollTrigger manages this automatically via `pinSpacing`.

### Navbar (fixed)

- Logo "grvty" (left)
- Dark/light mode toggle — sun/moon icon (right)
- "Shop" link (right)
- Transparent over hero, solid background after scroll begins

### Scroll Timeline

| Scroll % | Phase | Description |
|----------|-------|-------------|
| 0–15% | **Hero** | Lampada 3D centered, slightly low (resting). Animated sinusoidal gradient background. "grvty" title + tagline visible. Scroll indicator arrow (animated bounce, fades out at 10% scroll). |
| 15–30% | **Levitation** | Lamp rises (translateY animation). Title and gradient fade out. Background transitions to clean. |
| 30–65% | **Details (pinned)** | Lamp pinned at center of viewport. Info cards appear alternating left/right with staggered fade-in + slide. Lamp light gradually turns on (intensity 0 → 1). 3–4 cards: form factor, materials, smart control, design. |
| 65–85% | **RGB Showcase (pinned)** | Lamp stays pinned. Color cross-fades through 5 colors over equal scroll segments (~4% each): red → blue → green → purple → warm white. Each transition is a smooth 500ms-equivalent lerp. Minimal text accompaniment. |
| 85–100% | **Unpin + CTA** | Lamp unpins, scrolls up and out. Shop CTA section appears. Option: inline CTA or link to `/shop`. |

### Gradient Animation (Hero Background)

- Implemented as a fullscreen plane in the R3F canvas with a custom GLSL fragment shader
- Sinusoidal wave pattern with controllable uniforms:
  - `u_amplitude` — wave height
  - `u_frequency` — wave count
  - `u_speed` — animation speed
  - `u_time` — auto-incrementing time
- Color palette adapts to theme:
  - **Light mode:** warm orange → pink → white
  - **Dark mode:** deep purple → electric blue → black
- Animates continuously (not scroll-driven), providing a living background

### 3D Lamp Model

- **Format:** GLB exported from Womp
- **Loader:** `useGLTF` from @react-three/drei
- **Lighting setup:**
  - Ambient light (low intensity, always on) — ensures lamp silhouette is visible
  - Point light inside lamp (represents the lamp being "on") — intensity controlled by scroll progress and theme
  - Optional emissive material on lamp shade for glow effect
- **Scroll-driven properties:**
  - `position.y` — levitation (scroll 15–30%)
  - Light `intensity` — gradual turn-on (scroll 30–65%)
  - Material `emissive` color — RGB showcase (scroll 65–85%)
- **Dark/light mode interaction:**
  - Light mode: lamp light ON (warm glow)
  - Dark mode: lamp light OFF (no emission, minimal ambient only — lamp appears as dark silhouette)
  - Transition: ~500ms smooth interpolation on intensity and emissive values
  - **Precedence rule:** Dark mode overrides scroll-driven intensity. When dark mode is active, lamp intensity is forced to 0 regardless of scroll position. The scroll-driven intensity animation is suspended. When light mode is restored, the lamp intensity resumes from its scroll-progress-derived value (smooth lerp to target).

### Detail Cards

- HTML elements positioned absolutely over the R3F canvas
- Alternating left/right layout on desktop
- Content (placeholder, user will provide final copy):
  1. "Forma Piramidale" — design unico ispirato alla geometria
  2. "Materiali Premium" — alluminio anodizzato, base in legno
  3. "16 Milioni di Colori" — RGB smart, controllo da app
  4. "Controllo Intelligente" — WiFi, app, voice assistant
- Animation: GSAP stagger, fade-in + translateX (from left or right)
- On scroll out: fade-out

## Shop Page (`/shop`)

- Sinusoidal gradient background using the same `GradientBackground` component (new R3F canvas instance, not shared with the landing page canvas)
- Centered iPhone mockup image showing an Instagram DM conversation:
  - Chat with @grvty account
  - Message asking about the lamp / placing an order
- CTA button below mockup: "Scrivici su Instagram" → opens `https://ig.me/m/grvty`
- **Mockup compositing:** Single pre-composited image (iPhone frame with DM screenshot baked in) for simplicity and consistent rendering. Placed as a single `next/image` with responsive sizing via `w-full max-w-sm`.
- Responsive: mockup scales proportionally

## Dark/Light Mode

- Toggle in navbar (sun/moon icon)
- Persisted in localStorage
- System preference detection on first visit (`prefers-color-scheme`)
- Affects:
  - Background colors (Tailwind `dark:` variants)
  - Gradient shader color palette (uniforms update)
  - 3D lamp light intensity (on/off)
  - Text colors
- Transition: 500ms ease on all color properties
- Independent from scroll — toggling at any scroll position immediately affects lamp and colors

## Responsive Strategy

| Breakpoint | Behavior |
|------------|----------|
| **Desktop** (≥1024px) | Full experience: large 3D model, cards left/right, all scroll animations, pinning |
| **Tablet** (768–1023px) | Slightly smaller 3D model, cards below lamp instead of left/right, pinning preserved |
| **Mobile** (<768px) | Smaller 3D model, cards full-width stacked, simplified scroll (no GSAP pin for performance), reduced gradient complexity |

### Mobile Considerations

- GSAP pin can cause jank on low-end mobile devices. On mobile, the lamp scrolls naturally with the page instead of being pinned.
- 3D model LOD (level of detail) can be reduced for mobile if performance requires it.
- Touch scroll events work natively with ScrollTrigger.

## Typography

- **Primary font:** Geist Sans (via `next/font`, weights: 400, 600, 700) — clean, geometric, modern
- **Monospace (accents):** Geist Mono (via `next/font`, weight: 400) — for specs, numbers, technical details
- **Hierarchy:**
  - Hero title: 6xl–8xl, bold
  - Card titles: xl–2xl, semibold
  - Card body: base, regular
  - Navbar: sm, medium

## Color Palette

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--bg-primary` | `#FAFAFA` | `#0A0A0A` |
| `--text-primary` | `#171717` | `#EDEDED` |
| `--accent` | `#FF6B35` (warm orange) | `#7C3AED` (violet) |
| `--gradient-start` | `#FF6B35` | `#7C3AED` |
| `--gradient-mid` | `#EC4899` (pink) | `#3B82F6` (blue) |
| `--gradient-end` | `#FAFAFA` | `#0A0A0A` |

## Performance Budget

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- **LCP element:** Hero title text ("grvty"). Rendered as server-side HTML, visible before 3D loads.
- 3D model GLB: < 2MB (compress with glTF-Transform if needed)
- **Initial JS bundle** (above-the-fold): < 150KB gzipped. Three.js and R3F are loaded lazily via `next/dynamic` with `ssr: false` after first paint.
- **Total full-page JS:** < 600KB gzipped (Next.js + R3F + Three.js + GSAP + Drei)
- Lazy load 3D scene with React Suspense
- **3D loading fallback:** While the GLB loads, show a centered CSS-animated silhouette placeholder (pyramid shape with pulse animation) matching the lamp's outline. Fades out when model is ready.
- Preload GLB with `useGLTF.preload()`

## SEO & Metadata

- **Title:** "grvty — Lampada Smart RGB dal Design Piramidale"
- **Description:** "grvty ridefinisce l'illuminazione. Design piramidale, 16 milioni di colori RGB, controllo smart. Ordina su Instagram."
- **OG Image:** Product rendering of the lamp on dark background, 1200x630px (placed in `public/images/og.png`)
- **Twitter card:** `summary_large_image`
- **Favicon:** Minimal grvty logo
- `robots.txt`: allow all
- `sitemap.xml`: auto-generated by Next.js

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, theme provider
│   ├── page.tsx            # Landing page
│   └── shop/
│       └── page.tsx        # Shop page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── ThemeToggle.tsx
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   ├── GradientBackground.tsx  # R3F plane + GLSL shader
│   │   └── HeroText.tsx
│   ├── lamp/
│   │   ├── LampScene.tsx           # R3F Canvas wrapper
│   │   ├── LampModel.tsx           # GLB model + lights
│   │   └── LampControls.tsx        # Scroll-driven animation logic
│   ├── sections/
│   │   ├── LevitationSection.tsx
│   │   ├── DetailsSection.tsx
│   │   ├── DetailCard.tsx
│   │   ├── RGBShowcase.tsx
│   │   └── ShopCTA.tsx
│   └── shop/
│       ├── IPhoneMockup.tsx
│       └── InstagramCTA.tsx
├── hooks/
│   ├── useScrollTimeline.ts   # GSAP ScrollTrigger setup
│   ├── useTheme.ts            # Dark/light mode logic
│   └── useLampAnimation.ts    # Lamp-specific scroll animations
├── shaders/
│   ├── gradient.vert          # Vertex shader
│   └── gradient.frag          # Fragment shader (sinusoidal gradient)
├── lib/
│   └── constants.ts           # Colors, animation configs, breakpoints
└── public/
    ├── models/
    │   └── lamp.glb           # 3D model
    └── images/
        ├── iphone-mockup.png  # iPhone frame
        └── instagram-dm.png   # DM screenshot
```

## Out of Scope (v1)

- E-commerce / payment processing
- CMS for content management
- Analytics (can add Vercel Analytics later)
- i18n (Italian only for now)
- User accounts / authentication
- Blog or news section
