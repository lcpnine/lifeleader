export const PHASE = process.env.PHASE
export const IS_DEV = PHASE === 'development'
export const IS_SSR = typeof window === 'undefined'

export const BASE_URL =
  PHASE === 'development'
    ? 'http://localhost:4003'
    : 'https://api.lifeleader.me'

export const TEMPORARY_CHART_SESSION_KEY = 'tempWholeGridValues'