import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'
import {
  getGridByIndexFromMandalaChartInput,
  getValueByGridIndexAndSquareIndexFromMandalaChartInput,
} from '@/hooks/useMandalaChart.tsx/useMandalaChart.helper'
import { RecommendationCard } from '@/hooks/useRecommendationCard'
import { useEffect, useRef } from 'react'
import { CreateMandalaChartInput } from '../../../gql/graphql'
import Square, { SquareType } from './Square'

interface Props {
  wholeGridValues: CreateMandalaChartInput
  handleSquareValueManually: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
  handleSquareValueOnAIMode: (gridIndex: number, squareIndex: number) => void
  isAIModeOn: boolean
  recommendationItems: RecommendationCard[]
  onRecommendItemAccepted: () => void
}

const MandalaChart = ({
  wholeGridValues,
  handleSquareValueManually,
  handleSquareValueOnAIMode,
  isAIModeOn,
}: Props) => {
  const { isMobile } = useEntryContext()
  const focusRef = useRef<HTMLDivElement>(null)
  const { themeStyle } = useTheme()

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
        className={`grid grid-cols-3 w-max border-4 ${themeStyle.borderColor}`}
      >
        {new Array(9).fill('').map((values, gridIndex) => {
          const grid = getGridByIndexFromMandalaChartInput(
            wholeGridValues,
            gridIndex
          )
          const isGridValid = gridIndex === 4 ? true : grid.goal !== ''

          return (
            <div
              key={gridIndex}
              className={`grid grid-cols-3 w-max border border-4 ${themeStyle.borderColor}`}
            >
              {new Array(9).fill('').map((_, suqareIndex) => {
                const value =
                  getValueByGridIndexAndSquareIndexFromMandalaChartInput(
                    wholeGridValues,
                    gridIndex,
                    suqareIndex
                  )

                return (
                  <Square
                    key={suqareIndex}
                    type={isAIModeOn ? SquareType.AI : SquareType.MANUAL}
                    isGridValid={isGridValid}
                    value={value}
                    handleSquareValueManually={handleSquareValueManually}
                    handleSquareValueOnAIMode={handleSquareValueOnAIMode}
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
