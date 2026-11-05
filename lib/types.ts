export type LinkItem = {
  label: string
  href: string
}

export type SaleRound = {
  name: string
  raised: number
  cap: number
}

export type DataRow = {
  label: string
  value: string
}

export type SalePlan = {
  id: string
  name: string
  tag: string
  /** Price of one token on this plan, in USD. */
  price: number
  rows: DataRow[]
}

export type SalePosition = {
  id: string
  name: string
  status: string
  /** Amount paid, in USD. */
  invested: number
  tokens: number
}

export type SaleData = {
  /** ISO timestamp of when the sale closes. */
  endsAt: string
  raised: number
  goal: number
  tokenPrice: number
  rounds: SaleRound[]
  /** Round progress to show once the buyer is looking at their positions. */
  claimRounds: SaleRound[]
  stage: string
  /** Zero-based index of the active stage in the sale timeline. */
  currentStep: number
  totalSupply: number
  minContribution: number
  /** What the connected wallet can spend, in USD. */
  walletBalance: number
  plans: SalePlan[]
  positions: SalePosition[]
}

export type PurchaseRequest = {
  planId: string
  amount: number
}

export type PurchaseReceipt = {
  id: string
  planName: string
  paid: number
  tokens: number
  price: number
  fee: number
  status: string
}
