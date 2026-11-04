import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const panelVariants = cva("border", {
  variants: {
    variant: {
      default: "border-border bg-black",
      card: "border-border-strong bg-card",
      glow: "border-border-strong bg-card shadow-[0_0_90px_rgba(255,69,9,0.1)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Panel({
  variant,
  className,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof panelVariants>) {
  return (
    <div
      data-slot="panel"
      className={cn(panelVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Panel, panelVariants }
