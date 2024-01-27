import { useTheme } from '@/contexts/ThemeContext'
import Square, { SquareType } from './Square'

interface Props {
  wholeGridValues: string[][]
}

const DisplayingFullViewMandalaChart = ({ wholeGridValues }: Props) => {
  const { themeStyle } = useTheme()

  return (
    <div
      className={`grid grid-cols-3 w-max border-2 ${themeStyle.borderColor}`}
    >
      {wholeGridValues.map((values, gridIndex) => {
        return (
          <div
            key={gridIndex}
            className={`grid grid-cols-3 w-max border ${themeStyle.borderColor}`}
          >
            {values.map((value, suqareIndex) => {
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
