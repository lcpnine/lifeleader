import { useState } from 'react'

interface Props {
  onModalOpen?: () => void
  onModalClose?: () => void
}

const useModalState = ({
  onModalOpen = () => {},
  onModalClose = () => {},
}: Props = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    onModalOpen()
    setIsModalOpen(true)
  }
  const closeModal = () => {
    onModalClose()
    setIsModalOpen(false)
  }
  return { isModalOpen, openModal, closeModal }
}

export default useModalState
