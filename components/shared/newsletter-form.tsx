"use client"

import { useState, type FormEvent } from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type NewsletterFormProps = {
  placeholder: string
  buttonLabel: string
  successMessage?: string
  onSubmit?: (email: string) => void
  className?: string
}

function NewsletterForm({
  placeholder,
  buttonLabel,
  successMessage,
  onSubmit,
  className,
}: NewsletterFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    onSubmit?.(String(new FormData(form).get("email")))
    form.reset()
    setIsSubmitted(true)
  }

  return (
    <div data-slot="newsletter-form" className={cn("w-full max-w-[270px]", className)}>
      <form onSubmit={handleSubmit} className="flex">
        <Input
          type="email"
          name="email"
          required
          aria-label={placeholder}
          placeholder={placeholder}
          onChange={() => setIsSubmitted(false)}
          className="h-[39px] flex-1 border-transparent bg-input px-3 text-[11px] md:text-[11px]"
        />
        <Button
          type="submit"
          className="h-[39px] w-[97px] shrink-0 px-0 text-[9px] font-bold tracking-[0.2em] uppercase"
        >
          {buttonLabel}
        </Button>
      </form>
      {isSubmitted && successMessage && (
        <p role="status" className="mt-2 text-[11px] text-foreground/75">
          {successMessage}
        </p>
      )}
    </div>
  )
}

export { NewsletterForm }
