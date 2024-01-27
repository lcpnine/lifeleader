import { useTheme } from '@/contexts/ThemeContext'
import {
  getGridByIndexFromCreateMandalaChartInput,
  getSquareByIndexFromMandalaCellInput,
} from '@/hooks/useMandalaChart.tsx/useMandalaChart.helper'
import { CreateMandalaChartInput } from '../../../gql/graphql'
import Square, { SquareType } from './Square'

interface Props {
  wholeGridValues: CreateMandalaChartInput
}

const DisplayingFullViewMandalaChart = ({ wholeGridValues }: Props) => {
  const { themeStyle } = useTheme()

  return (
    <div
      className={`grid grid-cols-3 w-max border-2 ${themeStyle.borderColor}`}
    >
      {new Array(9).fill('').map((values, gridIndex) => {
        const grid = getGridByIndexFromCreateMandalaChartInput(
          wholeGridValues,
          gridIndex
        )
        return (
          <div
            key={gridIndex}
            className={`grid grid-cols-3 w-max border ${themeStyle.borderColor}`}
          >
            {new Array(9).fill('').map((_, suqareIndex) => {
              const value = getSquareByIndexFromMandalaCellInput(
                grid,
                suqareIndex
              )

              return (
                <Square
                  key={suqareIndex}
                  type={SquareType.DISPLAY}
                  value={value}
                  isGridValid={true}
                  gridIndex={gridIndex}
                  squareIndex={suqareIndex}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default DisplayingFullViewMandalaChart
