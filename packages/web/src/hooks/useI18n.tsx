import { useRouter } from 'next/router'

const useI18n = () => {
  const router = useRouter()

  const changeLanguage = (language: string) => {
    router.push(router.pathname, router.pathname, { locale: language })
  }

  return { changeLanguage }
}

export default useI18n
