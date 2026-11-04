import type { ReactNode } from "react"
import { cn } from "cn"

import { Panel } from "@/components/shared/panel"
import { ProgressBar } from "@/components/shared/progress-bar"

type ProgressStatCardProps = {
  label: string
  value: ReactNode
  progress: number
  startLabel?: ReactNode
  endLabel?: ReactNode
  className?: string
}

function ProgressStatCard({
  label,
  value,
  progress,
  startLabel,
  endLabel,
  className,
}: ProgressStatCardProps) {
  return (
    <Panel
      data-slot="progress-stat-card"
      className={cn("px-2 pt-2 pb-1.5", className)}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border pb-1 text-[9px] leading-4 tabular-nums">
        <span>{label}</span>
        <span className="text-[11px] text-primary">{value}</span>
      </div>
      <ProgressBar
        value={progress}
        label={label}
        startLabel={startLabel}
        endLabel={endLabel}
        className="mt-3"
      />
    </Panel>
  )
}

export { ProgressStatCard }
