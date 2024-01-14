import Alert from '@/components/Modal/Alert'
import useModal from '@/hooks/useModal'
import { ReactNode, createContext, useContext, useState } from 'react'

const DefaultAlertContext = {
  openAlert: (text: string) => {},
}

const AlertContext = createContext(DefaultAlertContext)

export const useAlert = () => useContext(AlertContext)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertProps, setAlertProps] = useState({ text: '', isOpen: false })

  const closeModal = () => setAlertProps({ text: '', isOpen: false })

  const { ModalComponent } = useModal({
    modal: <Alert text={alertProps.text} closeModal={closeModal} />,
    isModalOpen: alertProps.isOpen,
    closeModal,
  })

  const openAlert = (text: string) => {
    setAlertProps({ text, isOpen: true })
  }

  const value = {
    openAlert,
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      <ModalComponent />
    </AlertContext.Provider>
  )
}
