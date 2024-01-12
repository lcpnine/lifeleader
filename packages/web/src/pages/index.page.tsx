import MandalaChart from '@/components/MandalaChart/MandalaChart'
import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'
import ScreenshotButton from '@/components/ScreenshotButton/ScreenshotButton'
import { MandalaChartView } from '@/constants/mandalaChart'
import { useEntryContext } from '@/contexts/EntryContext'
import useI18n from '@/hooks/useI18n'
import useScreenShot from '@/hooks/useScreenshot'
import useToggleOptions from '@/hooks/useToggleOptions'
import Head from 'next/head'
import TRANSLATIONS from './index.i18n'

const Home = () => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const { screenShotRef, takeScreenShot } = useScreenShot()
  const { isMobile } = useEntryContext()
  const { Component: ToggleOptions, selectedOption: chartViewOption } =
    useToggleOptions({
      initOption: isMobile
        ? MandalaChartView.SINGLE_VIEW
        : MandalaChartView.FULL_VIEW,
      options: Object.values(MandalaChartView),
    })

  return (
    <>
      <Head>
        <title>{translation('tabTitle')}</title>
        <meta name="description" content={translation('description')} />
      </Head>
      <div className="flex flex-col items-center justify-center p-4 prose">
        <h1 className="text-5xl md:text-5xl lg:text-7xl font-extrabold text-center text-blue-600 my-4 shadow-sm">
          {translation('title')}
        </h1>
        <div className="flex items-center justify-center mb-6 w-3/5 prose">
          <p className="break-words">{translation('description')}</p>
        </div>
        <div className="pt-4">
          <MandalaThemeSelector />
        </div>
        {!isMobile && <div className="pt-4">{ToggleOptions}</div>}
        <div className="pt-4">
          <MandalaChart
            viewOption={chartViewOption as MandalaChartView}
            screenShotRef={screenShotRef}
          />
        </div>
        <div className="pt-4">
          <ScreenshotButton takeScreenShot={takeScreenShot} />
        </div>
      </div>
    </>
  )
}

export default Home
