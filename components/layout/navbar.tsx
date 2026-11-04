"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "cn"

import { BrandLogo } from "@/components/layout/brand-logo"
import { CornerFrame } from "@/components/shared/corner-frame"
import { Button } from "@/components/ui/button"
import type { LinkItem } from "@/lib/types"

type NavbarProps = {
  brandName: string
  links: LinkItem[]
  secondaryAction?: LinkItem
  primaryAction?: LinkItem
  className?: string
}

function NavActions({
  secondaryAction,
  primaryAction,
  className,
}: Pick<NavbarProps, "secondaryAction" | "primaryAction" | "className">) {
  return (
    <div className={cn("gap-3", className)}>
      {secondaryAction && (
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href={secondaryAction.href} />}
        >
          {secondaryAction.label}
        </Button>
      )}
      {primaryAction && (
        <Button nativeButton={false} render={<Link href={primaryAction.href} />}>
          {primaryAction.label}
        </Button>
      )}
    </div>
  )
}

function Navbar({
  brandName,
  links,
  secondaryAction,
  primaryAction,
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header data-slot="navbar" className={cn("site-container", className)}>
      <div className="flex min-h-[34px] items-center justify-between gap-4">
        <BrandLogo name={brandName} />

        <CornerFrame
          cornerSize={4.5}
          offset={2}
          className="hidden lg:ml-auto lg:block xl:ml-[204px]"
        >
          <nav
            aria-label="Main"
            className="flex h-[31px] items-center gap-[47.3px] bg-secondary px-[54.7px] pt-0.5"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </CornerFrame>

        <NavActions
          secondaryAction={secondaryAction}
          primaryAction={primaryAction}
          className="hidden lg:ml-auto lg:flex"
        />

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
          className="p-1 lg:hidden"
        >
          {isOpen ? (
            <X aria-hidden className="size-6" />
          ) : (
            <Menu aria-hidden className="size-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="mt-4 border border-border-strong bg-card p-4 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-sm text-foreground/80 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <NavActions
            secondaryAction={secondaryAction}
            primaryAction={primaryAction}
            className="mt-3 flex flex-col [&>*]:w-full"
          />
        </div>
      )}
    </header>
  )
}

export { Navbar }
