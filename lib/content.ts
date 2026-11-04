import type { FooterColumn } from "@/components/layout/footer"
import type { MarqueeLogo } from "@/components/shared/logo-marquee"
import type { LinkListItem } from "@/components/shared/link-list-card"
import type { SocialLink } from "@/components/shared/social-links"
import type { LinkItem } from "@/lib/types"

// Placeholder copy from the Figma. The sale figures come from /api/sale instead.

const BRAND_NAME = "Demo"

const NAV_LINKS: LinkItem[] = [
  { label: "Demo", href: "#sale" },
  { label: "Demo", href: "#partners" },
  { label: "Demo", href: "#details" },
  { label: "Demo", href: "#footer" },
]

const PARTNER_LOGOS: MarqueeLogo[] = [
  { name: "Borderless" },
  { name: "TAISU" },
  { name: "Blockchain" },
  { name: "Chainlink" },
  { name: "coinbase" },
  { name: "Mindfulness" },
  { name: "Partner" },
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
  BRAND_NAME,
  FOOTER_COLUMNS,
  LEGAL_TEXT,
  NAV_LINKS,
  PARTNER_LOGOS,
  RESOURCE_LINKS,
  SOCIAL_LINKS,
}
