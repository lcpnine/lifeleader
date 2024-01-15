import { MandalaChartView } from '@/constants/mandalaChart'
import { useEntryContext } from '@/contexts/EntryContext'
import { Dispatch, useEffect, useRef } from 'react'
import { deepCopy } from '../../../utils/common'
import { RecommendationItemProps } from '../Recommend/RecommendationItem'
import FullViewMandalaChart from './FullViewMandalaChart'
import SingleViewMandalaChart from './SingleViewMandalaChart'

interface Props {
  viewOption: MandalaChartView
  wholeGridValues: string[][]
  setWholeGridValues: Dispatch<React.SetStateAction<string[][]>>
  isAIModeOn: boolean
  recommendationItems: RecommendationItemProps[]
}

const MandalaChart = ({
  viewOption,
  wholeGridValues,
  setWholeGridValues,
  isAIModeOn,
  recommendationItems,
}: Props) => {
  const { isMobile } = useEntryContext()
  const focusRef = useRef<HTMLDivElement>(null)

  const selectedAIRecommendationItem = recommendationItems.find(
    item => item.isClicked
  )
  const handleGridValue = (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => {
    const newGridValues = deepCopy(wholeGridValues)
    newGridValues[gridIndex][squareIndex] = isAIModeOn
      ? selectedAIRecommendationItem?.text
      : newValue
    if (gridIndex === 4 && squareIndex !== 4) {
      newGridValues[squareIndex][gridIndex] = isAIModeOn
        ? selectedAIRecommendationItem?.text
        : newValue
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
