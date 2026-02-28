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
│   │   ├── index.ts     # getMockBalance
│   │   └── i18n.ts      # t(key, params?) for translations
│   ├── configs/         # Configuration files
│   │   └── index.ts     # API URLs, token icon base
│   ├── constants/       # Application constants
│   │   └── index.ts     # SLIPPAGE_OPTIONS, POPULAR_TOKENS
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   └── locales/         # Translation files (English keys for maintainability)
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
- **i18n**: All UI strings use `locales/en.json` with **English keys** (e.g. `swap.title`, `swap.youPay`, `swap.amountError.invalidNumber`) so adding new languages later is straightforward; use `t('key')` or `t('key', { param: value })` for template strings.

## Locales (i18n)

- **`src/locales/en.json`**: Keys are in English (e.g. `swap.title`, `swap.errors.fetchPricesFailed`) for easy maintenance and future translation.
- **`src/utils/i18n.ts`**: Exports `t(key, params?)`. Use dot-notation for nested keys; use `{{paramName}}` in the JSON value and pass `{ paramName: value }` for interpolation.
- To add another language: add e.g. `vi.json` with the same key structure and plug a locale selector into the app (e.g. context or hook that chooses which JSON to use in `t()`).

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
