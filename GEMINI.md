# Movie Mosaic: Design & Engineering Standards

Derived from the Senior UI/UX Audit Report.

## Visual Design & Branding
- **Typography:** 
  - Headings: `Outfit`, Bold/Black weight, tracking-tighter.
  - Body/Metadata: `Inter`, wide tracking for metadata (uppercase).
- **Color Palette:**
  - Background: Deep Slate/Black (`#020617`).
  - Signature Accent: Cyan (`#0ea5e9`) with glow effects (`text-glow`).
  - Cards: Glassmorphism (`glass-card`) with `backdrop-blur-xl` and `white/10` borders.
- **Atmosphere:**
  - Use a subtle noise/grain texture on the background to break flat digital feel.
  - Implement cinematic gradients (transparent to deep blue/black) for overlays.

## Component Guidelines
- **NavBar:** Must transition from "Transparent" to "Solid" on scroll to maximize screen real estate for hero assets.
- **MovieCard:**
  - 105% scale on hover with `duration-500`.
  - Glassmorphism styling.
  - Prominent "Watch Trailer" and "Favorite" icons on hover.
- **Hero:** Auto-playing high-res backdrop slider with cinematic text overlays.

## UX & Interactivity
- **Transitions:** Use `animate-in` fade/slide effects for page entries.
- **Detail Page:** 
  - Parallax or large-scale backdrop focal point.
  - Circular actor avatars for the gallery.
  - "Focus Mode" for trailer interactions.

## Technical Implementation
- **Framework:** React with Tailwind CSS.
- **Performance:** Use `react-intersection-observer` for infinite scroll and lazy loading.
- **API:** TMDb via standard services.
