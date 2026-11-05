"use client"

import { useSaleFlow } from "@/components/providers/sale-flow-provider"
import { FramedButton } from "@/components/shared/framed-button"

function VerifyStep() {
  const { goTo } = useSaleFlow()

  return (
    <>
      <p className="flex items-center gap-[6px] text-[11.5px] uppercase">
        <span aria-hidden className="size-[3.5px] rounded-full bg-primary" />
        Lorem ipsum
      </p>
      <h2 className="mt-5 text-[12px] uppercase">Lorem ipsum</h2>
      <p className="mt-1 text-[12.5px] leading-4 text-foreground/75">
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
        incididunt ut
      </p>
      <FramedButton frameClassName="mx-1.5 mt-[31px]" onClick={() => goTo("scan")}>
        Lorem ipsum
      </FramedButton>
    </>
  )
}

export { VerifyStep }
