import { useDimmedScreenContext } from '@/contexts/DimmedScreenContext'
import { useEffect, useState } from 'react'
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
  const { isDimmedScreenOpen, openDimmedScreen, closeDimmedScreen } =
    useDimmedScreenContext()
  const [activeGrid, setActiveGrid] = useState<number>(4) // Default to the central grid
  const getSubGridClassName = () => {
    switch (activeGrid) {
      case 0:
        return '-left-8 -top-8 shadow-top-left'
      case 1:
        return '-top-8 -left-0 shadow-top'
      case 2:
        return '-top-8 -right-8 shadow-top-right'
      case 3:
        return '-left-8 -top-0 shadow-left'
      case 5:
        return '-right-8 -top-0 shadow-right'
      case 6:
        return '-left-8 -bottom-8 shadow-bottom-left'
      case 7:
        return '-bottom-8 -left-0 shadow-bottom'
      case 8:
        return '-bottom-8 -right-8 shadow-bottom-right'
      default:
        return ''
    }
  }

  const getHandleArrowClick = (gridIndex: number) => () => {
    setActiveGrid(gridIndex)
    openDimmedScreen()
  }

  useEffect(() => {
    if (!isDimmedScreenOpen) {
      setActiveGrid(4)
    }
  }, [isDimmedScreenOpen])

  return (
    <div className="flex-col justify-center align-bottom">
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center">
          <BiSolidLeftTopArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={getHandleArrowClick(0)}
          />
        </div>
        <div className="flex justify-center items-center">
          <BiSolidUpArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={getHandleArrowClick(1)}
          />
        </div>
        <div className="flex justify-center items-center">
          <BiSolidRightTopArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={getHandleArrowClick(2)}
          />
        </div>
      </div>
      <div className="flex w-fit">
        <div className="flex justify-center items-center">
          <BiSolidLeftArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={getHandleArrowClick(3)}
          />
        </div>
        <div className="relative justify-center items-center m-4">
          <div className={`absolute bg-white ${getSubGridClassName()}`}>
            {activeGrid !== 4 && (
              <Grid
                key={'sub' + activeGrid}
                wholeGridValues={wholeGridValues}
                handleGridValue={handleGridValue}
                gridIndex={activeGrid}
              />
            )}
          </div>
          <div>
            <Grid
              key={'main'}
              wholeGridValues={wholeGridValues}
              handleGridValue={handleGridValue}
              gridIndex={4}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <BiSolidRightArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={getHandleArrowClick(5)}
          />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center">
          <BiSolidLeftDownArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={getHandleArrowClick(6)}
          />
        </div>
        <div className="flex justify-center items-center">
          <BiSolidDownArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={getHandleArrowClick(7)}
          />
        </div>
        <div className="flex justify-center items-center">
          <BiSolidRightDownArrowCircle
            size="2em"
            className="hover:text-blue-600 cursor-pointer"
            onClick={getHandleArrowClick(8)}
          />
        </div>
      </div>
    </div>
  )
}

export default SingleViewMandalaChart
