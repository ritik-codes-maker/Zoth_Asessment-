"use client"

import {
  BlocksIcon,
  CalendarClockIcon,
  DocumentsIcon,
  DollarCoinIcon,
  HandCoinIcon,
  RingsIcon,
} from "@/components/shared/info-icons"
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
      className="site-container mt-16 grid gap-12 lg:mt-[85px] lg:grid-cols-[34.4%_56.9%] lg:justify-between"
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
            { icon: <BlocksIcon />, label: "Demo", value: "DEMO" },
            {
              icon: <HandCoinIcon />,
              label: "Lorem ipsum",
              value: (
                <>
                  <DollarCoinIcon className="size-3" />
                  DEMO
                </>
              ),
            },
            {
              icon: <DocumentsIcon />,
              label: "Lorem ipsum",
              value: (
                <SaleValue select={(sale) => formatNumber(sale.totalSupply)} />
              ),
            },
            {
              icon: <RingsIcon />,
              label: "Demo",
              value: (
                <SaleValue select={(sale) => formatUsd(sale.minContribution)} />
              ),
              details: [{ label: "Demo", value: "Lorem ipsum" }],
            },
            {
              icon: <CalendarClockIcon />,
              label: "Lorem ipsum",
              value: "Demo",
              href: "#details",
              className: "pt-2",
            },
          ]}
        />
      </div>
    </section>
  )
}

export { DetailsSection }
