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

  return (
    <div className={`relative max-w-fit`} ref={screenShotRef}>
      {viewOption === MandalaChartView.FULL_VIEW ? (
        <FullViewMandalaChart
          wholeGridValues={wholeGridValues}
          handleGridValue={handleGridValue}
        />
      ) : (
        <div>
          <SingleViewMandalaChart
            wholeGridValues={wholeGridValues}
            handleGridValue={handleGridValue}
          />
          <div className="flex justify-center items-center text-center text-gray-500">
            Sorry, We are still working on this feature. Please come back later.
          </div>
        </div>
      )}
    </div>
  )
}

export default MandalaChart
