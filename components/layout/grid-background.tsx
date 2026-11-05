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

// Short brighter strokes along the lines, as if catching the light.
const HIGHLIGHTS = [
  "141,3 164,27",
  "200,70 217,70",
  "280,70 293,70 301,82",
  "451,92 460,107 470,107",
  "518,107 537,107",
  "584,107 591,107 593,115",
  "45,440 82,444 82,457",
  "82,512 82,525 104,525",
  "82,690 82,680 97,677",
  "1208,125 1224,115 1224,125",
  "1224,195 1224,204 1240,196",
  "1190,296 1224,283",
  "1224,682 1252,690 1252,703",
  "1151,397 1151,389 1172,384",
  "1151,445 1151,454 1143,455",
  "1092,461 1101,460",
  "1092,648 1118,655",
]

function mirror(x: number) {
  return WIDTH + 1 - x
}

function sideRailY(startY: number, x: number) {
  return startY + ((VANISHING_POINT.y - startY) * x) / VANISHING_POINT.x
}

function topRailX(startX: number, y: number) {
  return (
    startX +
    ((VANISHING_POINT.x - startX) * (y - TOP)) / (VANISHING_POINT.y - TOP)
  )
}

function Line({ x1, y1, x2, y2 }: Record<"x1" | "y1" | "x2" | "y2", number>) {
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

            {HIGHLIGHTS.map((points) => (
              <polyline
                key={points}
                points={points}
                vectorEffect="non-scaling-stroke"
                className="stroke-grid-highlight"
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}

export { GridBackground }
