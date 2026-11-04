import type { ComponentProps, CSSProperties } from "react"
import { cn } from "cn"

const BRACKET_CORNERS = [
  "top-[calc(var(--corner-shift-y)*-1)] left-[calc(var(--corner-shift-x)*-1)] border-t border-l",
  "top-[calc(var(--corner-shift-y)*-1)] right-[calc(var(--corner-shift-x)*-1)] border-t border-r",
  "bottom-[calc(var(--corner-shift-y)*-1)] left-[calc(var(--corner-shift-x)*-1)] border-b border-l",
  "right-[calc(var(--corner-shift-x)*-1)] bottom-[calc(var(--corner-shift-y)*-1)] border-r border-b",
]

// Each mark only draws the two arms pointing away from the content, so nothing
// runs along the content's own edges.
const CROSS_ARMS =
  "bg-[length:calc(50%+0.5px)_1px,1px_calc(50%+0.5px)]"

const CROSS_CORNERS = [
  `top-[calc(var(--corner-shift-y)*-1)] left-[calc(var(--corner-shift-x)*-1)] ${CROSS_ARMS} bg-[position:left_center,center_top]`,
  `top-[calc(var(--corner-shift-y)*-1)] right-[calc(var(--corner-shift-x)*-1)] ${CROSS_ARMS} bg-[position:right_center,center_top]`,
  `bottom-[calc(var(--corner-shift-y)*-1)] left-[calc(var(--corner-shift-x)*-1)] ${CROSS_ARMS} bg-[position:left_center,center_bottom]`,
  `right-[calc(var(--corner-shift-x)*-1)] bottom-[calc(var(--corner-shift-y)*-1)] ${CROSS_ARMS} bg-[position:right_center,center_bottom]`,
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
  /** Width of each corner mark, in px. */
  cornerSize?: number
  /** Height of each corner mark, in px. Defaults to `cornerSize`. */
  cornerHeight?: number
  /** Distance from the content edge to the corner mark, in px. */
  offset?: number
  cornerClassName?: string
}

function CornerFrame({
  variant = "bracket",
  cornerSize = 8,
  cornerHeight = cornerSize,
  offset = 0,
  cornerClassName,
  className,
  style,
  children,
  ...props
}: CornerFrameProps) {
  const isCross = variant === "cross"
  const corners = isCross ? CROSS_CORNERS : BRACKET_CORNERS
  const frameStyle = {
    // Crosses are centred on the corner, so they also step out by half their size.
    "--corner-shift-x": `${isCross ? offset + cornerSize / 2 : offset}px`,
    "--corner-shift-y": `${isCross ? offset + cornerHeight / 2 : offset}px`,
    ...style,
  } as CSSProperties
  const cornerStyle = { width: cornerSize, height: cornerHeight }

  return (
    <div
      data-slot="corner-frame"
      className={cn("relative", className)}
      style={frameStyle}
      {...props}
    >
      {children}
      {corners.map((corner) =>
        isCross ? (
          <CrossMark
            key={corner}
            className={cn(corner, cornerClassName)}
            style={cornerStyle}
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
            style={cornerStyle}
          />
        )
      )}
    </div>
  )
}

export { CornerFrame, CrossMark }
