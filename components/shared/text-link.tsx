import type { ComponentProps } from "react"
import Link from "next/link"
import { cn } from "cn"

function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="text-link"
      className={cn(
        "underline underline-offset-4 transition-colors hover:text-primary",
        className
      )}
      {...props}
    />
  )
}

export { TextLink }
