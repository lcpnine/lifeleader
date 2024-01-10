import { DIMMED_Z_INDEX } from '@/constants/common'
import { MandalaChartView } from '@/constants/mandalaChart'
import { useState } from 'react'
import {
  BiSolidDownArrowCircle,
  BiSolidLeftArrowCircle,
  BiSolidLeftDownArrowCircle,
  BiSolidLeftTopArrowCircle,
  BiSolidRightArrowCircle,
  BiSolidRightDownArrowCircle,
  BiSolidRightTopArrowCircle,
  BiSolidUpArrowCircle,
} from 'react-icons/bi'
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
            <div className="flex justify-center items-center">
              <BiSolidLeftTopArrowCircle
                size="2em"
                className="hover:text-blue-600 cursor-pointer"
              />
            </div>
            <div className="flex justify-center items-center">
              <BiSolidUpArrowCircle
                size="2em"
                className="hover:text-blue-600 cursor-pointer"
              />
            </div>
            <div className="flex justify-center items-center">
              <BiSolidRightTopArrowCircle
                size="2em"
                className="hover:text-blue-600 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex w-fit">
            <div className="flex justify-center items-center">
              <BiSolidLeftArrowCircle
                size="2em"
                className="hover:text-blue-600 cursor-pointer"
              />
            </div>
            <div className="flex justify-center items-center m-4">
              <Grid
                key={'init'}
                wholeGridValues={wholeGridValues}
                handleGridValue={handleGridValue}
                gridIndex={4}
              />
            </div>
            <div className="flex justify-center items-center">
              <BiSolidRightArrowCircle
                size="2em"
                className="hover:text-blue-600 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex justify-center items-center">
              <BiSolidLeftDownArrowCircle
                size="2em"
                className="hover:text-blue-600 cursor-pointer"
              />
            </div>
            <div className="flex justify-center items-center">
              <BiSolidDownArrowCircle
                size="2em"
                className="hover:text-blue-600 cursor-pointer"
              />
            </div>
            <div className="flex justify-center items-center">
              <BiSolidRightDownArrowCircle
                size="2em"
                className="hover:text-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MandalaChart
