import { cn } from "cn"

// Inset of each nested rectangle, as a percentage of the width and height.
const FRAMES = [
  [4, 8],
  [8, 15],
  [10, 18],
  [14, 26],
  [20, 36],
]

// Lines running from the page corners towards the centre of the tunnel.
const DIAGONALS = [
  [0, 0, 30, 45],
  [100, 0, 70, 45],
  [0, 100, 30, 55],
  [100, 100, 70, 55],
  [0, 28, 20, 36],
  [100, 28, 80, 36],
  [0, 72, 20, 64],
  [100, 72, 80, 64],
]

/** Decorative backdrop. Its parent needs `relative isolate` to contain it. */
function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      data-slot="grid-background"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0 size-full stroke-accent mask-b-from-70% mask-b-to-100%"
      >
        {FRAMES.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={100 - x * 2}
            height={100 - y * 2}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {DIAGONALS.map(([x1, y1, x2, y2]) => (
          <line
            key={`${x1}-${y1}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_72%_62%,rgba(255,69,9,0.16),transparent_100%)]" />
    </div>
  )
}

export { GridBackground }
