import type { TokenWithPrice } from '../types'

interface TokenSelectProps {
  tokens: TokenWithPrice[]
  value: string
  onChange: (currency: string) => void
  disabled?: boolean
  'aria-label'?: string
}

export function TokenSelect({
  tokens,
  value,
  onChange,
  disabled,
  'aria-label': ariaLabel = 'Select token',
}: TokenSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      aria-label={ariaLabel}
      className="token-select"
    >
      <option value="">Select token</option>
      {tokens.map((t) => (
        <option key={t.currency} value={t.currency}>
          {t.currency}
        </option>
      ))}
    </select>
  )
}
