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
    <dl
      data-slot="info-row"
      className={cn(
        "text-xs leading-[19.5px]",
        details?.length ? "py-2" : "py-1",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <dt className="flex min-w-0 items-center gap-[9.8px]">
          {icon && (
            <span aria-hidden className="shrink-0 [&_svg]:size-[11.5px]">
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
          className="mt-1.5 flex items-center justify-between gap-4 pl-[21.3px]"
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
