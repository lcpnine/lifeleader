import Alert from '@/components/Modal/Alert'
import useI18n from '@/hooks/useI18n'
import useModal from '@/hooks/useModal'
import useModalState from '@/hooks/useModalState'
import { useState } from 'react'
import Grid from './Grid'
import TRANSLATIONS from './SingleViewMandalaChart.i18n'

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
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)
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
      <Alert text={translation('alertText')} closeModal={closeAlertModal} />
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
