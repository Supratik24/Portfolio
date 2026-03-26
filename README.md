# Studio Portfolio (React + Vite + TS)

Distinctive, editorial-brutalist single-page portfolio with:
- Section reveals, micro-interactions, animated accent shapes
- Accessible case study modal + command palette (Ctrl/⌘+K)
- Reduced-motion toggle + accent toggle

## Run

```bash
npm install
npm run dev:full
```

## MongoDB (Optional, Recommended)

This portfolio can load `profile`, `skills`, `projects`, and `posts` from MongoDB (managed in `/admin`).

1. Copy `.env.example` to `.env` and set `MONGODB_URI` (must include a DB name).
2. Seed initial content:
   ```bash
   npm run seed
   ```
3. Run:
   ```bash
   npm run dev:full
   ```

## Build

```bash
npm run build
npm run preview
```

