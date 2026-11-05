import type { ComponentProps } from "react"
import { cn } from "cn"

import { CornerFrame } from "@/components/shared/corner-frame"

function FrameBadge({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <CornerFrame
      data-slot="frame-badge"
      cornerSize={5}
      className={cn(
        "inline-flex h-[22px] items-center justify-center px-[37px] text-[13px] tracking-[0.12em] text-primary",
        className
      )}
      {...props}
    >
      {/* Runs on past the badge, so the grid lines stop behind it as a strip. */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-[287px] bg-badge" />
      {/* On its own layer so the border and corners round to the same device
          pixels. Browsers shrink borders at fractional display scales, so
          corners measured from inside a real border drift by a pixel. */}
      <span aria-hidden className="absolute inset-0 border border-border-strong" />
      <span className="relative">{children}</span>
    </CornerFrame>
  )
}

export { FrameBadge }
