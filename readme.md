# 99Tech Code Challenge

> Solutions for the 99Tech software engineering code challenge.

## Table of contents

| Problem | Title | Description | Key tech |
|---------|-------|-------------|----------|
| [Problem 1](src/problem1/) | Three Ways to Sum | 3 implementations of `sum_to_n` with different algorithmic approaches | JavaScript |
| [Problem 2](src/problem2/) | Fancy Form (Currency Swap) | Interactive currency swap form with live conversion rates, i18n | React 19, TypeScript, Vite 5, Ant Design |
| [Problem 3](src/problem3/) | Messy React (Code Review) | 13 issues identified + refactored version of a buggy React component | TypeScript, React analysis |

---

## Problem 1 — Three Ways to Sum

Three implementations of `sum_to_n(n) = 1 + 2 + … + n`:

| Variant | Approach | Time | Space |
|---------|----------|------|-------|
| A | Iterative loop | O(n) | O(1) |
| B | Gauss formula | O(1) | O(1) |
| C | Recursion | O(n) | O(n) |

Each includes input validation for non-integer/negative values.

**[→ Full README](src/problem1/readme.md)**

---

## Problem 2 — Fancy Form (Currency Swap)

A currency swap form built with **React 19 + TypeScript + Vite 5 + Ant Design**.

**Highlights:**
- Live token prices from Switcheo API (deduplicated by currency)
- Real-time conversion, exchange rate, price impact, slippage
- Searchable token selector modal with popular tokens
- Swap confirmation modal (rate, min. received)
- Slippage settings (preset + custom)
- Mock balance + MAX button
- **i18n**: All UI strings in `locales/en.json` with English keys for easy translation
- Input validation, loading/error/success states
- Responsive layout

**Run it:**
```bash
cd src/problem2
npm install
npm run dev
```

**[→ Full README](src/problem2/README.md)**

---

## Problem 3 — Messy React (Code Review)

Identified **13 issues** in the provided React component across 5 categories:

| Category | Count | Examples |
|----------|-------|---------|
| Bugs | 4 | Undefined variable in filter, inverted logic, missing sort return, dead `formattedBalances` |
| Type errors | 2 | Missing `blockchain` on interface, `any` parameter |
| Performance | 2 | Unnecessary `useMemo` dep, function recreated per render |
| Anti-patterns | 1 | Array index as React key |
| Robustness | 1 | Unsafe `undefined * number` → NaN |
| Style/Logic | 3 | Empty interface, unused destructuring, missing `classes` |

Includes a fully refactored `WalletPage.refactored.tsx` with all fixes applied.

**[→ Full README](src/problem3/readme.md)** · **[→ Detailed Analysis](src/problem3/ANALYSIS.md)**

---

## Repository structure

```
code-challenge/
├── readme.md                          ← You are here
└── src/
    ├── problem1/
    │   ├── sum.js                     ← 3 implementations
    │   └── readme.md
    ├── problem2/
    │   ├── index.html
    │   ├── package.json
    │   ├── vite.config.ts
    │   ├── README.md
    │   └── src/
    │       ├── main.tsx, App.tsx, index.css
    │       ├── components/     (SwapForm, TokenIcon, TokenSelectModal, SwapConfirmModal, SlippageSettings)
    │       ├── pages/          (SwapPage)
    │       ├── services/       (prices.ts)
    │       ├── hooks/          (useTokenPrices, useSwap)
    │       ├── utils/          (getMockBalance, i18n)
    │       ├── configs/, constants/, types/
    │       └── locales/        (en.json)
    └── problem3/
        ├── readme.md
        ├── ANALYSIS.md                ← Detailed issue breakdown
        └── WalletPage.refactored.tsx  ← Clean version
```
