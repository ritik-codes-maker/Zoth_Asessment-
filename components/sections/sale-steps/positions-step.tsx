"use client"

import { useState } from "react"

import { FramedButton } from "@/components/shared/framed-button"
import { useSale } from "@/hooks/use-sale"
import { formatNumber, formatUsd } from "@/lib/format"

function Figure({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <p className="text-[12px] uppercase">{label}</p>
      <p className="mt-0.5 text-[29px] leading-[34px] tabular-nums">
        {value} <span className="text-[12px]">{unit}</span>
      </p>
    </div>
  )
}

function PositionsStep() {
  const { data } = useSale()
  const [claimedIds, setClaimedIds] = useState<string[]>([])

  return (
    <>
      <h2 className="text-[12px] uppercase">Lorem ipsum</h2>
      <div className="mt-[22px] space-y-[24.5px]">
        {data?.positions.map((position) => {
          const isClaimed = claimedIds.includes(position.id)

          return (
            <section
              key={position.id}
              data-slot="position-card"
              className="bg-[#0e0505] px-[13.5px] pt-4 pb-[21px]"
            >
              <div className="flex items-center justify-between border-b border-border-strong pb-2 text-[13px]">
                {position.name}
                <span className="text-primary">
                  {isClaimed ? "Claimed" : position.status}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap justify-between gap-4">
                <Figure
                  label="DEMO"
                  value={formatUsd(position.invested)}
                  unit="DEMO"
                />
                <Figure
                  label="DEMO"
                  value={formatNumber(position.tokens)}
                  unit="Demo"
                />
              </div>
              <FramedButton
                frameClassName="mx-[5px] mt-[25px]"
                disabled={isClaimed}
                onClick={() => setClaimedIds((ids) => [...ids, position.id])}
              >
                {isClaimed ? "Claimed" : "Lorem ipsum"}
              </FramedButton>
            </section>
          )
        })}
      </div>
    </>
  )
}

export { PositionsStep }
