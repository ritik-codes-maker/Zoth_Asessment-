"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

import type { PurchaseReceipt } from "@/lib/types"

/** Where the visitor is in the sale journey, from first visit to claiming. */
type SaleStep =
  | "landing"
  | "connected"
  | "signedIn"
  | "verify"
  | "scan"
  | "plans"
  | "purchase"
  | "receipt"
  | "positions"

/** Steps after verification, which get the later version of the account menu. */
const VERIFIED_STEPS: SaleStep[] = ["plans", "purchase", "receipt", "positions"]

type SaleFlow = {
  step: SaleStep
  isVerified: boolean
  planId: string | null
  receipt: PurchaseReceipt | null
  goTo: (step: SaleStep) => void
  choosePlan: (planId: string) => void
  completePurchase: (receipt: PurchaseReceipt) => void
}

const SaleFlowContext = createContext<SaleFlow | null>(null)

function SaleFlowProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<SaleStep>("landing")
  const [planId, setPlanId] = useState<string | null>(null)
  const [receipt, setReceipt] = useState<PurchaseReceipt | null>(null)

  return (
    <SaleFlowContext.Provider
      value={{
        step,
        isVerified: VERIFIED_STEPS.includes(step),
        planId,
        receipt,
        goTo: setStep,
        choosePlan: (id) => {
          setPlanId(id)
          setStep("purchase")
        },
        completePurchase: (newReceipt) => {
          setReceipt(newReceipt)
          setStep("receipt")
        },
      }}
    >
      {children}
    </SaleFlowContext.Provider>
  )
}

function useSaleFlow() {
  const flow = useContext(SaleFlowContext)

  if (!flow) {
    throw new Error("useSaleFlow must be used inside SaleFlowProvider")
  }

  return flow
}

export { SaleFlowProvider, useSaleFlow }
export type { SaleStep }
