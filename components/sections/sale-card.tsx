"use client"

import { useEffect, useRef } from "react"

import {
  useSaleFlow,
  type SaleStep,
} from "@/components/providers/sale-flow-provider"
import { ActionStep } from "@/components/sections/sale-steps/action-step"
import { PlansStep } from "@/components/sections/sale-steps/plans-step"
import { PositionsStep } from "@/components/sections/sale-steps/positions-step"
import { PurchaseStep } from "@/components/sections/sale-steps/purchase-step"
import { ReceiptStep } from "@/components/sections/sale-steps/receipt-step"
import { ScanStep } from "@/components/sections/sale-steps/scan-step"
import { VerifyStep } from "@/components/sections/sale-steps/verify-step"
import { Panel } from "@/components/shared/panel"

const STEP_VIEWS: Record<SaleStep, () => React.ReactNode> = {
  landing: ActionStep,
  connected: ActionStep,
  signedIn: ActionStep,
  verify: VerifyStep,
  scan: ScanStep,
  plans: PlansStep,
  purchase: PurchaseStep,
  receipt: ReceiptStep,
  positions: PositionsStep,
}

function SaleCard() {
  const { step } = useSaleFlow()
  const panelRef = useRef<HTMLDivElement>(null)
  const StepView = STEP_VIEWS[step]

  // The button that was just pressed may be gone from the new step, which would
  // drop keyboard users back at the top of the page.
  useEffect(() => {
    if (document.activeElement === document.body) {
      panelRef.current?.focus({ preventScroll: true })
    }
  }, [step])

  return (
    <Panel
      ref={panelRef}
      tabIndex={-1}
      variant="card"
      data-slot="sale-card"
      data-step={step}
      className="px-[17px] pt-[15px] pb-4 outline-none"
    >
      <div
        key={step}
        className="animate-in duration-300 fade-in slide-in-from-bottom-1 motion-reduce:animate-none"
      >
        <StepView />
      </div>
    </Panel>
  )
}

export { SaleCard }
