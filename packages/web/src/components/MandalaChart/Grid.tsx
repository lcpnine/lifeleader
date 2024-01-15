import useI18n from '@/hooks/useI18n'
import DisplayingSquare from './DisplayingSquare'
import Square from './Square'
import TRANSLATIONS from './Square.i18n'

interface GridProps {
  wholeGridValues: string[][]
  handleGridValue: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
  getHandleDoubleClick?: (squareIndex: number) => () => void
  gridIndex: number
  isAIModeOn: boolean
}

const Grid = ({
  wholeGridValues,
  handleGridValue,
  getHandleDoubleClick,
  gridIndex,
  isAIModeOn,
}: GridProps) => {
  const isGridValid =
    gridIndex === 4 ? true : wholeGridValues[4][gridIndex] !== ''
  const values = wholeGridValues[gridIndex]
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)

  const getSquarePlaceHolder = (
    isCenterGrid: boolean,
    isCenterSquare: boolean,
    gridIndex: number,
    squareIndex: number
  ) => {
    if (isCenterGrid && isCenterSquare) return translation('mainGoal')
    if (isCenterGrid && !isCenterSquare)
      return `${translation('subGoal')} ${
        squareIndex < 4 ? squareIndex + 1 : squareIndex
      }`
    if (!isCenterGrid && isCenterSquare)
      return `${translation('subGoal')} ${
        gridIndex < 4 ? gridIndex + 1 : gridIndex
      }`
    return ''
  }

  const isCenterGrid = gridIndex === 4
  return (
    <div className={`grid grid-cols-3 gap-1 w-max`}>
      {values.map((value, squareIndex) => {
        const isCenterSquare = squareIndex === 4
        const handleDoubleClick =
          getHandleDoubleClick && getHandleDoubleClick(squareIndex)

        const placeHolder = getSquarePlaceHolder(
          isCenterGrid,
          isCenterSquare,
          gridIndex,
          squareIndex
        )

        return isAIModeOn ? (
          <DisplayingSquare
            key={squareIndex}
            value={value}
            isGridValid={isGridValid}
            gridIndex={gridIndex}
            squareIndex={squareIndex}
            placeHolder={placeHolder}
          />
        ) : (
          <Square
            key={squareIndex}
            value={value}
            handleGridValue={handleGridValue}
            handleDoubleClick={handleDoubleClick}
            isGridValid={isGridValid}
            gridIndex={gridIndex}
            squareIndex={squareIndex}
            placeHolder={placeHolder}
          />
        )
      })}
    </div>
  )
}

export default Grid
