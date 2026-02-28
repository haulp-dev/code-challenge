# Problem 2 — Fancy Form (Currency Swap)

A modern, responsive currency swap form built with **React 19 + TypeScript + Vite**.

## Live features

| Feature | Detail |
|---------|--------|
| **Token list** | Fetched from `interview.switcheo.com/prices.json`; deduplicated (latest entry per currency) |
| **Token icons** | Loaded from [Switcheo token-icons](https://github.com/Switcheo/token-icons) with letter fallback on 404 |
| **Real-time conversion** | Amount × (fromPrice / toPrice) updates instantly as you type |
| **Exchange rate display** | Shows `1 FROM = X.XX TO` below the form |
| **Input validation** | Invalid number, zero/negative amount, same-token swap |
| **Loading & submit simulation** | Spinner on initial load; 1.5 s simulated swap with success message |
| **Swap direction** | Circular button swaps From ↔ To and auto-fills the converted amount |
| **Accessibility** | `aria-invalid`, `aria-describedby`, `aria-busy`, `role="alert"`, `<label>` + `htmlFor` |
| **Dark / Light mode** | Follows system `prefers-color-scheme`; CSS custom properties for theming |
| **Responsive** | Works on 320 px+ viewports |

## Tech stack

- **Vite 8** (bonus requirement)
- **React 19** with functional components & hooks
- **TypeScript** (strict mode)
- **Pure CSS** (no UI library — demonstrates raw CSS skills)
- **Google Fonts** (Inter)

## Project structure

```
problem2/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig*.json
└── src/
    ├── main.tsx              # Entry point
    ├── App.tsx               # Root component
    ├── App.css               # Swap card styles
    ├── index.css             # Global / reset styles
    ├── types.ts              # Shared types & constants
    ├── api/
    │   └── prices.ts         # Fetch + dedupe prices, convert helper
    └── components/
        ├── SwapForm.tsx      # Main form (state, validation, submit)
        ├── TokenIcon.tsx     # Token SVG icon with fallback
        └── TokenSelect.tsx   # <select> dropdown for tokens
```

## Getting started

```bash
cd src/problem2
npm install
npm run dev        # → http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview
```

## Design decisions

1. **No external UI library** — Pure CSS shows design skills rather than library knowledge.
2. **Separate API layer** — `api/prices.ts` keeps data-fetching logic out of components, making it testable and reusable.
3. **Token deduplication** — The API returns multiple entries per currency; we keep the latest by date.
4. **Simulated submit** — Per the hint, the Swap button shows a loading spinner for 1.5 s then displays a success banner, simulating a backend call.
5. **CSS custom properties** — All colors are defined as `--var` tokens, making theming and dark/light switching trivial.
