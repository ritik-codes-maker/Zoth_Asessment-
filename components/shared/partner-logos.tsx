import Image from "next/image"

import type { MarqueeLogo } from "@/components/shared/logo-marquee"

type LogoImageProps = {
  src: string
  name: string
  width: number
  height: number
  /** Size to show the image at. Larger than this it starts to look soft. */
  displayWidth: number
}

function LogoImage({ src, name, width, height, displayWidth }: LogoImageProps) {
  return (
    <Image
      src={src}
      alt={name}
      width={width}
      height={height}
      unoptimized
      loading="eager"
      draggable={false}
      style={{ width: displayWidth, height: "auto" }}
    />
  )
}

function BorderlessLogo() {
  return (
    <span className="flex items-center gap-[3px] text-[10.5px] font-semibold tracking-[-0.01em]">
      <svg viewBox="0 0 20 17" aria-hidden className="h-[17px] w-5">
        <path fill="#7f5746" d="M0 3.5 6.5 0 20 5.5v3H9z" />
        <path fill="#694739" d="M0 3.5 9 8.5 7 17l-7-3.5z" />
        <path fill="#573a2e" d="M9 8.5h11v.5L7 17z" />
      </svg>
      Borderless
    </span>
  )
}

// Its hairline strokes fall apart as an image, so this one stays as live text.
function MindfulnessLogo() {
  return (
    <span className="flex flex-col items-end font-normal uppercase">
      <span className="text-[11.3px] leading-[14px] tracking-[0.015em]">
        Mindfulness
      </span>
      <span className="mt-0.5 text-[5px] leading-[6px] tracking-[0.5em] opacity-60">
        Capital
      </span>
    </span>
  )
}

function SpheraLogo() {
  return (
    <svg viewBox="0 0 16 16" role="img" aria-label="Partner" className="size-3.5">
      <circle cx="8" cy="8" r="8" fill="#a09898" />
      <path
        fill="#2b2626"
        d="M8 0a8 8 0 0 1 0 16c2.2 0 4-1.8 4-4s-1.8-4-4-4-4-1.8-4-4 1.8-4 4-4Z"
      />
    </svg>
  )
}

// Traced from the Figma screenshot, so these are stand-ins for real exports.
// Replacing a file in public/logos keeps its place in the row.
const PARTNER_LOGOS: MarqueeLogo[] = [
  { name: "Borderless", logo: <BorderlessLogo />, spacing: 73 },
  {
    name: "TAISU",
    spacing: 66.5,
    logo: (
      <LogoImage
        src="/logos/taisu.png"
        name="TAISU"
        width={106}
        height={24}
        displayWidth={66}
      />
    ),
  },
  {
    name: "Blockchain Founders Fund",
    spacing: 65,
    logo: (
      <LogoImage
        src="/logos/blockchain-founders-fund.png"
        name="Blockchain Founders Fund"
        width={138}
        height={40}
        displayWidth={86}
      />
    ),
  },
  {
    name: "Chainlink",
    spacing: 74,
    logo: (
      <LogoImage
        src="/logos/chainlink.png"
        name="Chainlink"
        width={113}
        height={38}
        displayWidth={70}
      />
    ),
  },
  {
    name: "Coinbase",
    spacing: 67,
    logo: (
      <LogoImage
        src="/logos/coinbase.png"
        name="Coinbase"
        width={108}
        height={24}
        displayWidth={67}
      />
    ),
  },
  { name: "Mindfulness Capital", logo: <MindfulnessLogo />, spacing: 60 },
  { name: "Partner", logo: <SpheraLogo /> },
]

export { PARTNER_LOGOS }
