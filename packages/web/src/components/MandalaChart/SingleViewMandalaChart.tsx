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
  const [activeGrid, setActiveGrid] = useState<number>(4)
  const onModalClose = () => {
    setActiveGrid(4)
  }

  const { ModalComponent } = useModal({
    Modal: Grid,
    modalProps: {
      wholeGridValues,
      handleGridValue,
      gridIndex: activeGrid,
      isAIModeOn: false,
    },
    onModalClose,
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <Grid
        key={'main'}
        wholeGridValues={wholeGridValues}
        handleGridValue={handleGridValue}
        gridIndex={4}
        isAIModeOn={false}
      />
      {ModalComponent && <ModalComponent />}
    </div>
  )
}

export default SingleViewMandalaChart
