"use client"

import { useSaleFlow } from "@/components/providers/sale-flow-provider"
import { DataRows } from "@/components/shared/data-rows"
import { FramedButton } from "@/components/shared/framed-button"
import { Panel } from "@/components/shared/panel"
import { useSale } from "@/hooks/use-sale"
import { formatUsd } from "@/lib/format"

function PlansStep() {
  const { choosePlan } = useSaleFlow()
  const { data } = useSale()

  return (
    <>
      <h2 className="text-[12px] uppercase">Lorem ipsum</h2>
      <p className="mt-1 text-[12.5px] text-foreground/75">
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
      </p>
      <div className="mt-[9px] grid gap-[13.5px] sm:grid-cols-2">
        {data?.plans.map((plan) => (
          <Panel key={plan.id} variant="card" className="px-2 pt-2 pb-[13.5px]">
            <div className="flex items-center justify-between border-b border-border pb-1.5 text-[9.5px]">
              {plan.name}
              <span className="text-[11px] text-primary">{plan.tag}</span>
            </div>
            <DataRows
              rows={plan.rows}
              className="mt-[8px]"
              rowClassName="h-[29.7px]"
            />
            <FramedButton
              frameClassName="mx-[5.5px] mt-3"
              onClick={() => choosePlan(plan.id)}
              className="h-[34px] text-[10px]"
            >
              {formatUsd(plan.price)}
            </FramedButton>
          </Panel>
        ))}
      </div>
    </>
  )
}

export { PlansStep }
