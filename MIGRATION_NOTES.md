# MY TRAVEL 2.0 — Migration notes

## What changed

- Replaced the React 19/Vite runtime with Angular 21 standalone application bootstrapping.
- Removed React, React DOM, JSX/TSX entry points and Vite-specific configuration.
- Added Angular Router routes with lazy-loaded feature components.
- Migrated the 24-destination catalogue and original photography assets.
- Reimplemented destination filtering, wishlist persistence, profile preferences, theme handling and trip planning with Angular services and Signals.
- Added IndexedDB trip storage with LocalStorage fallback and backup.
- Added trip and activity editing, deletion, completion tracking and estimated expense totals.
- Added responsive SCSS design system, light/dark themes and notification toasts.

## Validation performed in the delivery environment

- Parsed all 19 TypeScript source files with the TypeScript parser: zero TypeScript syntax parse errors.
- Confirmed the destination catalogue contains 24 records.
- Confirmed all five bundled local image paths referenced by the catalogue exist.
- Confirmed no React/JSX/TSX runtime files or React dependencies remain.

## Build verification limitation

The Angular packages could not be installed in the delivery environment because package installation did not complete. Therefore an Angular CLI production build and Angular template type-check could not be run here. After extracting the archive on a machine with npm registry access, run:

```bash
npm install
npm run build
npm start
```

Resolve any environment-specific Angular compiler diagnostics before publishing the application.
