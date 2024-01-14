export const PHASE = process.env.PHASE
export const IS_SSR = typeof window === 'undefined'

export const BASE_URL =
  PHASE === 'development'
    ? 'http://localhost:4003'
    : 'https://api.lifeleader.me'
