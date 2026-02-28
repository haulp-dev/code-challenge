import { useState } from 'react'
import { TOKEN_ICON_BASE } from '../types'

interface TokenIconProps {
  currency: string
  size?: number
  className?: string
}

export function TokenIcon({ currency, size = 24, className }: TokenIconProps) {
  const [failed, setFailed] = useState(false)

  if (!currency) {
    return (
      <span
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'var(--token-fallback-bg)',
          display: 'inline-block',
        }}
        aria-hidden
      />
    )
  }

  const src = `${TOKEN_ICON_BASE}/${currency}.svg`

  if (failed) {
    return (
      <span
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'var(--token-fallback-bg)',
          color: 'var(--token-fallback-fg)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: Math.max(10, size * 0.45),
          fontWeight: 600,
        }}
        aria-hidden
      >
        {currency.slice(0, 1)}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  )
}
