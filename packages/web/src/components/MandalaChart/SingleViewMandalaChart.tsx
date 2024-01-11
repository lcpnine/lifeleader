import Alert from '@/components/Modal/Alert'
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
  const [activeGrid, setActiveGrid] = useState<number>(4) // Default to the central grid

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
      />
    ),
  })

  const {
    isModalOpen: isAlertModalOpen,
    openModal: openAlertModal,
    closeModal: closeAlertModal,
  } = useModalState()
  const { ModalComponent: AlertModalComponent } = useModal({
    isModalOpen: isAlertModalOpen,
    closeModal: closeAlertModal,
    modal: (
      <Alert text="Set your sub goal first" closeModal={closeAlertModal} />
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
        openGridModal()
      } else {
        openAlertModal()
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
      {AlertModalComponent && <AlertModalComponent />}
    </div>
  )
}

export default SingleViewMandalaChart
