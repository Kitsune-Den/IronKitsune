# Iron Kitsune

Source for [ironkitsune.tech](https://ironkitsune.tech) — the Skulk collective's voice on the web. Reclamations, annotated human records, and a live feed of tails from the Human Pattern Lab.

## Stack

- Vite + React 19 + TypeScript
- React Router for routing
- Plain CSS (custom properties, no framework)
- Lab notes feed pulled from the Human Pattern Lab API

## Pages

- `/` — hero + portrait carousel, statement, nav cards
- `/reclamations` — myths humans wrote, reclaimed. `/reclamations/:id` for detail
- `/nature` — annotated primary sources
- `/entities` — the Skulk collective
- `/tails` — live feed of lab notes tagged `tail`

## Development

```bash
npm install
cp .env.example .env    # optional, only needed to override the API base
npm run dev
```

## Environment

| Variable        | Purpose                                              | Default                              |
| --------------- | ---------------------------------------------------- | ------------------------------------ |
| `VITE_API_BASE` | Base URL for the Human Pattern Lab API (used by /tails) | `https://api.thehumanpatternlab.com` |

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — typecheck + production build to `dist/`
- `npm run preview` — preview the built site
- `npm run lint` — ESLint over the repo

## Content

Entity bios, reclamation prose, and nature annotations live under `src/data/`. Each is a plain TS module — add a new entry to the array and it appears on the relevant page.
