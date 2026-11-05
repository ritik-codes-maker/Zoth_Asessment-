"use client"

import { useId, useState, type ReactNode } from "react"
import { ArrowDown, ChevronDown } from "lucide-react"
import { cn } from "cn"

import { useSaleFlow } from "@/components/providers/sale-flow-provider"
import { DataRows } from "@/components/shared/data-rows"
import { FramedButton } from "@/components/shared/framed-button"
import { DollarCoinIcon } from "@/components/shared/info-icons"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { usePurchase, useSale } from "@/hooks/use-sale"
import { formatNumber, formatUsd } from "@/lib/format"
import { getQuote } from "@/lib/purchase"

type SwapBoxProps = {
  label: string
  hint: string
  token: ReactNode
  children: ReactNode
}

function SwapBox({ label, hint, token, children }: SwapBoxProps) {
  return (
    <div className="border border-border bg-black/40 px-[11px] py-[11px]">
      <div className="flex items-center justify-between gap-3 text-[11px] text-foreground/75">
        {label}
        <span className="text-[9px] text-foreground/50">{hint}</span>
      </div>
      <div className="mt-1.5 flex min-h-[44px] items-center justify-between gap-3">
        {children}
        <div className="flex shrink-0 items-center gap-2 text-[11px]">{token}</div>
      </div>
    </div>
  )
}

function PurchaseStep() {
  const { planId, choosePlan, completePurchase } = useSaleFlow()
  const { data } = useSale()
  const purchase = usePurchase()
  const [rawAmount, setRawAmount] = useState("")
  const [hasAccepted, setHasAccepted] = useState(false)
  const termsId = useId()

  const plan = data?.plans.find(({ id }) => id === planId) ?? data?.plans[0]
  const balance = data?.walletBalance ?? 0
  const amount = Number(rawAmount)
  const hasAmount = amount > 0
  const isOverBalance = amount > balance
  const quote = plan && hasAmount ? getQuote(amount, plan.price) : null
  const canSubmit =
    Boolean(plan) && hasAmount && !isOverBalance && hasAccepted && !purchase.isPending

  function handleSubmit() {
    if (!plan || !canSubmit) return
    purchase.mutate(
      { planId: plan.id, amount },
      { onSuccess: completePurchase }
    )
  }

  const submitLabel = purchase.isPending
    ? "Processing"
    : isOverBalance
      ? "Insufficient balance"
      : canSubmit
        ? `Buy for ${formatUsd(amount)}`
        : "Lorem ipsum"

  return (
    <>
      <div className="flex items-center justify-between border-b border-border-strong pb-2 text-[10px]">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            aria-label="Choose a plan"
            className="flex items-center gap-1 outline-none focus-visible:text-primary data-popup-open:[&_svg]:rotate-180"
          >
            {plan?.name}
            <ChevronDown aria-hidden className="size-3 transition-transform" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={6}
            className="w-32 rounded-none bg-card p-0 ring-1 ring-border-bright"
          >
            {data?.plans.map((option) => (
              <DropdownMenuItem
                key={option.id}
                onClick={() => choosePlan(option.id)}
                className="rounded-none px-3 py-2 text-[10px] focus:bg-secondary"
              >
                {option.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-[11px] text-primary">{plan?.tag}</span>
      </div>

      <div className="relative mt-2 space-y-1">
        <SwapBox
          label="Demo"
          hint={formatUsd(balance)}
          token={
            <>
              <button
                type="button"
                onClick={() => setRawAmount(String(balance))}
                className="border border-border-strong px-2 py-px text-[9px] text-foreground/85 transition-colors hover:border-primary"
              >
                Demo
              </button>
              <DollarCoinIcon aria-hidden className="size-3.5 text-[#2775ca]" />
              DEMO
            </>
          }
        >
          <Input
            aria-label="Amount to pay"
            inputMode="decimal"
            placeholder="0"
            value={rawAmount}
            onChange={(event) => {
              const next = event.target.value
              if (/^\d*\.?\d{0,2}$/.test(next)) setRawAmount(next)
            }}
            className={cn(
              "h-auto min-w-0 flex-1 border-0 bg-transparent p-0 text-[34px] leading-[44px] tabular-nums shadow-none placeholder:text-foreground focus-visible:ring-0 md:text-[34px]",
              isOverBalance && "text-primary"
            )}
          />
        </SwapBox>

        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 z-10 flex size-[27px] -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-border-strong bg-card"
        >
          <ArrowDown className="size-3.5" />
        </span>

        <SwapBox
          label="Lorem ipsum"
          hint={plan ? formatUsd(plan.price) : ""}
          token={
            <>
              <span aria-hidden className="size-3.5 rounded-full bg-foreground" />
              Demo
            </>
          }
        >
          <output
            aria-label="Tokens you receive"
            className={cn(
              "min-w-0 truncate text-[34px] leading-[44px] tabular-nums transition-colors",
              !quote && "text-foreground/35"
            )}
          >
            {quote ? formatNumber(Math.floor(quote.tokens)) : "0"}
          </output>
        </SwapBox>
      </div>

      <DataRows
        className="mt-[11px]"
        rows={[
          { label: "Lorem ipsum", value: plan ? formatUsd(plan.price) : "—" },
          { label: "Lorem ipsum dolor", value: quote ? formatUsd(quote.fee) : "—" },
          { label: "Lorem ipsum dolor", value: formatUsd(data?.minContribution ?? 0) },
          { label: "Lorem ipsum", value: plan?.rows[0].value ?? "—" },
          { label: "Demo", value: plan?.rows[4].value ?? "—" },
          { label: "Lorem ipsum", value: plan?.rows[5].value ?? "—" },
          {
            label: "Demo",
            value: (
              <span className="flex items-center gap-[3px] text-[13px] font-bold tracking-[-0.02em]">
                <span aria-hidden className="size-[7px] bg-[#0052ff]" />
                base
              </span>
            ),
          },
        ]}
      />

      <label
        htmlFor={termsId}
        className="mt-3 flex cursor-pointer items-center gap-[7px] text-[10px] text-foreground/75"
      >
        <Checkbox
          id={termsId}
          checked={hasAccepted}
          onCheckedChange={setHasAccepted}
          className="size-[11px] rounded-none border-foreground/70 bg-transparent [&_svg]:size-2.5"
        />
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
      </label>

      <FramedButton
        frameClassName="mx-[7px] mt-[19px] mb-2"
        disabled={!canSubmit}
        onClick={handleSubmit}
        className="h-[34px] text-[10.5px]"
      >
        {submitLabel}
      </FramedButton>

      {purchase.isError && (
        <p role="alert" className="mt-3 text-center text-[11px] text-primary">
          Couldn&apos;t complete the purchase. Please try again.
        </p>
      )}
    </>
  )
}

export { PurchaseStep }
