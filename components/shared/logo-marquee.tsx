import type { ReactNode } from "react"
import { cn } from "cn"

import { CrossMark } from "@/components/shared/corner-frame"

type MarqueeLogo = {
  name: string
  /** Logo artwork. Falls back to the name as text. */
  logo?: ReactNode
}

type LogoMarqueeProps = {
  label: ReactNode
  logos: MarqueeLogo[]
  className?: string
}

function LogoRow({ logos, hidden }: { logos: MarqueeLogo[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-14 pr-14 text-foreground/45"
    >
      {logos.map(({ name, logo }) => (
        <li
          key={name}
          className="whitespace-nowrap text-sm font-medium"
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
      className={cn("border-y border-track bg-card", className)}
    >
      <div className="site-container">
        <div className="relative flex h-[68px] border-x border-track">
          <CrossMark className="-top-1.5 -left-1.5" />
          <CrossMark className="-bottom-1.5 -left-1.5" />
          <CrossMark className="-top-1.5 -right-1.5" />
          <CrossMark className="-right-1.5 -bottom-1.5" />

          <div className="relative flex w-24 shrink-0 items-center border-r border-track px-3 text-xs leading-[15px] sm:w-[175px] sm:px-7">
            {label}
            <CrossMark className="-top-1.5 -right-1.5" />
            <CrossMark className="-right-1.5 -bottom-1.5" />
          </div>

          <div className="flex min-w-0 flex-1 overflow-hidden mask-x-from-90% mask-x-to-100%">
            <div className="flex w-max animate-marquee motion-reduce:animate-none">
              <LogoRow logos={logos} />
              <LogoRow logos={logos} hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { LogoMarquee }
export type { MarqueeLogo }
