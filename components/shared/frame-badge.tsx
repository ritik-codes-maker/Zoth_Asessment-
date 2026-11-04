import type { ComponentProps } from "react"
import { cn } from "cn"

import { CornerFrame } from "@/components/shared/corner-frame"

function FrameBadge({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <CornerFrame
      data-slot="frame-badge"
      cornerSize={5}
      className={cn(
        "inline-flex h-[22px] items-center justify-center border border-border-strong px-9 text-[13px] tracking-[0.12em] text-primary",
        className
      )}
      {...props}
    >
      {children}
    </CornerFrame>
  )
}

export { FrameBadge }
