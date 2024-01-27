import { useUserContext } from '@/contexts/UserContext'
import useI18n from '@/hooks/useI18n'
import useMandalaChart from '@/hooks/useMandalaChart.tsx'
import Head from 'next/head'
import Link from 'next/link'
import TRANSLATIONS from './index.i18n'

const Home = () => {
  const { getTranslation } = useI18n()
  const { user } = useUserContext()
  const translation = getTranslation(TRANSLATIONS)

  const handleLoadSavedChartClick = () => {
    alert('Load saved chart clicked')
  }

  const {
    ThemeSelector,
    AIModeSwitch,
    MandalaChart,
    Recommendations,
    ScreenShotComponent,
    SaveChartButton,
    DownloadImageButton,
  } = useMandalaChart()

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
          <Link
            href="/mandala/list"
            className="inline-block px-4 py-2 text-gray-500 hover:text-gray-900 italic underline transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mb-4"
            onClick={handleLoadSavedChartClick}
          >
            {translation('loadSavedChart')}
          </Link>
        </div>

        <div className="pb-4">{ThemeSelector}</div>
        {user.purchasedInfo.isPurchased && (
          <div className="pt-4 flex flex-col items-center justify-center">
            {AIModeSwitch}
          </div>
        )}
        <div className="pt-4">{MandalaChart}</div>
        <div className="pt-4 flex gap-2">
          {SaveChartButton}
          {DownloadImageButton}
        </div>
      </div>
      {Recommendations}
      {ScreenShotComponent}
    </>
  )
}

export default Home
