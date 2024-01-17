import DisplayingFullViewMandalaChart from '@/components/MandalaChart/DisplayingFullViewMandalaChart'
import MandalaChart from '@/components/MandalaChart/MandalaChart'
import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'
import { RecommendationItemProps } from '@/components/Recommend/RecommendationItem'
import Recommendations from '@/components/Recommend/Recommendations'
import ScreenshotButton from '@/components/ScreenshotButton/ScreenshotButton'
import { useUserContext } from '@/contexts/UserContext'
import useAxiosQuery from '@/hooks/useAxiosQuery'
import useI18n from '@/hooks/useI18n'
import useScreenShot from '@/hooks/useScreenshot'
import useSwitch from '@/hooks/useSwitch'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import TRANSLATIONS from './index.i18n'

const Home = () => {
  const { currentLanguage, getTranslation } = useI18n()
  const { user } = useUserContext()
  const translation = getTranslation(TRANSLATIONS)
  const [wholeGridValues, setWholeGridValues] = useState<string[][]>(
    new Array(9).fill(new Array(9).fill(''))
  )
  const mainGoal = wholeGridValues[4][4]
  const subGoals = wholeGridValues[4].filter((_, index) => index !== 4)

  const { takeScreenShot, ScreenShotComponent } = useScreenShot({
    component: (
      <DisplayingFullViewMandalaChart wholeGridValues={wholeGridValues} />
    ),
  })
  const { isSwitchOn: isAIModeOn, Component: AIModeSwitch } = useSwitch({
    initialIsSwitchOn: false,
  })

  //AI recommendation
  const { data, loading, refetch } = useAxiosQuery<{
    recommendations: string[]
  }>({
    url: '/recommendation/sub-goals',
    method: 'POST',
    body: {
      mainGoal,
      subGoals,
      language: currentLanguage,
    },
    skip: !(isAIModeOn && mainGoal),
  })
  const { recommendations } = data || { recommendations: [] }
  const [recommendationItems, setRecommendationItems] = useState<
    RecommendationItemProps[]
  >([])
  useEffect(() => {
    if (!loading && recommendations) {
      const items = recommendations.map((item: string, index: number) => ({
        id: index,
        text: item,
        isClicked: false,
      }))
      setRecommendationItems(items)
    }
  }, [recommendations])

  const onRecommendItemAccepted = () => {
    const updatedItems = recommendationItems.filter(item => !item.isClicked)
    setRecommendationItems(updatedItems)
  }

  const handleRecommendationItemClick = (id: number) => () => {
    const previousClickedItem = recommendationItems.find(item => item.isClicked)
    const updatedItems = recommendationItems.map(item => ({
      ...item,
      isClicked: item.id === id ? !item.isClicked : false,
    }))
    if (previousClickedItem?.isClicked) {
      updatedItems[previousClickedItem.id].isClicked = false
    }
    setRecommendationItems(updatedItems)
  }

  const isShowingAIRecommendation =
    isAIModeOn && !loading && recommendationItems.length > 0

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
        {user.purchasedInfo.isPurchased && (
          <div className="pt-4 flex flex-col items-center justify-center">
            <div className="font-bold pb-2">AI Mode</div>
            <AIModeSwitch />
            <p className="text-xs pt-2">{translation('aiModeDescription')}</p>
          </div>
        )}
        <div className="pt-4">
          <MandalaChart
            wholeGridValues={wholeGridValues}
            setWholeGridValues={setWholeGridValues}
            isAIModeOn={isAIModeOn}
            recommendationItems={recommendationItems}
            onRecommendItemAccepted={onRecommendItemAccepted}
          />
        </div>
        <div className="pt-4">
          <ScreenshotButton takeScreenShot={takeScreenShot} />
        </div>
      </div>
      {isShowingAIRecommendation && (
        <Recommendations
          recommendationItems={recommendationItems}
          handleRecommendationItemClick={handleRecommendationItemClick}
          handleRefresh={() => refetch()}
        />
      )}
      {ScreenShotComponent && <ScreenShotComponent />}
    </>
  )
}

export default Home
