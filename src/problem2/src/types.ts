export interface PriceEntry {
  currency: string
  date: string
  price: number
}

export interface TokenWithPrice {
  currency: string
  price: number
}

export const TOKEN_ICON_BASE =
  'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens'
export const PRICES_URL = 'https://interview.switcheo.com/prices.json'
