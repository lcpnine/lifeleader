import DisplayingFullViewMandalaChart from '@/components/MandalaChart/DisplayingFullViewMandalaChart'
import MandalaChart from '@/components/MandalaChart/MandalaChart'
import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'
import Recommendations from '@/components/Recommend/Recommendations'
import { useUserContext } from '@/contexts/UserContext'
import useI18n from '@/hooks/useI18n'
import { recommendationCardVar } from '@/hooks/useRecommendationCard'
import useScreenShot from '@/hooks/useScreenshot'
import useSwitch from '@/hooks/useSwitch'
import { gql, useQuery, useReactiveVar } from '@apollo/client'
import Head from 'next/head'
import Link from 'next/link'
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

  const handleLoadSavedChartClick = () => {
    alert('Load saved chart clicked')
  }

  const handleSaveChartClick = () => {
    alert('Save chart clicked')
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
          <Link
            href="/mandala/list"
            className="inline-block px-4 py-2 text-gray-500 hover:text-gray-900 italic underline transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mb-4"
            onClick={handleLoadSavedChartClick}
          >
            If you've saved your chart, click here to load and continue editing
          </Link>
        </div>

        <div className="pb-4">
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
        <div className="pt-4 flex gap-2">
          {/* Save chart button */}
          <button
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
            onClick={handleSaveChartClick}
          >
            Save chart
          </button>
          {/* Existing Screenshot button */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={takeScreenShot}
          >
            {translation('downloadImage')}
          </button>
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
