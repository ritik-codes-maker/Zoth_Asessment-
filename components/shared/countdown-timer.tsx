"use client"

import { Fragment } from "react"
import { cn } from "cn"

import { useCountdown } from "@/hooks/use-countdown"

type CountdownLabels = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const DEFAULT_LABELS: CountdownLabels = {
  days: "Days",
  hours: "Hours",
  minutes: "Mins",
  seconds: "Secs",
}

const UNITS = ["days", "hours", "minutes", "seconds"] as const

type CountdownTimerProps = {
  /** When the countdown reaches zero. Shows dashes until it is provided. */
  endsAt?: string | number | Date
  labels?: CountdownLabels
  className?: string
}

function CountdownTimer({
  endsAt,
  labels = DEFAULT_LABELS,
  className,
}: CountdownTimerProps) {
  const countdown = useCountdown(endsAt)

  return (
    <div
      role="timer"
      data-slot="countdown-timer"
      className={cn("flex items-center gap-1", className)}
    >
      {UNITS.map((unit, index) => (
        <Fragment key={unit}>
          {index > 0 && (
            <span aria-hidden className="text-sm text-foreground/85">
              :
            </span>
          )}
          <div className="flex h-[38px] w-[38px] flex-col items-center justify-center bg-secondary">
            <span className="text-sm leading-4 tabular-nums">
              {countdown ? String(countdown[unit]).padStart(2, "0") : "--"}
            </span>
            <span className="mt-0.5 text-[7px] leading-none uppercase">
              {labels[unit]}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export { CountdownTimer }
export type { CountdownLabels }
