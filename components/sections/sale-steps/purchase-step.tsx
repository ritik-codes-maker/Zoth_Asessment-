"use client"

import Image from "next/image"
import { useId, useState, type ReactNode } from "react"
import { ArrowDown, Check, ChevronDown } from "lucide-react"
import { cn } from "cn"

import { useSaleFlow } from "@/components/providers/sale-flow-provider"
import { CornerFrame } from "@/components/shared/corner-frame"
import { DataRows } from "@/components/shared/data-rows"
import { FramedButton } from "@/components/shared/framed-button"
import { DollarCoinIcon } from "@/components/shared/info-icons"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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

/** The corner-framed box showing whether a plan is the chosen one. */
function PlanIndicator({ isSelected }: { isSelected: boolean }) {
  return (
    <CornerFrame
      cornerSize={5}
      cornerClassName={isSelected ? "border-foreground" : "border-primary"}
      className="flex size-[22px] shrink-0 items-center justify-center"
    >
      {isSelected && (
        <span className="flex size-[18px] items-center justify-center bg-primary">
          <Check aria-hidden className="size-3 stroke-white stroke-[3]" />
        </span>
      )}
    </CornerFrame>
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
            sideOffset={19}
            className="w-[177px] rounded-none bg-card p-0 shadow-[0_0_38px_rgba(255,69,9,0.3)] ring-1 ring-primary"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex h-[25px] items-center border-b border-border px-[13px] py-0 text-[7.5px] font-normal tracking-[0.08em] text-foreground/75 uppercase">
                Lorem ipsum
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={plan?.id}
                onValueChange={choosePlan}
                className="divide-y divide-border"
              >
                {data?.plans.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.id}
                    value={option.id}
                    closeOnClick
                    // PlanIndicator replaces the item's built-in check mark.
                    className="min-h-[45px] justify-between gap-3 rounded-none px-[13px] py-0 focus:bg-secondary [&>[data-slot=dropdown-menu-radio-item-indicator]]:hidden"
                  >
                    <span className="min-w-0 text-[10.5px] leading-[14px]">
                      {option.name}
                      <span className="block text-[9px] leading-3 opacity-60">
                        {option.tag}
                      </span>
                    </span>
                    <PlanIndicator isSelected={option.id === plan?.id} />
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
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
              <DollarCoinIcon aria-hidden className="size-4 text-[#2775ca] [--coin-mark:white]" />
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
              <Image
                src="/logos/zoth-symbol.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
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
              <span className="flex items-baseline gap-[2px] text-[13px] font-bold tracking-[-0.02em]">
                <span aria-hidden className="size-2 shrink-0 bg-[#0052ff]" />
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
