"use client"

import { useState, type ReactNode } from "react"
import { Check, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react"
import { cn } from "cn"

import { useSaleFlow } from "@/components/providers/sale-flow-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ACCOUNT_ADDRESS, ACCOUNT_LABEL, EXPLORER_URL } from "@/lib/content"

const COPIED_RESET_MS = 1500

const MENU_CLASS =
  "w-[186px] rounded-none bg-card p-0 shadow-[0_0_38px_rgba(255,69,9,0.3)] ring-1 ring-border-bright divide-y divide-border"

const ITEM_CLASS =
  "min-h-[35.5px] rounded-none px-[13px] py-0 text-[10px] focus:bg-secondary"

const DANGER_ITEM_CLASS =
  "text-primary focus:text-primary not-data-[variant=destructive]:focus:**:text-primary"

const TRIGGER_CLASS =
  "data-popup-open:[&_svg]:rotate-180 [&_svg]:transition-transform"

function MenuHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[26px] items-center gap-1.5 px-[13px] pt-1 text-[7.5px] tracking-[0.08em] text-foreground/75 uppercase">
      {children}
    </div>
  )
}

/** The menu for the signed-in visitor. Its options change once they're verified. */
function SecondaryMenu() {
  const { isVerified, goTo } = useSaleFlow()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "gap-[5px]",
              isVerified ? "pr-[23px] pl-6" : "pr-[13px] pl-4",
              TRIGGER_CLASS
            )}
          />
        }
      >
        Lorem ipsum
        <ChevronDown aria-hidden className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={56} sideOffset={7} className={MENU_CLASS}>
        {isVerified ? (
          <>
            <DropdownMenuItem className={ITEM_CLASS} onClick={() => goTo("plans")}>
              <span className="text-foreground/65">Lorem ipsum</span> Demo
            </DropdownMenuItem>
            <DropdownMenuItem className={ITEM_CLASS} onClick={() => goTo("positions")}>
              <span className="text-foreground/65">Demo</span> Lorem ipsum
            </DropdownMenuItem>
            <DropdownMenuItem className={ITEM_CLASS} onClick={() => goTo("signedIn")}>
              Lorem ipsum
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <MenuHeading>Lorem ipsum</MenuHeading>
            <DropdownMenuItem
              className={cn(ITEM_CLASS, "min-h-[38px] flex-col items-start justify-center gap-0")}
              onClick={() => goTo("signedIn")}
            >
              Demo
              <span className="text-[7.5px] leading-[10px] text-primary">Lorem ipsum</span>
            </DropdownMenuItem>
            <DropdownMenuItem className={ITEM_CLASS} onClick={() => goTo("verify")}>
              Lorem ipsum
            </DropdownMenuItem>
            <DropdownMenuItem className={ITEM_CLASS} onClick={() => goTo("plans")}>
              Lorem ipsum
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem
          className={cn(ITEM_CLASS, DANGER_ITEM_CLASS)}
          onClick={() => goTo("connected")}
        >
          Lorem ipsum
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AccountMenu() {
  const { goTo } = useSaleFlow()
  const [hasCopied, setHasCopied] = useState(false)

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(ACCOUNT_ADDRESS)
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), COPIED_RESET_MS)
    } catch {
      setHasCopied(false)
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Account menu"
            className={cn("gap-[5.5px] pr-[14.5px] pl-[15px] text-[10px]", TRIGGER_CLASS)}
          />
        }
      >
        {ACCOUNT_LABEL}
        <ChevronDown aria-hidden className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className={MENU_CLASS}>
        <div>
          <MenuHeading>
            <span aria-hidden className="size-[3px] rounded-full bg-primary" />
            DEMO
          </MenuHeading>
          <DropdownMenuItem
            className={cn(ITEM_CLASS, "justify-between")}
            closeOnClick={false}
            onClick={copyAddress}
            aria-label={hasCopied ? "Address copied" : "Copy address"}
          >
            {ACCOUNT_LABEL}
            {hasCopied ? (
              <Check aria-hidden className="size-3 text-primary" />
            ) : (
              <Copy aria-hidden className="size-3" />
            )}
          </DropdownMenuItem>
        </div>
        <DropdownMenuItem
          className={cn(ITEM_CLASS, "gap-2 text-foreground/85")}
          render={<a href={EXPLORER_URL} target="_blank" rel="noreferrer" />}
        >
          <ExternalLink aria-hidden className="size-3.5" />
          Lorem ipsum
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(ITEM_CLASS, DANGER_ITEM_CLASS, "gap-2")}
          onClick={() => goTo("landing")}
        >
          <LogOut aria-hidden className="size-3.5 rotate-180" />
          Lorem ipsum
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { AccountMenu, SecondaryMenu }
