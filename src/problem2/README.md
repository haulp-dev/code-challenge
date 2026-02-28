# Problem 2 — Fancy Form (Currency Swap)

Currency swap form built with **React 19 + TypeScript + Vite + Ant Design**.

## Project structure

```
problem2/
├── src/
│   ├── components/      # React components
│   │   ├── SwapForm.tsx
│   │   ├── TokenIcon.tsx
│   │   ├── TokenSelectModal.tsx
│   │   ├── SwapConfirmModal.tsx
│   │   └── SlippageSettings.tsx
│   ├── pages/           # Page components
│   │   └── SwapPage.tsx
│   ├── services/        # API services
│   │   └── prices.ts
│   ├── stores/          # State management (placeholder for MobX/Zustand)
│   │   └── index.ts
│   ├── hooks/           # Custom React hooks
│   │   ├── useTokenPrices.ts
│   │   └── useSwap.ts
│   ├── utils/           # Utility functions
│   │   └── index.ts     # getMockBalance
│   ├── configs/         # Configuration files
│   │   └── index.ts     # API URLs, token icon base
│   ├── constants/       # Application constants
│   │   └── index.ts     # SLIPPAGE_OPTIONS, POPULAR_TOKENS
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   └── locales/         # Translation files
│       └── en.json
├── package.json
├── vite.config.ts
├── index.html
└── README.md
```

## Tech stack

- **Vite 5**
- **React 19** + TypeScript
- **Ant Design 5** (antd) — UI components
- **@ant-design/icons**

## Features

- Token list from `interview.switcheo.com/prices.json` (deduplicated by currency)
- Token icons from [Switcheo token-icons](https://github.com/Switcheo/token-icons) with letter fallback
- Searchable token selector modal (Ant Design `Modal` + `Input` + list)
- Slippage settings popover (preset + custom)
- Swap confirmation modal with rate, price impact, min. received
- Real-time conversion, exchange rate, price impact display
- Mock balance + MAX button
- Loading (Spin), error (Alert + retry), success feedback
- Input validation and dynamic submit button text

## Getting started

```bash
cd problem2
npm install
npm run dev        # → http://localhost:5173
```

### Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```
