import { IS_SSR } from '@/constants/common'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props<K> {
  Modal: (props: K) => JSX.Element
  modalProps?: K
  onModalOpen?: () => void
  onModalClose?: () => void
}

const useModal = <T = {},>({
  Modal,
  modalProps = {} as T,
  onModalOpen = () => {},
  onModalClose = () => {},
}: Props<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModalProps, setCurrentModalProps] = useState<T>(modalProps)

  const openModal = (newModalProps?: T) => {
    onModalOpen()
    if (newModalProps) setCurrentModalProps(newModalProps)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    onModalClose()
    setIsModalOpen(false)
  }

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('is_modal')) return
      e.preventDefault()
    }

    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('scroll', handleScroll)

      const scrollBarWidth = window.innerWidth - document.body.clientWidth
      document.body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      document.body.style.overflow = 'unset'
      window.removeEventListener('scroll', handleScroll)

      document.body.style.paddingRight = ''
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.paddingRight = ''
    }
  }, [isModalOpen])

  useEffect(() => {
    const handleOverlayClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('is_overlay')) closeModal()
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }

    if (isModalOpen) {
      window.addEventListener('click', handleOverlayClick)
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('click', handleOverlayClick)
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('click', handleOverlayClick)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  useEffect(() => {
    const modal = document.querySelector('.is_modal')
    if (modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstFocusableElement = focusableElements[0]
      if (firstFocusableElement) (firstFocusableElement as HTMLElement).focus()
    }
  }, [isModalOpen])

  const ModalComponent = () => {
    return (
      !IS_SSR &&
      createPortal(
        isModalOpen && (
          <div className="is_overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="is_modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-60">
              {/* @ts-ignore */}
              <Modal
                {...currentModalProps}
                openModal={openModal}
                closeModal={closeModal}
              />
            </div>
          </div>
        ),
        document.getElementById('modal-root') as HTMLElement
      )
    )
  }

  return { openModal, closeModal, ModalComponent }
}

export default useModal
