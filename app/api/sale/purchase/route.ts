import { getSale, PLANS } from "@/lib/mock-sale"
import { getQuote } from "@/lib/purchase"
import type { PurchaseReceipt, PurchaseRequest } from "@/lib/types"

const SIMULATED_LATENCY_MS = 800

export async function POST(request: Request) {
  const body: Partial<PurchaseRequest> | null = await request
    .json()
    .catch(() => null)
  const plan = PLANS.find(({ id }) => id === body?.planId)
  const amount = Number(body?.amount)
  const { walletBalance } = getSale()

  if (!plan || !Number.isFinite(amount) || amount <= 0 || amount > walletBalance) {
    return Response.json({ error: "Invalid purchase" }, { status: 400 })
  }

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  const receipt: PurchaseReceipt = {
    id: crypto.randomUUID().slice(0, 8).toUpperCase(),
    planName: plan.name,
    paid: amount,
    price: plan.price,
    status: "Confirmed",
    ...getQuote(amount, plan.price),
  }

  return Response.json(receipt)
}
