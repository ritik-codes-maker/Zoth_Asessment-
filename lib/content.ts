import type { FooterColumn } from "@/components/layout/footer"
import type { LinkListItem } from "@/components/shared/link-list-card"
import type { SocialLink } from "@/components/shared/social-links"
import type { LinkItem } from "@/lib/types"

// Placeholder copy from the Figma. The sale figures come from /api/sale instead.

const BRAND_NAME = "Demo"

const ACCOUNT_LABEL = "[XX]"
const ACCOUNT_ADDRESS = "0x0000000000000000000000000000000000000000"
const EXPLORER_URL = `https://basescan.org/address/${ACCOUNT_ADDRESS}`

const NAV_LINKS: LinkItem[] = [
  { label: "Demo", href: "#sale" },
  { label: "Demo", href: "#partners" },
  { label: "Demo", href: "#details" },
  { label: "Demo", href: "#footer" },
]

const RESOURCE_LINKS: LinkListItem[] = [
  { label: "Lorem ipsum", linkLabel: "Demo", href: "#resource-1" },
  { label: "Lorem ipsum", linkLabel: "Demo", href: "#resource-2" },
  { label: "Lorem ipsum", linkLabel: "Demo", href: "#resource-3" },
]

const SOCIAL_LINKS: SocialLink[] = [
  { platform: "x", href: "https://x.com" },
  { platform: "youtube", href: "https://youtube.com" },
  { platform: "discord", href: "https://discord.com" },
  { platform: "linkedin", href: "https://linkedin.com" },
  { platform: "medium", href: "https://medium.com" },
]

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Demo",
    links: [
      { label: "Demo", href: "#footer-1" },
      { label: "Demo", href: "#footer-2" },
    ],
  },
  {
    title: "Demo",
    links: [
      { label: "Lorem ipsum", href: "#footer-3" },
      { label: "Lorem ipsum", href: "#footer-4" },
      { label: "Lorem ipsum", href: "#footer-5" },
    ],
  },
]

const LEGAL_TEXT =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"

export {
  ACCOUNT_ADDRESS,
  ACCOUNT_LABEL,
  BRAND_NAME,
  EXPLORER_URL,
  FOOTER_COLUMNS,
  LEGAL_TEXT,
  NAV_LINKS,
  RESOURCE_LINKS,
  SOCIAL_LINKS,
}
