import useModal from '@/hooks/useModal'
import { useState } from 'react'
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
  const { ModalComponent, openModal } = useModal({
    modal: (
      <Grid
        key={'sub' + activeGrid}
        wholeGridValues={wholeGridValues}
        handleGridValue={handleGridValue}
        gridIndex={activeGrid}
      />
    ),
  })

  const checkIsSubGridValid = (gridIndex: number) => {
    return wholeGridValues[4][gridIndex] !== ''
  }

  const getHandleDoubleClick = (squareIndex: number) => () => {
    if (squareIndex === 4) return
    else {
      const isGridValid = checkIsSubGridValid(squareIndex)
      if (isGridValid) {
        setActiveGrid(squareIndex)
        openModal()
      } else {
        alert('Set your sub goal first')
      }

      return
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Grid
        key={'main'}
        wholeGridValues={wholeGridValues}
        handleGridValue={handleGridValue}
        getHandleDoubleClick={getHandleDoubleClick}
        gridIndex={4}
      />
      {ModalComponent && <ModalComponent />}
    </div>
  )
}

export default SingleViewMandalaChart
