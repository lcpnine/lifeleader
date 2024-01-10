import { DIMMED_Z_INDEX } from '@/constants/common'
import { MandalaChartView } from '@/constants/mandalaChart'
import { useState } from 'react'
import {
  ImArrowDown,
  ImArrowDownLeft,
  ImArrowDownRight,
  ImArrowLeft,
  ImArrowRight,
  ImArrowUp,
  ImArrowUpLeft,
  ImArrowUpRight,
} from 'react-icons/im'
import { deepCopy } from '../../../utils/common'
import Grid from './Grid'

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
      ) : (
        <div className="flex-col justify-center align-bottom">
          <div className="flex w-full justify-between">
            <div className="flex justify-center items-center basis-[3px]">
              <ImArrowUpLeft size="2em" />
            </div>
            <div className="flex justify-center items-center basis-[3px]">
              <ImArrowUp size="2em" />
            </div>
            <div className="flex justify-center items-center basis-[3px]">
              <ImArrowUpRight size="2em" />
            </div>
          </div>
          <div className="flex w-fit">
            <div className="flex justify-center items-center basis-[3px]">
              <ImArrowLeft size="2em" />
            </div>
            <div className="flex justify-center items-center">
              <Grid
                key={'init'}
                wholeGridValues={wholeGridValues}
                handleGridValue={handleGridValue}
                gridIndex={4}
              />
            </div>
            <div className="flex justify-center items-center basis-[3px]">
              <ImArrowRight size="2em" />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex justify-center items-center basis-[3px]">
              <ImArrowDownLeft size="2em" />
            </div>
            <div className="flex justify-center items-center basis-[3px]">
              <ImArrowDown size="2em" />
            </div>
            <div className="flex justify-center items-center basis-[3px]">
              <ImArrowDownRight size="2em" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MandalaChart
