import { cn } from "cn"

import {
  DiscordIcon,
  LinkedinIcon,
  MediumIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/shared/social-icons"

const PLATFORMS = {
  x: { label: "X", Icon: XIcon, iconClass: "mr-px size-3.5" },
  youtube: { label: "YouTube", Icon: YoutubeIcon, iconClass: "size-4" },
  discord: { label: "Discord", Icon: DiscordIcon, iconClass: "size-4" },
  linkedin: { label: "LinkedIn", Icon: LinkedinIcon, iconClass: "size-4" },
  medium: { label: "Medium", Icon: MediumIcon, iconClass: "size-4" },
}

type SocialLink = {
  platform: keyof typeof PLATFORMS
  href: string
}

type SocialLinksProps = {
  links: SocialLink[]
  className?: string
}

function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <ul
      data-slot="social-links"
      className={cn("flex items-center gap-3.5", className)}
    >
      {links.map(({ platform, href }) => {
        const { label, Icon, iconClass } = PLATFORMS[platform]

        return (
          <li key={platform}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="block text-foreground/50 transition-colors hover:text-foreground/85"
            >
              <Icon className={iconClass} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export { SocialLinks }
export type { SocialLink }
