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
  return (
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
  )
}

export default SingleViewMandalaChart
