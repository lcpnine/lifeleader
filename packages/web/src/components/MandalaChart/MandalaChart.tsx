import { MandalaChartView } from '@/constants/mandalaChart'
import { useAlert } from '@/contexts/AlertContext'
import { useEntryContext } from '@/contexts/EntryContext'
import useI18n from '@/hooks/useI18n'
import { Dispatch, useEffect, useRef } from 'react'
import { deepCopy } from '../../../utils/common'
import { RecommendationItemProps } from '../Recommend/RecommendationItem'
import FullViewMandalaChart from './FullViewMandalaChart'
import SingleViewMandalaChart from './SingleViewMandalaChart'
import TRANSLATIONS from './Square.i18n'

interface Props {
  viewOption: MandalaChartView
  wholeGridValues: string[][]
  setWholeGridValues: Dispatch<React.SetStateAction<string[][]>>
  isAIModeOn: boolean
  recommendationItems: RecommendationItemProps[]
  onRecommendItemAccepted: () => void
}

const MandalaChart = ({
  viewOption,
  wholeGridValues,
  setWholeGridValues,
  isAIModeOn,
  recommendationItems,
  onRecommendItemAccepted,
}: Props) => {
  const { isMobile } = useEntryContext()
  const focusRef = useRef<HTMLDivElement>(null)
  const { openAlert } = useAlert()
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)

  const selectedAIRecommendationItem = recommendationItems.find(
    item => item.isClicked
  )
  const handleGridValue = (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => {
    const newGridValues = deepCopy(wholeGridValues)
    if (isAIModeOn) {
      if (gridIndex === 4 && squareIndex === 4) {
        openAlert(translation('cannotRecommendMainGoal'))
      } else {
        newGridValues[gridIndex][squareIndex] =
          selectedAIRecommendationItem?.text
        if (gridIndex === 4 && squareIndex !== 4) {
          newGridValues[squareIndex][gridIndex] =
            selectedAIRecommendationItem?.text
        }
        onRecommendItemAccepted()
      }
    } else {
      newGridValues[gridIndex][squareIndex] = newValue
      if (gridIndex === 4 && squareIndex !== 4) {
        newGridValues[squareIndex][gridIndex] = newValue
      }
    }

    setWholeGridValues(newGridValues)
  }

  useEffect(() => {
    if (
      isMobile &&
      focusRef.current &&
      viewOption === MandalaChartView.FULL_VIEW
    ) {
      const div = focusRef.current
      const x = div.scrollWidth / 2
      const y = div.scrollHeight / 2
      div.scrollLeft = x - div.offsetWidth / 2
      div.scrollTop = y - div.clientHeight / 2
    }
  }, [isMobile, viewOption])

  return (
    <div
      className={`relative ${
        isMobile ? 'max-w-[400px] max-h-[400px] p-40' : 'max-w-fit'
      } overflow-auto`}
      ref={focusRef}
    >
      {viewOption === MandalaChartView.FULL_VIEW ? (
        <FullViewMandalaChart
          wholeGridValues={wholeGridValues}
          handleGridValue={handleGridValue}
          isAIModeOn={isAIModeOn}
        />
      ) : (
        <SingleViewMandalaChart
          wholeGridValues={wholeGridValues}
          handleGridValue={handleGridValue}
        />
      )}
    </div>
  )
}

export default MandalaChart
