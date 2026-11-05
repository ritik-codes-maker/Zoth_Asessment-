import type { ComponentProps } from "react"
import { cn } from "cn"

const POP_CLASS =
  "origin-center animate-doodle-pop [transform-box:fill-box] motion-reduce:animate-none"

type DrawnPathProps = ComponentProps<"path"> & {
  /** When this line starts drawing itself. */
  delay: string
  /** How long the line takes to draw. */
  duration?: string
}

function DrawnPath({ delay, duration = "0.5s", className, ...props }: DrawnPathProps) {
  return (
    <path
      pathLength={1}
      className={cn("animate-doodle-draw fill-none motion-reduce:animate-none", className)}
      style={{ animationDelay: delay, animationDuration: duration }}
      {...props}
    />
  )
}

/** A hand-drawn receipt that sketches itself, then gets stamped as confirmed. */
function ReceiptDoodle() {
  return (
    <div
      aria-hidden
      data-slot="receipt-doodle"
      className="mx-auto aspect-square w-full max-w-56 overflow-hidden bg-[#141010]"
    >
      <svg
        viewBox="0 0 280 280"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-full"
      >
        <DrawnPath
          d="M70 240C95 232 115 246 140 238C165 231 185 245 210 238"
          delay="0.2s"
          duration="0.7s"
          strokeWidth={2}
          className="stroke-border-bright"
        />

        <g
          className="animate-doodle-float motion-reduce:animate-none"
          style={{ animationDelay: "1.8s" }}
        >
          {/* The paper, with its torn bottom edge. */}
          <path
            d="M94 60C120 56 160 62 186 58C188 100 184 150 187 198L175 188L163 198L151 188L139 198L127 188L115 198L103 188L92 198C95 150 90 105 94 60Z"
            className="animate-in fill-card fade-in duration-700 motion-reduce:animate-none"
          />
          <DrawnPath
            d="M94 60C120 56 160 62 186 58C188 100 184 150 187 198L175 188L163 198L151 188L139 198L127 188L115 198L103 188L92 198C95 150 90 105 94 60Z"
            delay="0s"
            duration="0.9s"
            strokeWidth={2.5}
            className="stroke-foreground"
          />

          <DrawnPath
            d="M110 116C125 113 155 119 170 115"
            delay="0.8s"
            duration="0.25s"
            strokeWidth={2.5}
            className="stroke-foreground/60"
          />
          <DrawnPath
            d="M110 134C122 131 145 137 158 133"
            delay="1s"
            duration="0.25s"
            strokeWidth={2.5}
            className="stroke-foreground/60"
          />
          <DrawnPath
            d="M110 152C118 150 130 154 140 151"
            delay="1.2s"
            duration="0.2s"
            strokeWidth={2.5}
            className="stroke-foreground/60"
          />

          <image
            href="/logos/zoth-symbol.svg"
            x={124}
            y={70}
            width={32}
            height={32}
            className={POP_CLASS}
            style={{ animationDelay: "0.7s" }}
          />

          {/* The confirmed stamp. */}
          <path
            d="M190 158C207 157 219 170 218 186C217 203 205 214 190 214C173 214 161 202 162 186C163 170 174 159 190 158Z"
            className={cn(POP_CLASS, "fill-primary")}
            style={{ animationDelay: "1.35s" }}
          />
          <DrawnPath
            d="M176 187L186 197L205 175"
            delay="1.6s"
            duration="0.3s"
            strokeWidth={4.5}
            className="stroke-white"
          />
        </g>

        {/* The tokens that were bought. */}
        <g className={POP_CLASS} style={{ animationDelay: "1.2s" }}>
          <path
            d="M60 180C71 179 77 187 76 197C75 207 68 212 59 212C49 212 43 204 44 195C45 186 51 181 60 180Z"
            strokeWidth={2.5}
            className="fill-card stroke-primary"
          />
          <path
            d="M65 191C62 187 55 188 55 192C55 198 66 195 66 201C66 205 58 206 54 202M60 185V208"
            strokeWidth={2}
            className="fill-none stroke-primary"
          />
        </g>
        <g className={POP_CLASS} style={{ animationDelay: "1.4s" }}>
          <path
            d="M226 79C235 78 240 85 239 93C238 101 232 105 225 105C217 105 212 99 213 91C214 84 219 80 226 79Z"
            strokeWidth={2.5}
            className="fill-card stroke-primary"
          />
          <path d="M226 86V98" strokeWidth={2.5} className="fill-none stroke-primary" />
        </g>

        <DrawnPath
          d="M44 150C36 140 36 126 44 116"
          delay="1.4s"
          strokeWidth={2}
          className="stroke-foreground/40"
        />
        <DrawnPath
          d="M236 130C244 140 246 152 240 164"
          delay="1.5s"
          strokeWidth={2}
          className="stroke-foreground/40"
        />
      </svg>
    </div>
  )
}

export { ReceiptDoodle }
