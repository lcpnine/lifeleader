export const PHASE = process.env.PHASE
export const IS_DEV = PHASE === 'development'
export const ORIGIN = IS_DEV
  ? 'http://localhost:4003'
  : 'https://api.lifeleader.me'
export const CLIENT_URL = IS_DEV
  ? 'http://localhost:3000'
  : 'https://lifeleader.me'
export const COOKIE_DOMAIN = IS_DEV ? 'localhost' : 'lifeleader.me'
