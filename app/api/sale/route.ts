import { connection } from "next/server"

import { getSale } from "@/lib/mock-sale"

const SIMULATED_LATENCY_MS = 400

export async function GET() {
  // Keeps this handler out of the build-time prerender.
  await connection()
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  return Response.json(getSale())
}
