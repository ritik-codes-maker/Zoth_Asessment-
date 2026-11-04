"use client"

import {
  CalendarClock,
  Coins,
  Disc3,
  Layers,
  Shapes,
  Target,
} from "lucide-react"

import { InfoList } from "@/components/shared/info-list"
import { LinkListCard } from "@/components/shared/link-list-card"
import { SaleValue } from "@/components/shared/sale-value"
import { Stepper } from "@/components/shared/stepper"
import { useSale } from "@/hooks/use-sale"
import { RESOURCE_LINKS } from "@/lib/content"
import { formatNumber, formatUsd } from "@/lib/format"

function DetailsSection() {
  const { data } = useSale()

  return (
    <section
      id="details"
      data-slot="details-section"
      className="site-container mt-16 grid gap-12 lg:mt-[85px] lg:grid-cols-[372px_minmax(0,615px)] lg:justify-between"
    >
      <div>
        <h2 className="text-4xl leading-tight tracking-[-0.01em]">
          Lorem ipsum
        </h2>
        <p className="mt-3 max-w-[330px] text-[17px] leading-[23px] text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
          tempor
        </p>
        <LinkListCard
          title="Lorem ipsum dolor"
          items={RESOURCE_LINKS}
          className="mt-10"
        />
      </div>

      <div>
        <Stepper
          currentStep={data?.currentStep ?? 0}
          steps={[
            {
              eyebrow: "Demo",
              title: "Lorem ipsum",
              description: <SaleValue select={(sale) => sale.stage} />,
            },
            { eyebrow: "Demo", title: "DEMO", description: "Lorem ipsum" },
            { eyebrow: "Demo", title: "Demo", description: "Lorem ipsum" },
            { eyebrow: "Demo", title: "DEMO", description: "Lorem ipsum" },
          ]}
        />
        <InfoList
          className="mt-[54px]"
          items={[
            { icon: <Shapes />, label: "Demo", value: "DEMO" },
            {
              icon: <Coins />,
              label: "Lorem ipsum",
              value: (
                <>
                  <Disc3 aria-hidden className="size-3.5" />
                  DEMO
                </>
              ),
            },
            {
              icon: <Layers />,
              label: "Lorem ipsum",
              value: (
                <SaleValue select={(sale) => formatNumber(sale.totalSupply)} />
              ),
            },
            {
              icon: <Target />,
              label: "Demo",
              value: (
                <SaleValue select={(sale) => formatUsd(sale.minContribution)} />
              ),
              details: [{ label: "Demo", value: "Lorem ipsum" }],
            },
            {
              icon: <CalendarClock />,
              label: "Lorem ipsum",
              value: "Demo",
              href: "#details",
            },
          ]}
        />
      </div>
    </section>
  )
}

export { DetailsSection }
