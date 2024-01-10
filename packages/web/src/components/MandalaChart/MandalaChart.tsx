import { DIMMED_Z_INDEX } from '@/constants/common'
import { useState } from 'react'
import { deepCopy } from '../../../utils/common'
import Grid from './Grid'

interface Props {
  screenShotRef: React.RefObject<HTMLDivElement>
}

const MandalaChart = ({ screenShotRef }: Props) => {
  const [activeGrid, setActiveGrid] = useState<number | null>(null)
  const [wholeGridValues, setWholeGridValues] = useState<string[][]>(
    new Array(9).fill(new Array(9).fill(''))
  )

  const handleGridValue = (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => {
    const newGridValues = deepCopy(wholeGridValues)
    newGridValues[gridIndex][squareIndex] = newValue
    if (gridIndex === 4 && squareIndex !== 4) {
      newGridValues[squareIndex][gridIndex] = newValue
    }
    setWholeGridValues(newGridValues)
  }

  const handleGridActivation = (index: number) => {
    setActiveGrid(index)
  }

  const resetActiveGrid = () => {
    setActiveGrid(null)
  }

  return (
    <div className={`relative max-w-fit`} ref={screenShotRef}>
      {activeGrid !== null && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-[${DIMMED_Z_INDEX}]`}
          onClick={resetActiveGrid}
        ></div>
      )}
      {activeGrid !== null && (
        <button
          className={`absolute top-2 left-2 z-[${
            DIMMED_Z_INDEX + 1
          }] p-2 text-white bg-blue-500 rounded`}
          onClick={resetActiveGrid}
        >
          Back
        </button>
      )}
      <div className={`grid grid-cols-3 gap-3`}>
        {wholeGridValues.map((_, index) => (
          <Grid
            key={index}
            wholeGridValues={wholeGridValues}
            handleGridValue={handleGridValue}
            gridIndex={index}
          />
        ))}
      </div>
    </div>
  )
}

export default MandalaChart
