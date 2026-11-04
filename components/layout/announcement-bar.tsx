"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { cn } from "cn"

type AnnouncementBarProps = {
  message: string
  linkLabel: string
  href: string
  className?: string
}

function AnnouncementBar({
  message,
  linkLabel,
  href,
  className,
}: AnnouncementBarProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <div
      data-slot="announcement-bar"
      className={cn(
        "relative flex min-h-[35px] items-center justify-center gap-4 bg-primary px-10 py-1.5 text-xs text-primary-foreground",
        className
      )}
    >
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setIsDismissed(true)}
        className="absolute left-5 p-1 transition-opacity hover:opacity-70 sm:left-7"
      >
        <X aria-hidden className="size-3.5" />
      </button>
      <span>{message}</span>
      <Link
        href={href}
        className="inline-flex items-center gap-6 transition-opacity hover:opacity-70"
      >
        {linkLabel}
        <ArrowRight aria-hidden className="size-3.5" />
      </Link>
    </div>
  )
}

export { AnnouncementBar }
