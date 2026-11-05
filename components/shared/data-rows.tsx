import type { ReactNode } from "react"
import { cn } from "cn"

type DataRowsProps = {
  rows: { label: ReactNode; value: ReactNode }[]
  className?: string
  rowClassName?: string
}

/** A compact list of label and value pairs, split by thin lines. */
function DataRows({ rows, className, rowClassName }: DataRowsProps) {
  return (
    <dl data-slot="data-rows" className={cn("divide-y divide-border", className)}>
      {rows.map((row, index) => (
        <div
          key={index}
          className={cn(
            "flex h-[26.5px] items-center justify-between gap-3",
            rowClassName
          )}
        >
          <dt className="min-w-0 text-[9.5px] text-foreground/60">{row.label}</dt>
          <dd className="shrink-0 text-[11px] tabular-nums">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export { DataRows }
