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
  const currentLanguage = router.locale as SUPPORTING_LANGUAGES

  const changeLanguage = (locale: SUPPORTING_LANGUAGES) => {
    router.push(router.pathname, router.pathname, { locale })
  }

  const getTranslation = (translations: TRANSLATIONS) => {
    const translation = translations[currentLanguage || SUPPORTING_LANGUAGES.en]

    return (key: string) => {
      if (translation) {
        return translation[key]
      }

      return 'No translation found'
    }
  }

  return { currentLanguage, changeLanguage, getTranslation }
}

export default useI18n
