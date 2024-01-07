import MandalaChart from '@/components/MandalaChart/MandalaChart'
import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'
import ScreenshotButton from '@/components/ScreenshotButton/ScreenshotButton'
import { SUPPORTING_LANGUAGES } from '@/constants/i18n'
import useI18n from '@/hooks/useI18n'
import useScreenShot from '@/hooks/useScreenshot'
import { useRouter } from 'next/router'
import TRANSLATIONS from './index.i18n'

const Home = () => {
  const { locale } = useRouter()
  const { getTranslation } = useI18n()
  const trasnlation = getTranslation(
    TRANSLATIONS,
    locale as SUPPORTING_LANGUAGES
  )
  const { screenShotRef, takeScreenShot } = useScreenShot()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center text-blue-600 my-4 shadow-lg">
        {trasnlation('title')}
      </h1>
      <p className="text-center mb-6 max-w-prose">
        {trasnlation('description')}
      </p>
      <MandalaThemeSelector />
      <MandalaChart screenShotRef={screenShotRef} />
      <ScreenshotButton takeScreenShot={takeScreenShot} />
    </div>
  )
}

export default Home
