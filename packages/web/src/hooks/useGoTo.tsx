import { useRouter } from 'next/router'

interface GoToOptions {
  replace?: boolean
  params?: Record<string, string>
  keepParams?: boolean
}

const useGoTo = () => {
  const router = useRouter()
  const currentParams = router.query

  const goTo = (path: string, options?: GoToOptions) => {
    const params = options?.params || {}
    const keepParams = options?.keepParams || false

    const paramsString =
      params || (keepParams && currentParams)
        ? Object.entries({ ...currentParams, ...params })
            .map(([key, value]) => `${key}=${value}`)
            .join('&')
        : ''

    const newPath = path + paramsString

    if (options?.replace)
      return router.replace(newPath, undefined, { locale: router.locale })
    router.push(newPath, undefined, { locale: router.locale })
  }

  return { goTo }
}

export default useGoTo
