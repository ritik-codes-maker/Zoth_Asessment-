# Zoth Assesment 

A token sale landing page with a full purchase journey: connect, verify, choose a plan, buy, and view positions. Sale data comes from a mock API, so no wallet, database, or environment variables are needed.

I have added some UI/UX touches from my end , i have made the different figma screen to transition into smooth user journey and add some company specific animation in the blank figma boxes to enhance them.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Turbopack, React Compiler) |
| UI | [React](https://react.dev) 19, [TypeScript](https://www.typescriptlang.org) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4, [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) |
| Components | [shadcn/ui](https://ui.shadcn.com), [Base UI](https://base-ui.com), [Lucide](https://lucide.dev) icons |
| Data fetching | [TanStack Query](https://tanstack.com/query) 5 |
| Linting | [ESLint](https://eslint.org) 9 |

## Getting started

You need [Node.js](https://nodejs.org) 20.9 or newer, and npm, which comes with Node.js.

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with hot reloading |
| `npm run build` | Creates a production build |
| `npm run start` | Serves the production build (run `npm run build` first) |
| `npm run lint` | Checks the code with ESLint |

## API

The app gets its data from two mock routes built into the project, so there is no external service to set up. Nothing is saved: the sale data is the same on every request, and purchases don't change it.

| Method | Route | What it does | Used by |
| --- | --- | --- | --- |
| `GET` | `/api/sale` | Returns the sale data | `useSale` in [`hooks/use-sale.ts`](hooks/use-sale.ts), which refetches every 60 seconds |
| `POST` | `/api/sale/purchase` | Validates a purchase and returns a receipt | `usePurchase` in [`hooks/use-sale.ts`](hooks/use-sale.ts) |

Both routes add a short delay (400 ms and 800 ms) to simulate a real network.

### `GET /api/sale`

Returns the sale's closing time, amount raised and goal, token price, rounds, stage, total supply, minimum contribution, wallet balance, plans, and positions. The full shape is the `SaleData` type in [`lib/types.ts`](lib/types.ts).

```bash
curl http://localhost:3000/api/sale
```

### `POST /api/sale/purchase`

Send the plan ID (`flexible` or `locked`) and the amount to pay in USD:

```bash
curl -X POST http://localhost:3000/api/sale/purchase \
  -H "Content-Type: application/json" \
  -d '{"planId":"flexible","amount":500}'
```

A valid purchase returns a receipt:

```json
{
  "id": "C9BFD648",
  "planName": "Flexible",
  "paid": 500,
  "price": 0.045,
  "status": "Confirmed",
  "fee": 5,
  "tokens": 11000
}
```

If the plan is unknown, the amount isn't a positive number, or the amount is more than the wallet balance, the route returns status `400`:

```json
{ "error": "Invalid purchase" }
```

## Project structure

```text
app/              Page, layout, global styles, and the mock API routes (api/sale)
components/       Page sections, the sale journey steps, and shared and UI components
hooks/            Sale data and countdown hooks
lib/              Types, placeholder content, mock sale data, and formatting helpers
public/           Images and logos
```

To change the plans, prices, or positions, edit [`lib/mock-sale.ts`](lib/mock-sale.ts).
