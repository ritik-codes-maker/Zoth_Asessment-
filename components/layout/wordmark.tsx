import { cn } from "cn"

type WordmarkProps = {
  text: string
  /** How many leading letters are shown in the accent colour. */
  accentLetters?: number
  className?: string
}

function Wordmark({ text, accentLetters = 1, className }: WordmarkProps) {
  return (
    <div
      aria-hidden
      data-slot="wordmark"
      className={cn(
        "flex h-[0.78em] justify-center overflow-hidden text-[min(26vw,348px)] leading-none font-bold tracking-[-0.02em] whitespace-nowrap text-wordmark select-none",
        className
      )}
    >
      <span>
        <span className="text-primary">{text.slice(0, accentLetters)}</span>
        {text.slice(accentLetters)}
      </span>
    </div>
  )
}

export { Wordmark }
