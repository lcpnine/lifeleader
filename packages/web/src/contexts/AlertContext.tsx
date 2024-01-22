import Alert from '@/components/Modal/Alert'
import useModal from '@/hooks/useModal'
import { ReactNode, createContext, useContext, useState } from 'react'

const DefaultAlertContext = {
  openAlert: (text: string) => {},
}

const AlertContext = createContext(DefaultAlertContext)

export const useAlert = () => useContext(AlertContext)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertProps, setAlertProps] = useState({ text: '' })

  const { ModalComponent, openModal } = useModal({
    Modal: Alert,
    modalProps: {
      text: alertProps.text,
    },
    onModalClose: () => {
      setAlertProps({ text: '' })
    },
  })

  const openAlert = (text: string) => {
    openModal({ text })
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
