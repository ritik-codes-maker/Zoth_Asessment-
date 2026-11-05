import { SaleCard } from "@/components/sections/sale-card"
import { SaleStats } from "@/components/sections/sale-stats"
import { FrameBadge } from "@/components/shared/frame-badge"

function HeroSection() {
  return (
    <section
      id="sale"
      data-slot="hero-section"
      className="site-container mt-10 grid gap-10 pb-16 lg:mt-[45px] lg:grid-cols-[48.6%_1fr] lg:gap-0 lg:pb-[85px]"
    >
      <div className="min-w-0 lg:border-r lg:border-border-strong lg:pt-[7px] lg:pr-6">
        <FrameBadge>Lorem ipsum</FrameBadge>
        <h1 className="mt-5 text-[40px] leading-[1.1] tracking-[-0.02em] sm:text-[48px]">
          Lorem ipsum dolor
        </h1>
        <p className="mt-3 text-[15.5px] leading-[21px] text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
          tempor incididunt ut labore et
        </p>
        <div className="mt-7">
          <SaleStats />
        </div>
      </div>

      <div className="min-w-0 lg:pt-[7px] lg:pl-[26px]">
        <SaleCard />
      </div>
    </section>
  )
}

export { HeroSection }
