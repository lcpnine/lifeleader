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
import Grid from './Grid'

interface Props {
  wholeGridValues: string[][]
  handleGridValue: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
}

const SingleViewMandalaChart = ({
  wholeGridValues,
  handleGridValue,
}: Props) => {
  const [activeGrid, setActiveGrid] = useState<number>(4) // Default to the central grid

  return (
    <div className="flex-col justify-center align-bottom">
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center">
          <BiSolidLeftTopArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => setActiveGrid(0)}
          />
        </div>
        <div className="flex justify-center items-center">
          <BiSolidUpArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => setActiveGrid(1)}
          />
        </div>
        <div className="flex justify-center items-center">
          <BiSolidRightTopArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => setActiveGrid(2)}
          />
        </div>
      </div>
      <div className="flex w-fit">
        <div className="flex justify-center items-center">
          <BiSolidLeftArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => setActiveGrid(3)}
          />
        </div>
        <div className="flex justify-center items-center m-4">
          {activeGrid !== 4 && (
            <Grid
              key={'sub' + activeGrid}
              wholeGridValues={wholeGridValues}
              handleGridValue={handleGridValue}
              gridIndex={activeGrid}
            />
          )}
          <Grid
            key={'main'}
            wholeGridValues={wholeGridValues}
            handleGridValue={handleGridValue}
            gridIndex={4}
          />
        </div>
        <div className="flex justify-center items-center">
          <BiSolidRightArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => setActiveGrid(5)}
          />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center">
          <BiSolidLeftDownArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => setActiveGrid(6)}
          />
        </div>
        <div className="flex justify-center items-center">
          <BiSolidDownArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => setActiveGrid(7)}
          />
        </div>
        <div className="flex justify-center items-center">
          <BiSolidRightDownArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => setActiveGrid(8)}
          />
        </div>
      </div>
    </div>
  )
}

export default SingleViewMandalaChart
