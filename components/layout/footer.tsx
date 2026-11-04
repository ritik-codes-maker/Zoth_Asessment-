import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "cn"

import { NewsletterForm } from "@/components/shared/newsletter-form"
import { SocialLinks, type SocialLink } from "@/components/shared/social-links"
import type { LinkItem } from "@/lib/types"

type FooterColumn = {
  title: string
  links: LinkItem[]
}

type FooterProps = {
  description: string
  socialLinks: SocialLink[]
  newsletter: {
    placeholder: string
    buttonLabel: string
    successMessage?: string
  }
  columns: FooterColumn[]
  legal: ReactNode
  meta?: ReactNode
  className?: string
}

function Footer({
  description,
  socialLinks,
  newsletter,
  columns,
  legal,
  meta,
  className,
}: FooterProps) {
  return (
    <footer data-slot="footer" className={cn("site-container", className)}>
      <div className="flex flex-col gap-10 md:flex-row md:justify-between lg:px-7">
        <div>
          <p className="max-w-[210px] text-[11px] leading-4 text-foreground/60">
            {description}
          </p>
          <SocialLinks links={socialLinks} className="mt-3" />
          <NewsletterForm {...newsletter} className="mt-8" />
        </div>

        <div className="flex gap-16 sm:gap-40 lg:gap-[212px]">
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm uppercase">{column.title}</h3>
              <ul className="mt-4 space-y-1.5 text-[13px]">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-foreground/60 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:px-7">
        <p className="max-w-[460px] text-[10px] leading-4 text-foreground/80">
          {legal}
        </p>
        {meta && <p className="text-[10px] text-foreground/80">{meta}</p>}
      </div>
    </footer>
  )
}

export { Footer }
export type { FooterColumn }
