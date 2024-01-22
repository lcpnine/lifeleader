import Alert from '@/components/Modal/Alert'
import useModal from '@/hooks/useModal'
import { ReactNode, createContext, useContext, useState } from 'react'

interface OpenAlertProps {
  text: string
  onClose?: () => void
}

const DefaultAlertContext = {
  openAlert: ({ text, onClose = () => {} }: OpenAlertProps) => {},
}

const AlertContext = createContext(DefaultAlertContext)

export const useAlert = () => useContext(AlertContext)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertProps, setAlertProps] = useState<{
    text: OpenAlertProps['text']
  }>({
    text: '',
  })
  const [onClose, setOnClose] = useState<OpenAlertProps['onClose']>(() => {})

  const { ModalComponent, openModal } = useModal({
    Modal: Alert,
    modalProps: {
      text: alertProps.text,
    },
    onModalClose: () => {
      onClose?.()
      setAlertProps({ text: '' })
    },
  })

  const openAlert = ({ text, onClose = () => {} }: OpenAlertProps) => {
    setOnClose(() => onClose)
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
