import type { ReactNode } from "react"
import { cn } from "cn"

type Step = {
  title: ReactNode
  description?: ReactNode
  /** Small orange label shown above the title of the current step. */
  eyebrow?: ReactNode
}

type StepperProps = {
  steps: Step[]
  /** Zero-based index of the active step. */
  currentStep?: number
  className?: string
}

function Stepper({ steps, currentStep = 0, className }: StepperProps) {
  return (
    <ol
      data-slot="stepper"
      className={cn("grid gap-6 sm:grid-cols-4 sm:gap-0", className)}
    >
      {steps.map((step, index) => {
        const isCurrent = index === currentStep
        const isLast = index === steps.length - 1

        return (
          <li
            key={index}
            aria-current={isCurrent ? "step" : undefined}
            className="relative flex gap-3 sm:block"
          >
            {!isLast && (
              <span
                aria-hidden
                className="absolute top-3.5 -bottom-6 left-[7px] w-px bg-muted-foreground/40 sm:top-[7px] sm:right-0 sm:bottom-auto sm:left-3.5 sm:h-px sm:w-auto"
              />
            )}
            <span
              aria-hidden
              className={cn(
                "relative block size-[15px] shrink-0 rounded-full border bg-background",
                isCurrent
                  ? "border-primary border-2"
                  : "border-muted-foreground/70 bg-secondary"
              )}
            />
            <div className="sm:mt-2 sm:pr-3">
              <p className="min-h-[15px] text-[10px] leading-[15px] text-primary">
                {isCurrent && step.eyebrow}
              </p>
              <p className="mt-0.5 text-sm">{step.title}</p>
              {step.description && (
                <p className="mt-1 text-[11px] text-foreground/70">
                  {step.description}
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper }
export type { Step }
