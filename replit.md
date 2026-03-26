# grvty — Objects with Gravity

## Project Overview
A Next.js 16 marketing/product site for "grvty", a 3D printed pyramidal lamp with 16 million RGB colors. Features Three.js 3D graphics, GSAP animations, and Tailwind CSS v4 styling.

## Tech Stack
- **Framework**: Next.js 16.2.1 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS v4
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **Animation**: GSAP + @gsap/react
- **Fonts**: Sora, Syne, DM Sans, Space Grotesk (Google Fonts)
- **Package Manager**: npm

## Project Structure
```
src/
  app/          # Next.js App Router pages & layouts
  components/   # Reusable React components
  hookslib/     # Custom React hooks
  shaders/      # GLSL shader files for Three.js
public/         # Static assets
```

## Replit Configuration
- **Dev server**: port 5000, bound to 0.0.0.0 (required for Replit preview)
- **Workflow**: "Start application" runs `npm run dev`
- **Node version**: 20 (note: Next.js 16 recommends >=22, but runs fine on 20)

## Running the App
The "Start application" workflow runs `npm run dev` automatically. The app is available in the Replit preview pane on port 5000.

## Scripts
- `npm run dev` — Start development server (port 5000)
- `npm run build` — Production build
- `npm run start` — Start production server (port 5000)
- `npm run lint` — Run ESLint
