import Link from "next/link"
import { cn } from "cn"

type BrandLogoProps = {
  name: string
  href?: string
  className?: string
}

function BrandLogo({ name, href = "/", className }: BrandLogoProps) {
  return (
    <Link
      href={href}
      data-slot="brand-logo"
      className={cn("inline-flex items-center gap-2 text-xl font-medium", className)}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-6">
        <circle cx="12" cy="12" r="12" fill="white" />
        <path
          fill="black"
          d="M10.6 11.2 6 5.6a8.3 8.3 0 0 1 5.8-1.9l.6 6.5a2.4 2.4 0 0 0-1.8 1Zm3.2-1 2.7-6a8.3 8.3 0 0 1 4.3 4.5l-6 2.3a2.4 2.4 0 0 0-1-.8Zm.5 3.2 6.5 1a8.3 8.3 0 0 1-3.4 5l-3.8-5.1c.3-.3.6-.6.7-.9Zm-3.2 1.5-1.2 6.4a8.3 8.3 0 0 1-5.5-3.2l5.2-3.9c.4.3.9.6 1.5.7Zm-2.7-2.6-6.5.4a8.3 8.3 0 0 1 1.6-6l5.3 3.9c-.3.5-.4 1-.4 1.7Z"
        />
      </svg>
      {name}
    </Link>
  )
}

export { BrandLogo }
