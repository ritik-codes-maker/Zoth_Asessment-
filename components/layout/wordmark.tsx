import { cn } from "cn"

type WordmarkProps = {
  text: string
  className?: string
}

function Wordmark({ text, className }: WordmarkProps) {
  return (
    <div
      aria-hidden
      data-slot="wordmark"
      className={cn(
        "flex h-[0.83em] justify-center overflow-hidden text-[min(27vw,361px)] leading-none font-bold tracking-[-0.02em] whitespace-nowrap text-wordmark select-none",
        className
      )}
    >
      <span>
        {[...text].map((letter, index) => (
          <span
            key={index}
            className="transition-colors duration-300 hover:text-primary motion-reduce:transition-none"
          >
            {letter}
          </span>
        ))}
      </span>
    </div>
  )
}

export { Wordmark }
