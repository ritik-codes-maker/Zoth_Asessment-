import type { ComponentProps, ReactNode } from "react"
import { cn } from "cn"

type StatBlockProps = Omit<ComponentProps<"div">, "children"> & {
  label: ReactNode
  value: ReactNode
  align?: "left" | "right"
  highlight?: boolean
}

function StatBlock({
  label,
  value,
  align = "left",
  highlight = false,
  className,
  ...props
}: StatBlockProps) {
  return (
    <div
      data-slot="stat-block"
      className={cn(align === "right" && "text-right", className)}
      {...props}
    >
      <p className="text-[13px] text-foreground/85">{label}</p>
      <p
        className={cn(
          "mt-1.5 text-2xl leading-8 tabular-nums",
          highlight && "text-primary"
        )}
      >
        {value}
      </p>
    </div>
  )
}

export { StatBlock }
