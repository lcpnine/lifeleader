import Grid from './Grid'

interface Props {
  wholeGridValues: string[][]
  handleGridValue: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
  isAIModeOn: boolean
}

const FullViewMandalaChart = ({
  wholeGridValues,
  handleGridValue,
  isAIModeOn,
}: Props) => {
  return (
    <div className={`grid grid-cols-3 gap-3 w-max`}>
      {wholeGridValues.map((_, index) => (
        <Grid
          key={index}
          wholeGridValues={wholeGridValues}
          handleGridValue={handleGridValue}
          gridIndex={index}
          isAIModeOn={isAIModeOn}
        />
      ))}
    </div>
  )
}

export default FullViewMandalaChart
