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

// TAISU is traced from the Figma screenshot, so it is a stand-in for a real
// export. Replacing a file in public/logos keeps its place in the row.
const PARTNER_LOGOS: MarqueeLogo[] = [
  {
    name: "Borderless",
    spacing: 73,
    logo: (
      <LogoImage
        src="/logos/borderless.png"
        name="Borderless"
        width={300}
        height={78}
        displayWidth={75}
      />
    ),
  },
  {
    name: "TAISU",
    spacing: 68.5,
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
    spacing: 69,
    logo: (
      <LogoImage
        src="/logos/blockchain-founders-fund.png"
        name="Blockchain Founders Fund"
        width={328}
        height={71}
        displayWidth={82}
      />
    ),
  },
  {
    name: "Chainlink",
    spacing: 76,
    logo: (
      <LogoImage
        src="/logos/chainlink.png"
        name="Chainlink"
        width={268}
        height={68}
        displayWidth={67}
      />
    ),
  },
  {
    name: "Coinbase",
    spacing: 70,
    logo: (
      <LogoImage
        src="/logos/coinbase.png"
        name="Coinbase"
        width={251}
        height={45}
        displayWidth={63}
      />
    ),
  },
  { name: "Mindfulness Capital", logo: <MindfulnessLogo />, spacing: 60 },
  { name: "Partner", logo: <SpheraLogo /> },
]

export { PARTNER_LOGOS }
