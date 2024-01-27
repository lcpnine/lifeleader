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
import { CloudIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import {
  GetRecommendationForSubGoalsDocument,
  Recommendation,
} from '../../../gql/graphql'
import { extractByTypename } from '../../../utils/typeguard'
import TRANSLATIONS from './useMandalaChart.i18n'

const useMandalaChart = () => {
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

  const handleSaveChartClick = () => {
    alert('Save chart clicked')
  }

  const isShowingAIRecommendation =
    isAIModeOn && !loading && recommendationItems.length > 0

  return {
    ThemeSelector: <MandalaThemeSelector />,
    AIModeSwitch: (
      <>
        <div className="font-bold pb-2">AI Mode</div>
        <AIModeSwitch />
        <p className="text-xs pt-2">{translation('aiModeDescription')}</p>
      </>
    ),
    MandalaChart: (
      <MandalaChart
        wholeGridValues={wholeGridValues}
        setWholeGridValues={setWholeGridValues}
        isAIModeOn={isAIModeOn}
        recommendationItems={recommendationItems}
        onRecommendItemAccepted={onRecommendItemAccepted}
      />
    ),
    Recommendations: isShowingAIRecommendation && (
      <Recommendations
        recommendationItems={recommendationItems}
        handleRecommendationItemClick={handleRecommendationItemClick}
        handleRefresh={() => refetch()}
      />
    ),
    ScreenShotComponent: <ScreenShotComponent />,
    SaveChartButton: (
      <button
        className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        onClick={handleSaveChartClick}
      >
        <CloudIcon className="h-5 w-5 mr-2" />
        {translation('saveChart')}
      </button>
    ),
    DownloadImageButton: (
      <button
        className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
        onClick={takeScreenShot}
      >
        <PhotoIcon className="h-5 w-5 mr-2" />
        {translation('downloadImage')}
      </button>
    ),
  }
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

export default useMandalaChart
