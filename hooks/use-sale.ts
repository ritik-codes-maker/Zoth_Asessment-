"use client"

import { useMutation, useQuery } from "@tanstack/react-query"

import type { PurchaseReceipt, PurchaseRequest, SaleData } from "@/lib/types"

const REFETCH_INTERVAL_MS = 60_000

async function fetchSale(): Promise<SaleData> {
  const response = await fetch("/api/sale")

  if (!response.ok) {
    throw new Error(`Failed to load sale data (${response.status})`)
  }

  return response.json()
}

async function postPurchase(purchase: PurchaseRequest): Promise<PurchaseReceipt> {
  const response = await fetch("/api/sale/purchase", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(purchase),
  })

  if (!response.ok) {
    throw new Error(`Failed to complete the purchase (${response.status})`)
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

function usePurchase() {
  return useMutation({ mutationFn: postPurchase })
}

export { usePurchase, useSale }
