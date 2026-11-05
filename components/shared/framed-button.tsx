import type { ComponentProps } from "react"
import { cn } from "cn"

import { CornerFrame } from "@/components/shared/corner-frame"
import { Button } from "@/components/ui/button"

type FramedButtonProps = ComponentProps<typeof Button> & {
  frameClassName?: string
}

/** A large button with marks pointing out from each of its corners. */
function FramedButton({ frameClassName, className, ...props }: FramedButtonProps) {
  return (
    <CornerFrame
      variant="cross"
      cornerSize={12}
      cornerHeight={15}
      className={frameClassName}
    >
      <Button
        size="lg"
        className={cn(
          "w-full disabled:bg-primary/50 disabled:opacity-100",
          className
        )}
        {...props}
      />
    </CornerFrame>
  )
}

export { FramedButton }
