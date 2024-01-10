import { IS_SSR } from '@/constants/common'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode, createContext, useContext } from 'react'
import { getSelectorsByUserAgent } from 'react-device-detect'

interface ServerProps {
  referrer?: string
  userAgent?: string
  path?: string
}

interface Props {
  serverProps: ServerProps
  children: ReactNode
}

const getHashFromRouter = (router: NextRouter) => {
  if (router.asPath) {
    const hash = router.asPath.split('#')[1]
    return hash
  }
  return ''
}

const getBrowsersReferrer = () => {
  return IS_SSR ? undefined : window.document.referrer
}

const getBrowserUserAgent = () => {
  return IS_SSR ? undefined : window.navigator.userAgent
}

interface EntryContext {
  isMobile: boolean
  hash: string
  referrer?: string
}

const DefaultEntryContext: EntryContext = {
  isMobile: false,
  hash: '',
  referrer: undefined,
}

const EntryContext = createContext(DefaultEntryContext)

export const useEntryContext = () => useContext(EntryContext)

export const EntryProvider = ({ serverProps, children }: Props) => {
  const router = useRouter()
  const hash = getHashFromRouter(router)

  const browserReferrer = getBrowsersReferrer()
  const browserUserAgent = getBrowserUserAgent()

  const { referrer: serverReferrer, userAgent: serverUserAgent } = serverProps

  const referrer = serverReferrer || browserReferrer
  const userAgent = (serverUserAgent || browserUserAgent) as string

  const { isMobile } = getSelectorsByUserAgent(userAgent)

  const value = {
    isMobile,
    hash,
    referrer,
  }

  return <EntryContext.Provider value={value}>{children}</EntryContext.Provider>
}
