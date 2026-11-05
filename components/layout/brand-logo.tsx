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
      <svg viewBox="10 8.5 40 40" aria-hidden className="size-6">
        <circle cx="30" cy="28.5" r="20" fill="#FFFFFF" />
        <g
          fill="#000000"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinejoin="round"
          transform="translate(-1.5 2.5)"
        >
          <path d="M28 15 L26 15 L28 23 L25 26 L19 27 L19 29 L20 30 L23 29 L27 27 L30 21 L29 19 L29 16 Z" />
          <path d="M35 15 L34 16 L33 21 L36 27 L39 28 L43 30 L44 29 L44 27 L38 26 L35 23 L35 21 L37 17 L37 15 Z" />
          <path d="M23 35 L24 37 L26 36 L31 31 L34 32 L39 37 L40 36 L40 35 L35 30 L28 30 Z" />
        </g>
      </svg>
      {name}
    </Link>
  )
}

export { BrandLogo }
