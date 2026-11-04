import type { ReactNode } from "react"
import { cn } from "cn"

import { Progress } from "@/components/ui/progress"

type ProgressBarProps = {
  /** Percentage filled, from 0 to 100. */
  value: number
  label: string
  startLabel?: ReactNode
  endLabel?: ReactNode
  className?: string
}

function ProgressBar({
  value,
  label,
  startLabel,
  endLabel,
  className,
}: ProgressBarProps) {
  return (
    <div data-slot="progress-bar" className={cn("w-full", className)}>
      <Progress value={value} aria-label={label} />
      {(startLabel || endLabel) && (
        <div className="mt-1.5 flex justify-between gap-4 text-[11px] text-foreground/85 tabular-nums">
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      )}
    </div>
  )
}

export { ProgressBar }
