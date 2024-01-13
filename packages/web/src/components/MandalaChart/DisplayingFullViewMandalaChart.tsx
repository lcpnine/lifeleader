import DisplayingSquare from './DisplayingSquare'

interface Props {
  wholeGridValues: string[][]
}

const DisplayingFullViewMandalaChart = ({ wholeGridValues }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-3 w-max">
      {wholeGridValues.map((values, gridIndex) => {
        return (
          <div key={gridIndex} className="grid grid-cols-3 gap-1 w-max">
            {values.map((value, suqareIndex) => {
              return (
                <DisplayingSquare
                  key={suqareIndex}
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
