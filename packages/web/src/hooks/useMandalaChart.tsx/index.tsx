import DisplayingFullViewMandalaChart from '@/components/MandalaChart/DisplayingFullViewMandalaChart'
import MandalaChart from '@/components/MandalaChart/MandalaChart'
import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'
import Recommendations from '@/components/Recommend/Recommendations'
import Switch from '@/components/Switch/Switch'
import { IS_DEV } from '@/constants/common'
import { useAlert } from '@/contexts/AlertContext'
import { useLoading } from '@/contexts/LoadingContext'
import useI18n from '@/hooks/useI18n'
import { recommendationCardVar } from '@/hooks/useRecommendationCard'
import useScreenShot from '@/hooks/useScreenshot'
import { useReactiveVar } from '@apollo/client'
import { CloudIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { CreateMandalaChartInput } from '../../../gql/graphql'
import useAIRecommendation from '../useAIRecommendation'
import TRANSLATIONS from './useMandalaChart.i18n'

const DEFAULT_WHOLE_GRID_VALUES: CreateMandalaChartInput = {
  title: IS_DEV ? 'Test Title' : '',
  description: IS_DEV ? 'Test Description' : '',
  private: false,
  centerCell: {
    goal: IS_DEV ? 'Test Goal' : '',
    tasks: IS_DEV
      ? new Array(8).map((_, idx) => 'Sub Goal ' + idx)
      : new Array(8).fill(''),
  },
  surroundingCells: new Array(8).fill({
    goal: IS_DEV
      ? new Array(8).map((_, idx) => 'Sub Goal ' + idx)
      : new Array(8).fill(''),
    tasks: new Array(8).fill(''),
  }),
}

const useMandalaChart = () => {
  const { openAlert } = useAlert()
  const [wholeGridValues, setWholeGridValues] =
    useState<CreateMandalaChartInput>(DEFAULT_WHOLE_GRID_VALUES)
  const mainGoal = wholeGridValues.centerCell.goal
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)

  const { takeScreenShot, ScreenShotComponent } = useScreenShot({
    component: (
      <DisplayingFullViewMandalaChart wholeGridValues={wholeGridValues} />
    ),
  })
  const [isAIModeOn, setIsAIModeOn] = useState(false)
  const { loading, refetch, errorType } = useAIRecommendation({
    wholeGridValues: wholeGridValues.map(values =>
      values.map(value => ({ text: value }))
    ),
    isAIModeOn,
  })
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

  const handleAIMode = () => {
    if (!isAIModeOn) {
      if (!mainGoal) {
        openAlert({ text: translation('mainGoalIsRequired') })
        return
      }
      setIsAIModeOn(true)
    }

    setIsAIModeOn(false)
  }

  const isShowingAIRecommendation = isAIModeOn && !loading
  const { showLoading } = useLoading()
  useEffect(() => {
    if (loading) {
      showLoading(true)
    } else {
      showLoading(false)
    }
  }, [loading])

  return {
    ThemeSelector: <MandalaThemeSelector />,
    AIModeSwitch: (
      <>
        <div className="font-bold pb-2">AI Mode</div>
        <Switch isSwitchOn={isAIModeOn} handleSwitch={handleAIMode} />
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

export default useMandalaChart
