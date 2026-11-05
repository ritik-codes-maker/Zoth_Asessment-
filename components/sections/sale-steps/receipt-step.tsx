"use client"

import { useSaleFlow } from "@/components/providers/sale-flow-provider"
import { ReceiptDoodle } from "@/components/sections/sale-steps/receipt-doodle"
import { DataRows } from "@/components/shared/data-rows"
import { FramedButton } from "@/components/shared/framed-button"
import { formatNumber, formatUsd } from "@/lib/format"

function ReceiptStep() {
  const { receipt, goTo } = useSaleFlow()

  return (
    <>
      <ReceiptDoodle />
      <h2 className="mt-[19px] text-center text-[12px] uppercase">Lorem ipsum</h2>
      <DataRows
        className="mx-3 mt-3.5"
        rows={[
          { label: "Demo", value: receipt?.id ?? "—" },
          { label: "Demo", value: receipt?.planName ?? "—" },
          { label: "Demo", value: receipt ? formatUsd(receipt.paid) : "—" },
          {
            label: "Lorem ipsum",
            value: receipt ? formatNumber(Math.floor(receipt.tokens)) : "—",
          },
          { label: "Lorem ipsum", value: receipt ? formatUsd(receipt.fee) : "—" },
          { label: "Lorem ipsum", value: receipt?.status ?? "—" },
        ]}
      />
      <div className="mx-[19px] mt-[26px] mb-2 grid gap-[19.5px] sm:grid-cols-2">
        <FramedButton onClick={() => goTo("positions")} className="text-[14px]">
          Lorem ipsum
        </FramedButton>
        <FramedButton
          variant="outline"
          onClick={() => goTo("plans")}
          className="border-border-bright bg-transparent text-[14px]"
        >
          Lorem ipsum
        </FramedButton>
      </div>
    </>
  )
}

export { ReceiptStep }
