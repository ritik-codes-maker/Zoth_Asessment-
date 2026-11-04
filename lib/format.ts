const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 3,
  minimumFractionDigits: 0,
})

const compactUsdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
})

const numberFormatter = new Intl.NumberFormat("en-US")

function formatUsd(value: number) {
  return usdFormatter.format(value)
}

function formatCompactUsd(value: number) {
  return compactUsdFormatter.format(value)
}

function formatNumber(value: number) {
  return numberFormatter.format(value)
}

function getPercent(value: number, total: number) {
  if (total <= 0) return 0
  return Math.min(Math.round((value / total) * 100), 100)
}

export { formatCompactUsd, formatNumber, formatUsd, getPercent }
