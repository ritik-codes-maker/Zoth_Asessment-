"use client"

import { CountdownCard } from "@/components/shared/countdown-card"
import { Panel } from "@/components/shared/panel"
import { ProgressBar } from "@/components/shared/progress-bar"
import { ProgressStatCard } from "@/components/shared/progress-stat-card"
import { SaleValue } from "@/components/shared/sale-value"
import { StatBlock } from "@/components/shared/stat-block"
import { Button } from "@/components/ui/button"
import { useSale } from "@/hooks/use-sale"
import { formatCompactUsd, formatUsd, getPercent } from "@/lib/format"

const PLACEHOLDER_ROUND_COUNT = 2

function SaleStats() {
  const { data, isPending, isError, isFetching, refetch } = useSale()
  const raisedPercent = data ? getPercent(data.raised, data.goal) : 0

  return (
    <div data-slot="sale-stats" aria-busy={isPending}>
      {isError && !data && (
        <Panel
          variant="card"
          role="alert"
          className="mb-4 flex items-center justify-between gap-4 p-3 text-[13px]"
        >
          Couldn&apos;t load the sale data.
          <Button
            variant="outline"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            {isFetching ? "Retrying" : "Retry"}
          </Button>
        </Panel>
      )}

      <div className="flex justify-between gap-4">
        <StatBlock
          label="Demo"
          value={<SaleValue select={(sale) => formatUsd(sale.raised)} />}
        />
        <StatBlock
          label="Lorem ipsum"
          value={<SaleValue select={(sale) => formatUsd(sale.goal)} />}
          align="right"
          highlight
        />
      </div>

      <ProgressBar
        value={raisedPercent}
        label="Amount raised"
        startLabel={<SaleValue select={() => `${raisedPercent}%`} />}
        endLabel={<SaleValue select={() => "100%"} />}
        className="mt-4"
      />

      <div className="mt-6 grid gap-[7px] sm:grid-cols-2">
        {Array.from(
          { length: data?.rounds.length ?? PLACEHOLDER_ROUND_COUNT },
          (_, index) => {
            const round = data?.rounds[index]
            const percent = round ? getPercent(round.raised, round.cap) : 0

            return (
              <ProgressStatCard
                key={index}
                label={round?.name ?? "—"}
                value={<SaleValue select={() => `${percent}%`} />}
                progress={percent}
                startLabel={
                  <SaleValue
                    select={(sale) =>
                      formatCompactUsd(sale.rounds[index].raised)
                    }
                  />
                }
                endLabel={
                  <SaleValue
                    select={(sale) => formatCompactUsd(sale.rounds[index].cap)}
                  />
                }
              />
            )
          }
        )}
      </div>

      <Panel className="mt-[7px] px-3 pt-2.5 pb-[11px]">
        <StatBlock
          label="Demo"
          value={<SaleValue select={(sale) => formatUsd(sale.tokenPrice)} />}
        />
      </Panel>

      <CountdownCard
        title="Lorem ipsum dolor"
        description="Lorem ipsum dolor sit amet consectetur"
        endsAt={data?.endsAt}
        className="mt-[7px]"
      />
    </div>
  )
}

export { SaleStats }
