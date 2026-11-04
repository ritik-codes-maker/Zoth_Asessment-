import { cn } from "cn"

import { Panel } from "@/components/shared/panel"
import { TextLink } from "@/components/shared/text-link"

type LinkListItem = {
  label: string
  linkLabel: string
  href: string
}

type LinkListCardProps = {
  title: string
  items: LinkListItem[]
  className?: string
}

function LinkListCard({ title, items, className }: LinkListCardProps) {
  return (
    <Panel
      variant="glow"
      data-slot="link-list-card"
      className={cn("px-7 py-5", className)}
    >
      <h3 className="text-sm">{title}</h3>
      <ul className="mt-6 space-y-6 text-[11px]">
        {items.map((item) => (
          <li
            key={`${item.label}-${item.href}`}
            className="flex items-center justify-between gap-4"
          >
            <span>{item.label}</span>
            <TextLink href={item.href} className="text-[13px] text-foreground/70">
              {item.linkLabel}
            </TextLink>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export { LinkListCard }
export type { LinkListItem }
