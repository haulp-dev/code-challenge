import { useState, useEffect, useMemo, useCallback } from 'react'
import { TokenIcon } from './TokenIcon'
import { TokenSelect } from './TokenSelect'
import { fetchTokenPrices, convertAmount } from '../api/prices'
import type { TokenWithPrice } from '../types'

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function SwapForm() {
  const [tokens, setTokens] = useState<TokenWithPrice[]>([])
  const [loadingPrices, setLoadingPrices] = useState(true)
  const [priceError, setPriceError] = useState<string | null>(null)

  const [fromAmount, setFromAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoadingPrices(true)
    setPriceError(null)
    // Intentionally run once on mount: set tokens and default from/to. Do not add fromCurrency/toCurrency to deps.
    fetchTokenPrices()
      .then((list) => {
        if (cancelled) return
        setTokens(list)
        if (list.length > 0 && !fromCurrency) setFromCurrency(list[0].currency)
        if (list.length > 1 && !toCurrency) {
          const second = list.find((t) => t.currency !== list[0].currency)
          if (second) setToCurrency(second.currency)
        }
      })
      .catch(() => {
        if (!cancelled) setPriceError('Could not load token prices. Please try again.')
      })
      .finally(() => {
        if (!cancelled) setLoadingPrices(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const fromToken = useMemo(
    () => tokens.find((t) => t.currency === fromCurrency),
    [tokens, fromCurrency]
  )
  const toToken = useMemo(
    () => tokens.find((t) => t.currency === toCurrency),
    [tokens, toCurrency]
  )

  const amountNum = fromAmount === '' ? NaN : Number(fromAmount)
  const validAmount = !Number.isNaN(amountNum) && amountNum > 0

  const estimatedTo = useMemo(() => {
    if (!validAmount || !fromToken || !toToken) return null
    return convertAmount(amountNum, fromToken.price, toToken.price)
  }, [validAmount, amountNum, fromToken, toToken])

  const exchangeRate = useMemo(() => {
    if (!fromToken || !toToken || fromToken.price <= 0 || toToken.price <= 0) return null
    return fromToken.price / toToken.price
  }, [fromToken, toToken])

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    if (estimatedTo != null) {
      setFromAmount(estimatedTo.toFixed(6))
    }
  }, [fromCurrency, toCurrency, estimatedTo])

  const sameToken = fromCurrency === toCurrency && fromCurrency !== ''

  const canSubmit =
    validAmount && fromCurrency && toCurrency && !sameToken && submitStatus !== 'loading'

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!canSubmit) return
      setSubmitStatus('loading')
      setSubmitMessage('')
      await new Promise((r) => setTimeout(r, 1500))
      setSubmitStatus('success')
      setSubmitMessage(
        `Successfully swapped ${fromAmount} ${fromCurrency} → ${estimatedTo?.toFixed(6)} ${toCurrency}`
      )
    },
    [canSubmit, fromAmount, fromCurrency, toCurrency, estimatedTo]
  )

  const amountError = useMemo(() => {
    if (fromAmount === '') return null
    if (Number.isNaN(amountNum)) return 'Please enter a valid number.'
    if (amountNum <= 0) return 'Amount must be greater than 0.'
    return null
  }, [fromAmount, amountNum])

  if (loadingPrices) {
    return (
      <div className="swap-card loading-state">
        <div className="loading-spinner-container">
          <span className="spinner large" aria-hidden />
          <p>Loading tokens and prices…</p>
        </div>
      </div>
    )
  }

  if (priceError || tokens.length === 0) {
    return (
      <div className="swap-card error-state">
        <p>{priceError ?? 'No tokens with prices available.'}</p>
      </div>
    )
  }

  return (
    <form className="swap-card" onSubmit={handleSubmit} noValidate>
      <h2 className="swap-title">Swap</h2>

      {/* From */}
      <div className="field from-field">
        <label className="field-label" htmlFor="from-amount">
          From
        </label>
        <div className="input-row">
          <input
            id="from-amount"
            type="text"
            inputMode="decimal"
            placeholder="0.0"
            autoComplete="off"
            value={fromAmount}
            onChange={(e) => {
              setFromAmount(e.target.value)
              if (submitStatus === 'success') setSubmitStatus('idle')
            }}
            aria-invalid={!!amountError}
            aria-describedby={amountError ? 'from-amount-error' : undefined}
          />
          <div className="token-pill">
            <TokenIcon currency={fromCurrency} size={24} />
            <TokenSelect
              tokens={tokens}
              value={fromCurrency}
              onChange={setFromCurrency}
              aria-label="From token"
            />
          </div>
        </div>
        {fromToken && (
          <p className="field-hint">
            1 {fromCurrency} ≈ ${fromToken.price.toFixed(4)} USD
          </p>
        )}
        {amountError && (
          <p id="from-amount-error" className="field-error" role="alert">
            {amountError}
          </p>
        )}
      </div>

      {/* Swap direction */}
      <button
        type="button"
        className="swap-direction-btn"
        onClick={swapCurrencies}
        aria-label="Swap from and to"
        title="Swap direction"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M4 2L4 14M4 14L1 11M4 14L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14L12 2M12 2L9 5M12 2L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* To */}
      <div className="field to-field">
        <label className="field-label" htmlFor="to-estimate">
          To (estimated)
        </label>
        <div className="input-row to-row">
          <input
            id="to-estimate"
            type="text"
            readOnly
            tabIndex={-1}
            value={
              estimatedTo != null
                ? estimatedTo.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })
                : '0.00'
            }
          />
          <div className="token-pill">
            <TokenIcon currency={toCurrency} size={24} />
            <TokenSelect
              tokens={tokens}
              value={toCurrency}
              onChange={setToCurrency}
              aria-label="To token"
            />
          </div>
        </div>
        {sameToken && (
          <p className="field-error" role="alert">
            Please choose a different token.
          </p>
        )}
      </div>

      {/* Exchange rate */}
      {exchangeRate != null && !sameToken && (
        <div className="exchange-rate">
          <span className="exchange-rate-label">Rate</span>
          <span className="exchange-rate-value">
            1 {fromCurrency} = {exchangeRate.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}{' '}
            {toCurrency}
          </span>
        </div>
      )}

      {/* Status messages */}
      {submitStatus === 'success' && (
        <p className="submit-message success" role="status">
          {submitMessage}
        </p>
      )}
      {submitStatus === 'error' && submitMessage && (
        <p className="submit-message error" role="alert">
          {submitMessage}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="submit-btn"
        disabled={!canSubmit}
        aria-busy={submitStatus === 'loading'}
      >
        {submitStatus === 'loading' ? (
          <>
            <span className="spinner" aria-hidden />
            Swapping…
          </>
        ) : (
          'Swap'
        )}
      </button>
    </form>
  )
}
