import { cn } from "cn"

// All coordinates are in the Figma's 1305px wide frame, and scale with the page.
const WIDTH = 1305
const TOP = 3
const VANISHING_POINT = { x: 653, y: 525 }

// Left edge and top edge of each nested frame, from the outside in.
const FRAMES = [
  [25, 3],
  [54, 26],
  [82, 49],
  [108, 70],
  [133, 89],
  [155, 107],
  [176, 123],
  [195, 139],
  [214, 155],
]

const BACK_WALL = FRAMES[FRAMES.length - 1]

// Where the rails meet the page: the left edge for side rails, the top for the rest.
const SIDE_RAILS = [61, 159, 251, 348, 434, 525, 617, 703, 795]
const TOP_RAILS = [141, 243, 326, 410, 498, 577]

// Frame sides run past the bottom of the hero, so their lower edges never show.
const FRAME_BOTTOM = 1400

type Segment = Record<"x1" | "y1" | "x2" | "y2", number>

function mirror(x: number) {
  return WIDTH + 1 - x
}

function frameEdge(x1: number, y1: number, x2: number, y2: number): Segment {
  return { x1, y1, x2, y2 }
}

// A stretch of a side rail, from its distance `fromX` to `toX` off the page edge.
function sideRailPart(
  startY: number,
  fromX: number,
  toX: number,
  side: "left" | "right" = "left"
): Segment {
  const place = side === "left" ? (x: number) => x : mirror

  return {
    x1: place(fromX),
    y1: sideRailY(startY, fromX),
    x2: place(toX),
    y2: sideRailY(startY, toX),
  }
}

function topRailPart(startX: number, fromY: number, toY: number): Segment {
  return {
    x1: topRailX(startX, fromY),
    y1: fromY,
    x2: topRailX(startX, toY),
    y2: toY,
  }
}

// Short brighter strokes, as if catching the light. Each is worked out from the
// line it sits on, so it can't drift away from it. These run along frame sides...
const FRAME_HIGHLIGHTS = [
  frameEdge(200, 70, 217, 70),
  frameEdge(280, 70, topRailX(243, 70), 70),
  frameEdge(topRailX(410, 107), 107, 470, 107),
  frameEdge(518, 107, 537, 107),
  frameEdge(584, 107, topRailX(577, 107), 107),
  frameEdge(82, sideRailY(434, 82), 82, 457),
  frameEdge(82, 512, 82, 525),
  frameEdge(82, 525, 104, 525),
  frameEdge(82, 690, 82, sideRailY(703, 82)),
  frameEdge(mirror(82), sideRailY(61, 82), mirror(82), 129),
  frameEdge(mirror(82), 195, mirror(82), sideRailY(159, 82)),
  frameEdge(mirror(54), sideRailY(703, 54), mirror(54), 703),
  frameEdge(mirror(155), 397, mirror(155), sideRailY(348, 155)),
  frameEdge(mirror(155), 445, mirror(155), sideRailY(434, 155)),
]

// ...and these along the rails between them.
const RAIL_HIGHLIGHTS = [
  topRailPart(141, 3, 27),
  topRailPart(243, 70, 82),
  topRailPart(410, 92, 107),
  topRailPart(577, 107, 115),
  sideRailPart(434, 45, 82),
  sideRailPart(703, 82, 97),
  sideRailPart(61, 98, 82, "right"),
  sideRailPart(159, 82, 66, "right"),
  sideRailPart(251, 116, 82, "right"),
  sideRailPart(703, 82, 54, "right"),
  sideRailPart(348, 155, 134, "right"),
  sideRailPart(434, 155, 163, "right"),
  sideRailPart(434, 214, 205, "right"),
  sideRailPart(703, 214, 188, "right"),
]

function sideRailY(startY: number, x: number) {
  return startY + ((VANISHING_POINT.y - startY) * x) / VANISHING_POINT.x
}

function topRailX(startX: number, y: number) {
  return (
    startX +
    ((VANISHING_POINT.x - startX) * (y - TOP)) / (VANISHING_POINT.y - TOP)
  )
}

function Line({ x1, y1, x2, y2 }: Segment) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} vectorEffect="non-scaling-stroke" />
  )
}

/** Decorative backdrop. Its parent needs `relative isolate` to contain it. */
function GridBackground({ className }: { className?: string }) {
  const [backWallX, backWallY] = BACK_WALL
  const [outerX, outerY] = FRAMES[0]

  return (
    <div
      aria-hidden
      data-slot="grid-background"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_30.7%_59.5%_at_69%_44.7%,rgba(255,69,9,0.235),transparent),radial-gradient(ellipse_25%_26%_at_28%_73%,rgba(255,69,9,0.12),transparent)] mask-[linear-gradient(rgb(0_0_0/0.3),black_20%)]" />

      {/* Lets the lines die away before they reach the next section. */}
      <div className="absolute inset-0 mask-[linear-gradient(black_calc(100%-140px),transparent)]">
        <svg
          viewBox={`0 ${TOP} ${WIDTH} 727`}
          fill="none"
          className="absolute top-0 left-1/2 h-auto w-full min-w-[700px] -translate-x-1/2 overflow-visible"
        >
          <defs>
            {/* Lines are strongest at the corners and gone near the centre. */}
            <radialGradient
              id="grid-fade"
              gradientUnits="userSpaceOnUse"
              cx={VANISHING_POINT.x}
              cy={VANISHING_POINT.y}
              r="840"
              gradientTransform={`translate(0 ${VANISHING_POINT.y}) scale(1 0.833) translate(0 ${-VANISHING_POINT.y})`}
            >
              <stop offset="0.59" stopColor="white" stopOpacity="0" />
              <stop offset="0.73" stopColor="white" stopOpacity="0.35" />
              <stop offset="0.83" stopColor="white" stopOpacity="0.6" />
              <stop offset="1" stopColor="white" stopOpacity="0.9" />
            </radialGradient>
            <mask
              id="grid-mask"
              maskUnits="userSpaceOnUse"
              x="-200"
              y="-200"
              width={WIDTH + 400}
              height={FRAME_BOTTOM + 400}
            >
              <rect
                x="-200"
                y="-200"
                width={WIDTH + 400}
                height={FRAME_BOTTOM + 400}
                fill="url(#grid-fade)"
              />
            </mask>
          </defs>

          <g mask="url(#grid-mask)" className="stroke-grid-line">
            {/* Crisp, so a 1px line doesn't split its brightness across two rows. */}
            {FRAMES.map(([x, y]) => (
              <g key={x} shapeRendering="crispEdges">
                <Line x1={x} y1={y} x2={mirror(x)} y2={y} />
                <Line x1={x} y1={y} x2={x} y2={FRAME_BOTTOM} />
                <Line x1={mirror(x)} y1={y} x2={mirror(x)} y2={FRAME_BOTTOM} />
              </g>
            ))}

            {/* The frame corners, joined by a diagonal on each side. */}
            <Line x1={outerX} y1={outerY} x2={backWallX} y2={backWallY} />
            <Line
              x1={mirror(outerX)}
              y1={outerY}
              x2={mirror(backWallX)}
              y2={backWallY}
            />

            {SIDE_RAILS.map((y) => (
              <g key={y}>
                <Line x1={0} y1={y} x2={backWallX} y2={sideRailY(y, backWallX)} />
                <Line
                  x1={mirror(0)}
                  y1={y}
                  x2={mirror(backWallX)}
                  y2={sideRailY(y, backWallX)}
                />
              </g>
            ))}

            {TOP_RAILS.map((x) => (
              <g key={x}>
                <Line x1={x} y1={TOP} x2={topRailX(x, backWallY)} y2={backWallY} />
                <Line
                  x1={mirror(x)}
                  y1={TOP}
                  x2={mirror(topRailX(x, backWallY))}
                  y2={backWallY}
                />
              </g>
            ))}

            <g className="stroke-grid-highlight">
              {/* Crisp like the frames, so the two land on the same pixels. */}
              <g shapeRendering="crispEdges">
                {FRAME_HIGHLIGHTS.map((segment, index) => (
                  <Line key={index} {...segment} />
                ))}
              </g>
              {RAIL_HIGHLIGHTS.map((segment, index) => (
                <Line key={index} {...segment} />
              ))}
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

export { GridBackground }
