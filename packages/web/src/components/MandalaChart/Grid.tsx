import Square from './Square'

interface GridProps {
  wholeGridValues: string[][]
  handleGridValue: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
  gridIndex: number
}

const Grid = ({ wholeGridValues, handleGridValue, gridIndex }: GridProps) => {
  const isGridValid =
    gridIndex === 4 ? true : wholeGridValues[4][gridIndex] !== ''
  const values = wholeGridValues[gridIndex]

  return (
    <div className={`grid grid-cols-3 gap-1`}>
      {values.map((value, index) => (
        <Square
          key={index}
          value={value}
          handleGridValue={handleGridValue}
          isGridValid={isGridValid}
          gridIndex={gridIndex}
          squareIndex={index}
        />
      ))}
    </div>
  )
}

export default Grid
