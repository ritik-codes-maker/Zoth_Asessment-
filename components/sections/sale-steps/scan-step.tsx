"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { cn } from "cn"

import { useSaleFlow } from "@/components/providers/sale-flow-provider"

const CHECKS = [
  "Lorem ipsum",
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum",
  "Lorem ipsum",
]

const CHECK_INTERVAL_MS = 1200

function ScanStep() {
  const { goTo } = useSaleFlow()
  const [completed, setCompleted] = useState(0)

  // Stands in for a verification service reporting back. Once every check has
  // passed, the visitor moves on without having to do anything.
  useEffect(() => {
    const id = setInterval(() => {
      setCompleted((count) => count + 1)
    }, CHECK_INTERVAL_MS)

    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (completed > CHECKS.length) goTo("plans")
  }, [completed, goTo])

  return (
    <>
      <h2 className="text-[12px] uppercase">Lorem ipsum</h2>
      <div className="mt-[19px] flex flex-col gap-6 pb-[9px] sm:flex-row sm:gap-8">
        <div
          aria-hidden
          data-slot="scan-placeholder"
          className="aspect-square w-full max-w-56 shrink-0 bg-[#141010]"
        />
        <ul className="min-w-0 space-y-[11.5px]">
          {CHECKS.map((label, index) => {
            const isDone = index < completed

            return (
              <li
                key={index}
                className={cn(
                  "flex h-[15px] items-center gap-2.5 text-[11px] transition-colors duration-300",
                  !isDone && "text-foreground/45"
                )}
              >
                <span
                  className={cn(
                    "flex size-[15px] shrink-0 items-center justify-center border transition-colors duration-300",
                    isDone ? "border-primary text-primary" : "border-border-strong"
                  )}
                >
                  {isDone && <Check aria-hidden className="size-2.5" />}
                </span>
                {label}
                <span className="sr-only">{isDone ? "complete" : "pending"}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export { ScanStep }
