"use client"

import Link from "next/link"

import { useSaleFlow } from "@/components/providers/sale-flow-provider"
import { CornerFrame } from "@/components/shared/corner-frame"
import { FramedButton } from "@/components/shared/framed-button"
import { Button } from "@/components/ui/button"

const OUTLINE_CLASS = "h-[46px] w-full border-primary bg-transparent"

function ActionStep() {
  const { step, goTo } = useSaleFlow()
  const nextStep =
    step === "landing" ? "connected" : step === "connected" ? "signedIn" : "verify"

  return (
    <>
      <h2 className="text-[13px] uppercase">Lorem ipsum</h2>
      <p className="mt-0.5 text-[13px] text-foreground/75">
        Lorem ipsum dolor sit amet consectetur adipiscing
      </p>

      <FramedButton frameClassName="mx-1.5 mt-[30px]" onClick={() => goTo(nextStep)}>
        Lorem ipsum
      </FramedButton>

      <CornerFrame
        cornerSize={6}
        cornerHeight={7.5}
        offset={5}
        className="mx-[5px] mt-[25px]"
      >
        {step === "signedIn" ? (
          <Button
            variant="outline"
            onClick={() => goTo("plans")}
            className={`${OUTLINE_CLASS} flex-col gap-0 text-[12.5px] leading-4`}
          >
            Lorem ipsum
            <span className="text-[7px] leading-[9px] text-primary">Lorem ipsum</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="#details" />}
            className={`${OUTLINE_CLASS} text-[12.5px]`}
          >
            Lorem ipsum
          </Button>
        )}
      </CornerFrame>

      <p className="mt-[15px] text-center text-[11px] text-foreground/85">
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
      </p>
    </>
  )
}

export { ActionStep }
