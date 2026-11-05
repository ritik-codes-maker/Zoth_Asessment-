import type { SaleData, SalePlan } from "@/lib/types"

const SALE_WINDOW_MS = 14 * 24 * 60 * 60 * 1000

// Snaps to a fixed window, so refreshing never resets the countdown, and looks
// one window ahead, so the mock sale always has 14 to 28 days left.
function getSaleEnd() {
  const currentWindow = Math.floor(Date.now() / SALE_WINDOW_MS)
  return new Date((currentWindow + 2) * SALE_WINDOW_MS)
}

function createPlan(
  id: string,
  name: string,
  tag: string,
  price: number,
  lockup: string
): SalePlan {
  return {
    id,
    name,
    tag,
    price,
    rows: [
      { label: "Lorem ipsum", value: lockup },
      { label: "Lorem ipsum", value: `$${price}` },
      { label: "Lorem ipsum dolor", value: "$100" },
      { label: "Lorem ipsum", value: "$50,000" },
      { label: "Lorem ipsum dolor", value: "10%" },
      { label: "Lorem ipsum", value: "6 mo" },
      { label: "Demo", value: "Base" },
      { label: "Lorem ipsum", value: "USDC" },
    ],
  }
}

const PLANS = [
  createPlan("flexible", "Flexible", "Open", 0.045, "None"),
  createPlan("locked", "Locked", "-20%", 0.036, "12 months"),
]

function getSale(): SaleData {
  return {
    endsAt: getSaleEnd().toISOString(),
    raised: 4_100_000,
    goal: 10_000_000,
    tokenPrice: 0.045,
    rounds: [
      { name: "Round 1", raised: 890_000, cap: 1_000_000 },
      { name: "Round 2", raised: 2_700_000, cap: 3_000_000 },
    ],
    claimRounds: [
      { name: "Round 1", raised: 440_000, cap: 1_000_000 },
      { name: "Round 2", raised: 600_000, cap: 3_000_000 },
    ],
    stage: "[XX]",
    currentStep: 0,
    totalSupply: 1_000_000_000,
    minContribution: 100,
    walletBalance: 12_500,
    plans: PLANS,
    positions: [
      { id: "position-1", name: "Flexible", status: "Claimable", invested: 2_500, tokens: 55_000 },
      { id: "position-2", name: "Locked", status: "Vesting", invested: 1_000, tokens: 27_500 },
    ],
  }
}

export { getSale, PLANS }
