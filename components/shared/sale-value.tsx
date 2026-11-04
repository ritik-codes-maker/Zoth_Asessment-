"use client"

import type { ReactNode } from "react"

import { useSale } from "@/hooks/use-sale"
import type { SaleData } from "@/lib/types"

type SaleValueProps = {
  select: (sale: SaleData) => ReactNode
}

/** Shows a value from the sale data, with loading and error fallbacks. */
function SaleValue({ select }: SaleValueProps) {
  const { data, isError } = useSale()

  if (data) return select(data)
  if (isError) return "—"

  return (
    <span
      aria-hidden
      className="inline-block h-[0.8em] w-[4ch] animate-pulse bg-secondary align-middle"
    />
  )
}

export { SaleValue }
