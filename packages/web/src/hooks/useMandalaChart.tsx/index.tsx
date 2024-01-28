import DisplayingFullViewMandalaChart from '@/components/MandalaChart/DisplayingFullViewMandalaChart'
import MandalaChart from '@/components/MandalaChart/MandalaChart'
import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'
import TextInputModal from '@/components/Modal/TextInput'
import Recommendations from '@/components/Recommend/Recommendations'
import Switch from '@/components/Switch/Switch'
import { IS_DEV } from '@/constants/common'
import { useAlert } from '@/contexts/AlertContext'
import { useLoading } from '@/contexts/LoadingContext'
import useI18n from '@/hooks/useI18n'
import { recommendationCardVar } from '@/hooks/useRecommendationCard'
import useScreenShot from '@/hooks/useScreenshot'
import { gql, useMutation, useReactiveVar } from '@apollo/client'
import {
  CloudIcon,
  PencilSquareIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  CreateMandalaChartDocument,
  CreateMandalaChartInput,
  UpdateMandalaChartDocument,
} from '../../../gql/graphql'
import { deepCopy } from '../../../utils/common'
import useAIRecommendation from '../useAIRecommendation'
import useModal from '../useModal'
import TRANSLATIONS from './useMandalaChart.i18n'

const DEFAULT_WHOLE_GRID_VALUES: CreateMandalaChartInput = {
  title: IS_DEV ? 'Test Title' : '',
  description: IS_DEV ? 'Test Description' : '',
  private: false,
  centerCell: {
    goal: '',
    tasks: new Array(8).fill(''),
  },
  surroundingCells: new Array(8).fill('').map((_, idx) => ({
    goal: '',
    tasks: new Array(8).fill(''),
  })),
}

const useMandalaChart = () => {
  const router = useRouter()
  const { openAlert } = useAlert()
  const [wholeGridValues, setWholeGridValues] =
    useState<CreateMandalaChartInput>(DEFAULT_WHOLE_GRID_VALUES)
  const mainGoal = wholeGridValues.centerCell.goal
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
  const [createMandalaChart] = useMutation(CreateMandalaChartDocument, {
    variables: {
      input: wholeGridValues,
    },
  })
  const [updateMandalaChart] = useMutation(UpdateMandalaChartDocument)

  const { takeScreenShot, ScreenShotComponent } = useScreenShot({
    component: (
      <DisplayingFullViewMandalaChart wholeGridValues={wholeGridValues} />
    ),
  })
  const [isAIModeOn, setIsAIModeOn] = useState(false)
  const { loading, refetch, errorType } = useAIRecommendation({
    wholeGridValues,
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
    const chartId = router.query.chartId as string | undefined
    chartId
      ? updateMandalaChart({
          variables: {
            input: {
              mandalaChartId: chartId as string,
              ...wholeGridValues,
            },
          },
        })
      : createMandalaChart({
          variables: {
            input: wholeGridValues,
          },
        })
  }

  const handleAIMode = () => {
    if (!mainGoal) {
      openAlert({ text: translation('mainGoalIsRequired') })
      return
    }

    setIsAIModeOn(prev => !prev)
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

  const handleSquareValueManually = (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => {
    setWholeGridValues(prevGridValue => {
      const newGridValues: CreateMandalaChartInput = deepCopy(prevGridValue)

      if (gridIndex === 4) {
        if (squareIndex === 4) {
          newGridValues.centerCell.goal = newValue
        } else {
          newGridValues.centerCell.tasks[
            squareIndex < 4 ? squareIndex : squareIndex - 1
          ] = newValue
          newGridValues.surroundingCells[
            squareIndex < 4 ? squareIndex : squareIndex - 1
          ].goal = newValue
        }
      } else {
        if (squareIndex === 4) {
          newGridValues.surroundingCells[
            gridIndex < 4 ? gridIndex : gridIndex - 1
          ].goal = newValue
          newGridValues.centerCell.tasks[
            gridIndex < 4 ? gridIndex : gridIndex - 1
          ] = newValue
        } else {
          newGridValues.surroundingCells[
            gridIndex < 4 ? gridIndex : gridIndex - 1
          ].tasks[squareIndex < 4 ? squareIndex : squareIndex - 1] = newValue
        }
      }

      return newGridValues
    })
  }

  const handleSquareValueOnAIMode = (
    gridIndex: number,
    squareIndex: number
  ) => {
    const selectedAIRecommendationItem = recommendationItems.find(
      item => item.isClicked
    )

    setWholeGridValues(prevGridValue => {
      const newGridValues = deepCopy(prevGridValue)

      if (gridIndex === 4) {
        if (squareIndex === 4) {
          newGridValues.centerCell.goal = selectedAIRecommendationItem?.text
        } else {
          newGridValues.centerCell.tasks[
            squareIndex < 4 ? squareIndex : squareIndex - 1
          ] = selectedAIRecommendationItem?.text
          newGridValues.surroundingCells[
            squareIndex < 4 ? squareIndex : squareIndex - 1
          ].goal = selectedAIRecommendationItem?.text
        }
      } else {
        if (squareIndex === 4) {
          newGridValues.surroundingCells[
            gridIndex < 4 ? gridIndex : gridIndex - 1
          ].goal = selectedAIRecommendationItem?.text
          newGridValues.centerCell.tasks[
            gridIndex < 4 ? gridIndex : gridIndex - 1
          ] = selectedAIRecommendationItem?.text
        } else {
          newGridValues.surroundingCells[
            gridIndex < 4 ? gridIndex : gridIndex - 1
          ].tasks[squareIndex < 4 ? squareIndex : squareIndex - 1] =
            selectedAIRecommendationItem?.text
        }
      }

      return newGridValues
    })
  }

  const {
    openModal: openTitleInputModal,
    ModalComponent: TitleInputModalComponent,
  } = useModal({
    Modal: TextInputModal,
    modalProps: {
      state: wholeGridValues.title,
      setState: (newValue: string) => {
        setWholeGridValues(prevGridValue => ({
          ...prevGridValue,
          title: newValue,
        }))
      },
    },
  })

  const {
    openModal: openDescriptionInputModal,
    ModalComponent: DescriptionInputModalComponent,
  } = useModal({
    Modal: TextInputModal,
    modalProps: {
      state: wholeGridValues.description || '',
      setState: (newValue: string) => {
        setWholeGridValues(prevGridValue => ({
          ...prevGridValue,
          description: newValue,
        }))
      },
    },
  })

  return {
    Title: (
      <>
        <h2
          className="flex items-baseline text-3xl font-semibold text-center text-gray-700 hover:text-blue-600 hover:cursor-pointer my-4 shadow-sm"
          onClick={() =>
            openTitleInputModal({
              state: wholeGridValues.title,
            })
          }
        >
          {wholeGridValues.title}
          <PencilSquareIcon className="h-4 w-4 text-gray-700 hover:text-blue-600 ml-2" />
        </h2>
        {TitleInputModalComponent && <TitleInputModalComponent />}
      </>
    ),
    Description: (
      <>
        <p
          className="flex items-baseline break-words text-center text-sm text-gray-700 hover:text-blue-600 hover:cursor-pointer my-2"
          onClick={() =>
            openDescriptionInputModal({
              state: wholeGridValues.description || '',
            })
          }
        >
          {wholeGridValues?.description ||
            translation('DescriptionPlaceholder')}
          <PencilSquareIcon className="mx-auto h-2 w-2 text-gray-700 hover:text-blue-600 ml-1" />
        </p>
        {DescriptionInputModalComponent && <DescriptionInputModalComponent />}
      </>
    ),
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
        handleSquareValueManually={handleSquareValueManually}
        handleSquareValueOnAIMode={handleSquareValueOnAIMode}
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
    wholeGridValues,
    setWholeGridValues,
  }
}

const CREATE_MANDALA_CHART_MUTATION = gql`
  mutation CreateMandalaChart($input: CreateMandalaChartInput!) {
    createMandalaChart(input: $input) {
      ... on CreateMandalaChartSuccess {
        mandalaChart {
          _id
        }
      }
      ... on CreateMandalaChartFailure {
        errorType
      }
    }
  }
`

const UPDATE_MANDALA_CHART_MUTATION = gql`
  mutation UpdateMandalaChart($input: UpdateMandalaChartInput!) {
    updateMandalaChart(input: $input) {
      ... on UpdateMandalaChartSuccess {
        mandalaChart {
          _id
        }
      }
      ... on UpdateMandalaChartFailure {
        errorType
      }
    }
  }
`

export default useMandalaChart
