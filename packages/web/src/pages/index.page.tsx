import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'
import ScreenshotButton from '@/components/ScreenshotButton/ScreenshotButton'
import useI18n from '@/hooks/useI18n'
import useScreenShot from '@/hooks/useScreenshot'
import Head from 'next/head'
import TRANSLATIONS from './index.i18n'

const Home = () => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const { screenShotRef, takeScreenShot } = useScreenShot()

  return (
    <>
      <Head>
        <title>{translation('tabTitle')}</title>
        <meta name="description" content={translation('description')} />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center text-blue-600 my-4 shadow-sm">
          {translation('title')}
        </h1>

        <div className="flex items-center justify-center mb-6 w-3/5">
          <p className="break-words">{translation('description')}</p>
        </div>
        <MandalaThemeSelector />
        {/* <MandalaChart screenShotRef={screenShotRef} /> */}
        <ScreenshotButton takeScreenShot={takeScreenShot} />
      </div>
    </>
  )
}

export default Home
