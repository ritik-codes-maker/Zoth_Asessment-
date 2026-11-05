import type { ComponentProps } from "react"

type IconProps = ComponentProps<"svg">

// Traced from the Figma, as no icon library has these exact shapes.
function LineIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.46"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  )
}

function BlocksIcon(props: IconProps) {
  return (
    <LineIcon viewBox="-.8 -.8 17.6 17.6" strokeWidth="1.6" {...props}>
      <path d="M.8 4.5c0-.5.4-.9.9-.9h3.7c.5 0 .9.4.9.9v4.9h4.9c.5 0 .9.4.9.9v4c0 .5-.4.9-.9.9H1.7c-.5 0-.9-.4-.9-.9z" />
      <path d="M.8 9.4h5.5v5.8" />
      <rect x="9" y=".8" width="6.2" height="6.4" rx=".9" />
    </LineIcon>
  )
}

function HandCoinIcon(props: IconProps) {
  return (
    <LineIcon viewBox="12.5 8.5 62.5 62.5" strokeWidth="5.7" {...props}>
      <circle cx="27.4" cy="20.2" r="8.4" />
      <circle cx="55.5" cy="31.4" r="8.3" />
      <path d="M16.2 51.4 32.2 67.9" />
      <path d="M21.9 50.4 35.8 37.5C36.4 37 37 36.9 38 36.9H47" />
      <path d="M62 34.7H68C72.2 34.7 74 39 71.8 41.9L56 58.2C54.8 59.5 53.6 60 52 60H37.8C35.4 60 33.6 61 32 63.2" />
      <path d="M41 48.5H49.5L62 37M52 38V47" />
    </LineIcon>
  )
}

function DocumentsIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M7.1 2.1C7.1 1.4 7.6.8 8.3.8h3.9l3.2 3.3v4.5c0 .7-.5 1.2-1.2 1.2H8.3c-.7 0-1.2-.5-1.2-1.2z" />
      <path d="M12 .9v2c0 .7.5 1.2 1.2 1.2h2.1" />
      <path d="M4 4.2v6.9c0 .8.6 1.4 1.4 1.4h6.2" />
      <path d="M.9 7.2v6.4c0 .9.7 1.6 1.6 1.6h6.4" />
    </LineIcon>
  )
}

function RingsIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="8" cy="8" r="7.2" />
      <circle cx="8" cy="8" r="4.6" />
      <circle cx="8" cy="8" r="2" />
    </LineIcon>
  )
}

function CalendarClockIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M5.8 15.3H3.1C1.8 15.3.8 14.3.8 13V4.3C.8 3 1.8 2 3.1 2h9.4c1.3 0 2.3 1 2.3 2.3v3" />
      <path d="M.9 5.5h13.8" />
      <path d="M4.3.7v2.8M10.5.7v2.8" />
      <circle cx="10.6" cy="11" r="4.4" />
      <path d="M10.6 8.9V11l1.4 1" />
    </LineIcon>
  )
}

function DollarCoinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <g
        stroke="var(--background)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.9 2.9a5.5 5.5 0 0 0 0 10.2M10.1 2.9a5.5 5.5 0 0 1 0 10.2" />
        <path d="M10 6.3c-.1-.8-.9-1.3-2-1.3-1.2 0-2 .6-2 1.5 0 2.2 4.1 1 4.1 3.2 0 .9-.9 1.5-2.1 1.5s-2.1-.6-2.1-1.4" />
        <path d="M8 3.8v8.4" />
      </g>
    </svg>
  )
}

export {
  BlocksIcon,
  CalendarClockIcon,
  DocumentsIcon,
  DollarCoinIcon,
  HandCoinIcon,
  RingsIcon,
}
