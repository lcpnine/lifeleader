import { SUPPORTING_LANGUAGES } from '@/constants/i18n'
import { useRouter } from 'next/router'

interface TRANSLATION {
  [key: string]: string
}

type TRANSLATIONS = {
  [key in SUPPORTING_LANGUAGES]: TRANSLATION
}

const useI18n = () => {
  const router = useRouter()

  const changeLanguage = (locale: SUPPORTING_LANGUAGES) => {
    router.push(router.pathname, router.pathname, { locale })
  }

  const getTranslation = (
    translations: TRANSLATIONS,
    locale = SUPPORTING_LANGUAGES.en
  ) => {
    const translation = translations[locale]

    return (key: string) => {
      if (translation) {
        return translation[key]
      }

      return 'No translation found'
    }
  }

  return { changeLanguage, getTranslation }
}

export default useI18n
