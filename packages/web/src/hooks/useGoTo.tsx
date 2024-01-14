import { useRouter } from 'next/router'

interface GoToOptions {
  replace?: boolean
}

const useGoTo = () => {
  const router = useRouter()

  const goTo = (path: string, options: GoToOptions) => {
    if (options.replace)
      return router.replace(path, path, { locale: router.locale })
    router.push(path, path, { locale: router.locale })
  }

  return { goTo }
}

export default useGoTo
