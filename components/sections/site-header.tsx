"use client"

import Link from "next/link"

import { Navbar } from "@/components/layout/navbar"
import { useSaleFlow } from "@/components/providers/sale-flow-provider"
import { AccountMenu, SecondaryMenu } from "@/components/sections/nav-menus"
import { Button } from "@/components/ui/button"
import { BRAND_NAME, NAV_LINKS } from "@/lib/content"

function SiteHeader() {
  const { step, goTo } = useSaleFlow()
  const isConnected = step !== "landing"
  const isSignedIn = isConnected && step !== "connected"

  return (
    <Navbar
      brandName={BRAND_NAME}
      links={NAV_LINKS}
      actions={
        <>
          {isSignedIn ? (
            <SecondaryMenu />
          ) : (
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="#details" />}
            >
              Lorem ipsum
            </Button>
          )}
          {isConnected ? (
            <AccountMenu />
          ) : (
            <Button className="px-7" onClick={() => goTo("connected")}>
              Lorem ipsum
            </Button>
          )}
        </>
      }
    />
  )
}

export { SiteHeader }
