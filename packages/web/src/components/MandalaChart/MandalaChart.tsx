import { useAlert } from '@/contexts/AlertContext'
import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'
import useI18n from '@/hooks/useI18n'
import { RecommendationCard } from '@/hooks/useRecommendationCard'
import { Dispatch, useEffect, useRef } from 'react'
import { deepCopy } from '../../../utils/common'
import TRANSLATIONS from './MandalaChart.i18n'
import Square, { SquareType } from './Square'

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
  const { themeStyle } = useTheme()

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
      <div
        className={`grid grid-cols-3 w-max border-2 ${themeStyle.borderColor}`}
      >
        {wholeGridValues.map((values, gridIndex) => {
          const isGridValid =
            gridIndex === 4 ? true : wholeGridValues[4][gridIndex] !== ''
          return (
            <div
              key={gridIndex}
              className={`grid grid-cols-3 w-max border ${themeStyle.borderColor}`}
            >
              {values.map((value, suqareIndex) => {
                return (
                  <Square
                    key={suqareIndex}
                    type={isAIModeOn ? SquareType.AI : SquareType.MANUAL}
                    isGridValid={isGridValid}
                    value={value}
                    handleGridValue={handleGridValue}
                    handleGridValueOnAIMode={handleGridValueOnAIMode}
                    gridIndex={gridIndex}
                    squareIndex={suqareIndex}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MandalaChart
