import { AlarmClock } from "lucide-react"
import { cn } from "cn"

import {
  CountdownTimer,
  type CountdownLabels,
} from "@/components/shared/countdown-timer"
import { Panel } from "@/components/shared/panel"

type CountdownCardProps = {
  title: string
  description?: string
  endsAt?: string | number | Date
  labels?: CountdownLabels
  className?: string
}

function CountdownCard({
  title,
  description,
  endsAt,
  labels,
  className,
}: CountdownCardProps) {
  return (
    <Panel
      data-slot="countdown-card"
      className={cn(
        "flex flex-col gap-4 px-3 py-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-sm">
          <AlarmClock aria-hidden className="size-4 shrink-0" />
          {title}
        </p>
        {description && (
          <p className="mt-1.5 text-[11px] text-foreground/75">{description}</p>
        )}
      </div>
      <CountdownTimer endsAt={endsAt} labels={labels} className="shrink-0" />
    </Panel>
  )
}

export { CountdownCard }
