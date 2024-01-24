import { useAlert } from '@/contexts/AlertContext'
import { useEntryContext } from '@/contexts/EntryContext'
import useI18n from '@/hooks/useI18n'
import { RecommendationCard } from '@/hooks/useRecommendationCard'
import { Dispatch, useEffect, useRef } from 'react'
import { deepCopy } from '../../../utils/common'
import Grid from './Grid'
import TRANSLATIONS from './MandalaChart.i18n'

interface Props {
  wholeGridValues: string[][]
  setWholeGridValues: Dispatch<React.SetStateAction<string[][]>>
  isAIModeOn: boolean
  recommendationItems: RecommendationCard[]
  onRecommendItemAccepted: () => void
}

const MandalaChart = ({
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

  const handleGridValue = (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => {
    setWholeGridValues(prevGridValue => {
      const newGridValues = deepCopy(prevGridValue)
      newGridValues[gridIndex][squareIndex] = newValue
      if (gridIndex === 4 && squareIndex !== 4) {
        newGridValues[squareIndex][gridIndex] = newValue
      }
      return newGridValues
    })
  }

  const handleGridValueOnAIMode = (gridIndex: number, squareIndex: number) => {
    const selectedAIRecommendationItem = recommendationItems.find(
      item => item.isClicked
    )

    setWholeGridValues(prevGridValue => {
      const newGridValues = deepCopy(prevGridValue)
      if (gridIndex === 4 && squareIndex === 4) {
        openAlert({ text: translation('cannotRecommendMainGoal') })
      } else {
        newGridValues[gridIndex][squareIndex] =
          selectedAIRecommendationItem?.text
        if (gridIndex === 4 && squareIndex !== 4) {
          newGridValues[squareIndex][gridIndex] =
            selectedAIRecommendationItem?.text
        }
        onRecommendItemAccepted()
      }
      return newGridValues
    })
  }

  const scrollMainGoalSquareToCenter = () => {
    const container = focusRef.current
    const mainGoalElement = document.getElementsByClassName('main-goal')[0]
    if (container && mainGoalElement) {
      const containerRect = container.getBoundingClientRect()
      const elementRect = mainGoalElement.getBoundingClientRect()

      // Calculating the position to scroll to
      const scrollLeft =
        elementRect.left +
        window.scrollX -
        containerRect.left -
        (containerRect.width / 2 - elementRect.width / 2)
      const scrollTop =
        elementRect.top +
        window.scrollY -
        containerRect.top -
        (containerRect.height / 2 - elementRect.height / 2)

      // Scrolling the container to center the element
      container.scrollLeft = scrollLeft
      container.scrollTop = scrollTop
    }
  }

  useEffect(() => {
    scrollMainGoalSquareToCenter()
  }, [])

  return (
    <div
      className={`relative ${
        isMobile ? 'max-w-[400px] max-h-[400px] p-40' : 'max-w-fit'
      } overflow-auto`}
      ref={focusRef}
    >
      <div className={`grid grid-cols-3 gap-3 w-max`}>
        {wholeGridValues.map((_, index) => (
          <Grid
            key={index}
            wholeGridValues={wholeGridValues}
            handleGridValue={handleGridValue}
            handleGridValueOnAIMode={handleGridValueOnAIMode}
            gridIndex={index}
            isAIModeOn={isAIModeOn}
          />
        ))}
      </div>
    </div>
  )
}

export default MandalaChart
