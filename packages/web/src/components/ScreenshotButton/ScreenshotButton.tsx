import { SUPPORTING_LANGUAGES } from '@/constants/i18n'
import useI18n from '@/hooks/useI18n'
import { useRouter } from 'next/router'
import TRANSLATIONS from './ScreenshotButton.i18n'

interface Props {
  takeScreenShot: () => void
}

const ScreenshotButton = ({ takeScreenShot }: Props) => {
  const { locale } = useRouter()
  const { getTranslation } = useI18n()

  const translation = getTranslation(
    TRANSLATIONS,
    locale as SUPPORTING_LANGUAGES
  )

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      onClick={takeScreenShot}
    >
      {translation('download')}
    </button>
  )
}

export default ScreenshotButton
