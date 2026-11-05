import type { ReactNode } from "react"
import { cn } from "cn"

type MarqueeLogo = {
  name: string
  /** Logo artwork. Falls back to the name as text. */
  logo?: ReactNode
  /** Space before the next logo, in px. */
  spacing?: number
}

const DEFAULT_LOGO_SPACING = 70

type LogoMarqueeProps = {
  label: ReactNode
  logos: MarqueeLogo[]
  className?: string
}

type BandMarkProps = {
  /** Whether the stem runs both ways, or only into the band from its edge. */
  shape: "plus" | "tee-down" | "tee-up"
  className?: string
}

const STEMS = {
  plus: "inset-y-0",
  "tee-down": "top-1 bottom-0",
  "tee-up": "top-0 bottom-1",
}

// An 11px mark, positioned so that it is centred on where two 1px lines cross.
function BandMark({ shape, className }: BandMarkProps) {
  return (
    <span
      aria-hidden
      data-slot="band-mark"
      className={cn("pointer-events-none absolute z-10 size-[11px]", className)}
    >
      <span className="absolute inset-x-0 top-1 h-[3px] bg-band-mark" />
      <span className={cn("absolute left-1 w-[3px] bg-band-mark", STEMS[shape])} />
    </span>
  )
}

function BandLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("absolute -inset-y-px w-px bg-band-line", className)}
    />
  )
}

function LogoRow({ logos, hidden }: { logos: MarqueeLogo[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center text-logo"
    >
      {logos.map(({ name, logo, spacing = DEFAULT_LOGO_SPACING }) => (
        <li
          key={name}
          className="whitespace-nowrap text-sm font-medium"
          style={{ marginRight: spacing }}
        >
          {logo ?? name}
        </li>
      ))}
    </ul>
  )
}

function LogoMarquee({ label, logos, className }: LogoMarqueeProps) {
  return (
    <section
      data-slot="logo-marquee"
      className={cn("border-y border-band-line bg-band", className)}
    >
      <div className="site-container">
        <div className="relative flex h-[66px] xl:mr-[5px]">
          <BandLine className="left-0" />
          <BandMark shape="plus" className="-top-1.5 -left-[5px]" />
          <BandMark shape="tee-up" className="-bottom-1.5 -left-[5px]" />

          <div className="relative flex w-24 shrink-0 items-center px-3 pt-0.5 text-[11px] leading-[15px] sm:w-[175px] sm:px-7">
            {label}
            <BandLine className="right-0" />
            <BandMark shape="tee-down" className="-top-1.5 -right-[5px]" />
            <BandMark shape="tee-up" className="-right-[5px] -bottom-1.5" />
          </div>

          <div className="flex min-w-0 flex-1 overflow-hidden pl-[19px] [mask-image:linear-gradient(to_right,transparent,rgb(0_0_0/0.35)_2%,rgb(0_0_0/0.4)_4.7%,black_7.3%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee motion-reduce:animate-none">
              <LogoRow logos={logos} />
              <LogoRow logos={logos} hidden />
            </div>
          </div>

          <BandLine className="right-0" />
          <BandMark shape="plus" className="-top-1.5 -right-[5px]" />
          <BandMark shape="tee-up" className="-right-[5px] -bottom-1.5" />
        </div>
      </div>
    </section>
  )
}

export { LogoMarquee }
export type { MarqueeLogo }
