import { SUPPORTING_LANGUAGES } from '@/constants/common.i18n'
import { useRouter } from 'next/router'

type TranslationFile = {
  [key in SUPPORTING_LANGUAGES]: Record<string, string>
} & Record<string, unknown>

const useI18n = () => {
  const router = useRouter()
  const currentLanguage = router.locale as SUPPORTING_LANGUAGES
  const changeLanguage = (locale: SUPPORTING_LANGUAGES) => {
    const currentPath = router.pathname
    const currentQueries = router.query
    const newQueries = { ...currentQueries }
    const newQueriesString = Object.keys(newQueries)
      .map(key => `${key}=${newQueries[key]}`)
      .join('&')
    const newUrl = `${currentPath}?${newQueriesString}`

    router.push(newUrl, undefined, {
      locale,
      shallow: true,
    })
  }

  const getTranslation = <T extends TranslationFile>(translations: T) => {
    const translation =
      translations[currentLanguage] || translations[SUPPORTING_LANGUAGES.en]

    return <K extends keyof T[SUPPORTING_LANGUAGES]>(key: K) => {
      const translationKey = key as string

      return translation[translationKey] || 'No translation found'
    }
  }

  return { currentLanguage, changeLanguage, getTranslation }
}

export default useI18n
