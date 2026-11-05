const FEE_RATE = 0.01

/** What a purchase works out to. Used by the form, and again by the API. */
function getQuote(amount: number, price: number) {
  const fee = amount * FEE_RATE
  return { fee, tokens: (amount - fee) / price }
}

export { getQuote }
