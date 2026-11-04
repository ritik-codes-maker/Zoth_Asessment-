"use client"

import { useSyncExternalStore } from "react"

const SECOND = 1
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function subscribeToClock(onTick: () => void) {
  const id = setInterval(onTick, 1000)
  return () => clearInterval(id)
}

function getNowInSeconds() {
  return Math.floor(Date.now() / 1000)
}

// The server has no clock to show, so the first render stays empty and the
// server and client markup match during hydration.
function getServerNow() {
  return null
}

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

function useCountdown(endsAt?: string | number | Date): CountdownParts | null {
  const now = useSyncExternalStore(
    subscribeToClock,
    getNowInSeconds,
    getServerNow
  )

  if (now === null || endsAt === undefined) return null

  const end = Math.floor(new Date(endsAt).getTime() / 1000)
  if (Number.isNaN(end)) return null

  const remaining = Math.max(end - now, 0)

  return {
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: remaining % MINUTE,
    isExpired: remaining === 0,
  }
}

export { useCountdown }
