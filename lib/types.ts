export type LinkItem = {
  label: string
  href: string
}

export type SaleRound = {
  name: string
  raised: number
  cap: number
}

export type SaleData = {
  /** ISO timestamp of when the sale closes. */
  endsAt: string
  raised: number
  goal: number
  tokenPrice: number
  rounds: SaleRound[]
  stage: string
  /** Zero-based index of the active stage in the sale timeline. */
  currentStep: number
  totalSupply: number
  minContribution: number
}
