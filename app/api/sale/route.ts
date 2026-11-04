import { connection } from "next/server"

import type { SaleData } from "@/lib/types"

const SALE_WINDOW_MS = 14 * 24 * 60 * 60 * 1000
const SIMULATED_LATENCY_MS = 400

// Snaps to a fixed window, so refreshing never resets the countdown, and looks
// one window ahead, so the mock sale always has 14 to 28 days left.
function getSaleEnd() {
  const currentWindow = Math.floor(Date.now() / SALE_WINDOW_MS)
  return new Date((currentWindow + 2) * SALE_WINDOW_MS)
}

export async function GET() {
  // Keeps this handler out of the build-time prerender.
  await connection()
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  const sale: SaleData = {
    endsAt: getSaleEnd().toISOString(),
    raised: 4_100_000,
    goal: 10_000_000,
    tokenPrice: 0.045,
    rounds: [
      { name: "Round 1", raised: 890_000, cap: 1_000_000 },
      { name: "Round 2", raised: 2_700_000, cap: 3_000_000 },
    ],
    stage: "Live",
    currentStep: 0,
    totalSupply: 1_000_000_000,
    minContribution: 100,
  }

  return Response.json(sale)
}
