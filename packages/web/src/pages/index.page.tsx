import DisplayingFullViewMandalaChart from '@/components/MandalaChart/DisplayingFullViewMandalaChart'
import MandalaChart from '@/components/MandalaChart/MandalaChart'
import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'
import Recommendations from '@/components/Recommend/Recommendations'
import ScreenshotButton from '@/components/ScreenshotButton/ScreenshotButton'
import { useUserContext } from '@/contexts/UserContext'
import useI18n from '@/hooks/useI18n'
import { recommendationCardVar } from '@/hooks/useRecommendationCard'
import useScreenShot from '@/hooks/useScreenshot'
import useSwitch from '@/hooks/useSwitch'
import { gql, useQuery, useReactiveVar } from '@apollo/client'
import Head from 'next/head'
import { useState } from 'react'
import {
  GetRecommendationForSubGoalsDocument,
  Recommendation,
} from '../../gql/graphql'
import { extractByTypename } from '../../utils/typeguard'
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
  const { data, loading, refetch } = useQuery(
    GetRecommendationForSubGoalsDocument,
    {
      variables: {
        mainGoal,
        selectedSubGoals: subGoals,
        currentLanguage,
      },
      skip: !(isAIModeOn && mainGoal),
      onCompleted(data) {
        if (data) {
          const { RecommendationSuccess, RecommendationFailure } =
            extractByTypename(data.recommendationForSubGoals)
          if (RecommendationSuccess?.recommendations) {
            recommendationCardVar(
              RecommendationSuccess.recommendations.map(
                (item: Recommendation, index: number) => ({
                  id: index,
                  text: item.text,
                  isClicked: false,
                })
              )
            )
          }
        }
      },
    }
  )
  const { RecommendationFailure } = extractByTypename(
    data?.recommendationForSubGoals
  )

  const errorType = RecommendationFailure?.errorType
  const recommendationItems = useReactiveVar(recommendationCardVar)

  const onRecommendItemAccepted = () => {
    const updatedItems = recommendationItems.filter(item => !item.isClicked)
    recommendationCardVar(updatedItems)
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
    recommendationCardVar(updatedItems)
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

const RECOMMENDATION_FOR_SUB_GOALS_QUERY = gql`
  query GetRecommendationForSubGoals(
    $mainGoal: String!
    $selectedSubGoals: [String!]
    $currentLanguage: String!
  ) {
    recommendationForSubGoals(
      mainGoal: $mainGoal
      selectedSubGoals: $selectedSubGoals
      currentLanguage: $currentLanguage
    ) {
      ... on RecommendationSuccess {
        recommendations {
          text
        }
      }
      ... on RecommendationFailure {
        errorType
      }
    }
  }
`

export default Home
