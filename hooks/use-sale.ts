"use client"

import { useQuery } from "@tanstack/react-query"

import type { SaleData } from "@/lib/types"

const REFETCH_INTERVAL_MS = 60_000

async function fetchSale(): Promise<SaleData> {
  const response = await fetch("/api/sale")

  if (!response.ok) {
    throw new Error(`Failed to load sale data (${response.status})`)
  }

  return response.json()
}

function useSale() {
  return useQuery({
    queryKey: ["sale"],
    queryFn: fetchSale,
    refetchInterval: REFETCH_INTERVAL_MS,
  })
}

export { useSale }
