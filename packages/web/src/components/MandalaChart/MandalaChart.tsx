import { DIMMED_Z_INDEX } from '@/constants/common'
import { MandalaChartView } from '@/constants/mandalaChart'
import { useState } from 'react'
import { deepCopy } from '../../../utils/common'
import FullViewMandalaChart from './FullViewMandalaChart'
import SingleViewMandalaChart from './SingleViewMandalaChart'

interface Props {
  viewOption: MandalaChartView
  screenShotRef: React.RefObject<HTMLDivElement>
}

const MandalaChart = ({ viewOption, screenShotRef }: Props) => {
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
      {viewOption === MandalaChartView.FULL_VIEW ? (
        <FullViewMandalaChart
          wholeGridValues={wholeGridValues}
          handleGridValue={handleGridValue}
        />
      ) : (
        <SingleViewMandalaChart
          wholeGridValues={wholeGridValues}
          handleGridValue={handleGridValue}
        />
      )}
    </div>
  )
}

export default MandalaChart
