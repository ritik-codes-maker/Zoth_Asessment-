import type { ReactNode } from "react"
import { cn } from "cn"

import { TextLink } from "@/components/shared/text-link"

type InfoDetail = {
  label: ReactNode
  value: ReactNode
}

type InfoRowProps = InfoDetail & {
  icon?: ReactNode
  /** Turns the value into an underlined link. */
  href?: string
  /** Extra lines inside the same row, with no divider between them. */
  details?: InfoDetail[]
  className?: string
}

function InfoRow({
  icon,
  label,
  value,
  href,
  details,
  className,
}: InfoRowProps) {
  return (
    <dl data-slot="info-row" className={cn("py-1 text-[13px]", className)}>
      <div className="flex items-center justify-between gap-4">
        <dt className="flex min-w-0 items-center gap-2.5">
          {icon && (
            <span aria-hidden className="shrink-0 [&_svg]:size-3.5">
              {icon}
            </span>
          )}
          {label}
        </dt>
        <dd className="flex shrink-0 items-center gap-1.5 text-right tabular-nums">
          {href ? <TextLink href={href}>{value}</TextLink> : value}
        </dd>
      </div>
      {details?.map((detail, index) => (
        <div
          key={index}
          className="mt-1.5 flex items-center justify-between gap-4 pl-6"
        >
          <dt className="min-w-0">{detail.label}</dt>
          <dd className="shrink-0 text-right tabular-nums">{detail.value}</dd>
        </div>
      ))}
    </dl>
  )
}

type InfoListProps = {
  items: InfoRowProps[]
  className?: string
}

function InfoList({ items, className }: InfoListProps) {
  return (
    <div
      data-slot="info-list"
      className={cn("divide-y divide-divider", className)}
    >
      {items.map((item, index) => (
        <InfoRow key={index} {...item} />
      ))}
    </div>
  )
}

export { InfoList, InfoRow }
export type { InfoRowProps }
