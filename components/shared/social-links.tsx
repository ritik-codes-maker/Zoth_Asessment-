import { cn } from "cn"

import {
  DiscordIcon,
  LinkedinIcon,
  MediumIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/shared/social-icons"

const PLATFORMS = {
  x: { label: "X", Icon: XIcon },
  youtube: { label: "YouTube", Icon: YoutubeIcon },
  discord: { label: "Discord", Icon: DiscordIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedinIcon },
  medium: { label: "Medium", Icon: MediumIcon },
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
      className={cn("flex items-center gap-3", className)}
    >
      {links.map(({ platform, href }) => {
        const { label, Icon } = PLATFORMS[platform]

        return (
          <li key={platform}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="block text-foreground/75 transition-colors hover:text-primary"
            >
              <Icon className="size-3.5" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export { SocialLinks }
export type { SocialLink }
