export const PHASE = process.env.PHASE
export const IS_DEV = PHASE === 'development'
export const CLIENT_URL = IS_DEV
  ? 'http://localhost:3000'
  : 'https://lifeleader.me'
