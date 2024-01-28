import { useRouter } from 'next/router'

interface GoToOptions {
  replace?: boolean
  params?: Record<string, string>
}

const useGoTo = () => {
  const router = useRouter()

  const goTo = (path: string, options?: GoToOptions) => {
    const params = options?.params || {}
    if (options?.replace)
      return router.replace(
        path + (params ? '?' + new URLSearchParams(params) : ''),
        undefined,
        { locale: router.locale }
      )
    router.push(
      path + (params ? '?' + new URLSearchParams(params) : ''),
      undefined,
      { locale: router.locale }
    )
  }

  return { goTo }
}

export default useGoTo
