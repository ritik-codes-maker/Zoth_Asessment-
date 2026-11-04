import type { ComponentProps, CSSProperties } from "react"
import { cn } from "cn"

const BRACKET_CORNERS = [
  "top-[calc(var(--corner-shift)*-1)] left-[calc(var(--corner-shift)*-1)] border-t border-l",
  "top-[calc(var(--corner-shift)*-1)] right-[calc(var(--corner-shift)*-1)] border-t border-r",
  "bottom-[calc(var(--corner-shift)*-1)] left-[calc(var(--corner-shift)*-1)] border-b border-l",
  "right-[calc(var(--corner-shift)*-1)] bottom-[calc(var(--corner-shift)*-1)] border-r border-b",
]

const CROSS_CORNERS = [
  "top-[calc(var(--corner-shift)*-1)] left-[calc(var(--corner-shift)*-1)]",
  "top-[calc(var(--corner-shift)*-1)] right-[calc(var(--corner-shift)*-1)]",
  "bottom-[calc(var(--corner-shift)*-1)] left-[calc(var(--corner-shift)*-1)]",
  "right-[calc(var(--corner-shift)*-1)] bottom-[calc(var(--corner-shift)*-1)]",
]

function CrossMark({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="cross-mark"
      className={cn(
        "pointer-events-none absolute size-3 bg-[linear-gradient(currentColor,currentColor),linear-gradient(currentColor,currentColor)] bg-[length:100%_1px,1px_100%] bg-center bg-no-repeat text-primary",
        className
      )}
      {...props}
    />
  )
}

type CornerFrameProps = ComponentProps<"div"> & {
  variant?: "bracket" | "cross"
  /** Length of each corner mark, in px. */
  cornerSize?: number
  /** Distance from the content edge to the corner mark, in px. */
  offset?: number
  cornerClassName?: string
}

function CornerFrame({
  variant = "bracket",
  cornerSize = 8,
  offset = 0,
  cornerClassName,
  className,
  style,
  children,
  ...props
}: CornerFrameProps) {
  const shift = variant === "cross" ? offset + cornerSize / 2 : offset
  const corners = variant === "cross" ? CROSS_CORNERS : BRACKET_CORNERS
  const frameStyle = {
    "--corner-shift": `${shift}px`,
    ...style,
  } as CSSProperties

  return (
    <div
      data-slot="corner-frame"
      className={cn("relative", className)}
      style={frameStyle}
      {...props}
    >
      {children}
      {corners.map((corner) =>
        variant === "cross" ? (
          <CrossMark
            key={corner}
            className={cn(corner, cornerClassName)}
            style={{ width: cornerSize, height: cornerSize }}
          />
        ) : (
          <span
            key={corner}
            aria-hidden
            className={cn(
              "pointer-events-none absolute border-current text-primary",
              corner,
              cornerClassName
            )}
            style={{ width: cornerSize, height: cornerSize }}
          />
        )
      )}
    </div>
  )
}

export { CornerFrame, CrossMark }
