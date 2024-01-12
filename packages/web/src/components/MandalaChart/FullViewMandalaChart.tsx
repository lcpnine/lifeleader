import Grid from './Grid'

interface Props {
  wholeGridValues: string[][]
  handleGridValue: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
}

const FullViewMandalaChart = ({ wholeGridValues, handleGridValue }: Props) => {
  return (
    <div className={`grid grid-cols-3 gap-3 w-max`}>
      {wholeGridValues.map((_, index) => (
        <Grid
          key={index}
          wholeGridValues={wholeGridValues}
          handleGridValue={handleGridValue}
          gridIndex={index}
        />
      ))}
    </div>
  )
}

export default FullViewMandalaChart
