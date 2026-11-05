"use client"

import { useState, type ReactNode } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "cn"

import { BrandLogo } from "@/components/layout/brand-logo"
import { CornerFrame } from "@/components/shared/corner-frame"
import type { LinkItem } from "@/lib/types"

type NavbarProps = {
  brandName: string
  links: LinkItem[]
  /** The buttons on the right, and at the bottom of the mobile menu. */
  actions?: ReactNode
  className?: string
}

function Navbar({
  brandName,
  links,
  actions,
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header data-slot="navbar" className={cn("site-container", className)}>
      <div className="flex min-h-[34px] items-center justify-between gap-4">
        <BrandLogo name={brandName} />

        <CornerFrame
          cornerSize={4.5}
          offset={1.5}
          className="hidden lg:ml-[88px] lg:block"
        >
          <nav
            aria-label="Main"
            className="flex h-[31px] items-center gap-[47.3px] bg-secondary px-[54.7px] pt-0.5"
          >
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                className="text-[10px] text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </CornerFrame>

        <div className="hidden gap-3 lg:flex">{actions}</div>

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
              <button
                key={link.href}
                type="button"
                onClick={() => setIsOpen(false)}
                className="py-2 text-left text-sm text-foreground/80 hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-3 *:w-full">{actions}</div>
        </div>
      )}
    </header>
  )
}

export { Navbar }
