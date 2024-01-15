import DisplayingFullViewMandalaChart from '@/components/MandalaChart/DisplayingFullViewMandalaChart'
import MandalaChart from '@/components/MandalaChart/MandalaChart'
import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'
import Recommendations from '@/components/Recommend/Recommendations'
import MOCK_DATA from '@/components/Recommend/mockData'
import ScreenshotButton from '@/components/ScreenshotButton/ScreenshotButton'
import { MandalaChartView } from '@/constants/mandalaChart'
import useI18n from '@/hooks/useI18n'
import useScreenShot from '@/hooks/useScreenshot'
import useSwitch from '@/hooks/useSwitch'
import useToggleOptions from '@/hooks/useToggleOptions'
import Head from 'next/head'
import { useState } from 'react'
import TRANSLATIONS from './index.i18n'

const Home = () => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const [wholeGridValues, setWholeGridValues] = useState<string[][]>(
    new Array(9).fill(new Array(9).fill(''))
  )
  const { takeScreenShot, ScreenShotComponent } = useScreenShot({
    component: (
      <DisplayingFullViewMandalaChart wholeGridValues={wholeGridValues} />
    ),
  })
  const { Component: ToggleOptions, selectedOption: chartViewOption } =
    useToggleOptions({
      initOption: MandalaChartView.FULL_VIEW,
      options: Object.values(MandalaChartView),
    })
  const { isSwitchOn: isAIModeOn, Component: AIModeSwitch } = useSwitch()

  return (
    <>
      <Head>
        <title>{translation('tabTitle')}</title>
        <meta name="description" content={translation('description')} />
      </Head>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold text-center text-blue-600 my-4 shadow-sm">
          {translation('title')}
        </h1>
        <div className="flex items-center justify-center w-3/5">
          <p className="break-words">{translation('description')}</p>
        </div>
        <div className="pt-4">
          <MandalaThemeSelector />
        </div>
        {/* <div className="pt-4">{ToggleOptions}</div> */}
        <div className="pt-4 flex flex-col items-center justify-center">
          <div className="font-bold pb-2">AI Mode</div>
          <AIModeSwitch />
        </div>
        <div className="pt-4">
          <MandalaChart
            wholeGridValues={wholeGridValues}
            setWholeGridValues={setWholeGridValues}
            viewOption={chartViewOption as MandalaChartView}
          />
        </div>
        <div className="pt-4">
          <ScreenshotButton takeScreenShot={takeScreenShot} />
        </div>
      </div>
      <Recommendations items={MOCK_DATA} />
      {ScreenShotComponent && <ScreenShotComponent />}
    </>
  )
}

export default Home
