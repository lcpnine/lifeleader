import useModal from '@/hooks/useModal'
import useModalState from '@/hooks/useModalState'
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

  const {
    isModalOpen: isGridModalOpen,
    openModal: openGridModal,
    closeModal: closeGridModal,
  } = useModalState({
    onModalClose: () => {
      setActiveGrid(4)
    },
  })
  const { ModalComponent } = useModal({
    isModalOpen: isGridModalOpen,
    closeModal: closeGridModal,
    modal: (
      <Grid
        key={'sub' + activeGrid}
        wholeGridValues={wholeGridValues}
        handleGridValue={handleGridValue}
        gridIndex={activeGrid}
        isAIModeOn={false}
      />
    ),
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
