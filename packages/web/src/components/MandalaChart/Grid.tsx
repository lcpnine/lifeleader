import Square from './Square'

interface GridProps {
  wholeGridValues: string[][]
  handleGridValue: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
  getHandleDoubleClick?: (squareIndex: number) => () => void
  gridIndex: number
}

const Grid = ({
  wholeGridValues,
  handleGridValue,
  getHandleDoubleClick,
  gridIndex,
}: GridProps) => {
  const isGridValid =
    gridIndex === 4 ? true : wholeGridValues[4][gridIndex] !== ''
  const values = wholeGridValues[gridIndex]

  return (
    <div className={`grid grid-cols-3 gap-1 w-max`}>
      {values.map((value, suqareIndex) => {
        const handleDoubleClick =
          getHandleDoubleClick && getHandleDoubleClick(suqareIndex)

        return (
          <Square
            key={suqareIndex}
            value={value}
            handleGridValue={handleGridValue}
            handleDoubleClick={handleDoubleClick}
            isGridValid={isGridValid}
            gridIndex={gridIndex}
            squareIndex={suqareIndex}
          />
        )
      })}
    </div>
  )
}

export default Grid
