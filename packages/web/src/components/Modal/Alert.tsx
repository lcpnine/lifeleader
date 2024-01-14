import useI18n from '@/hooks/useI18n'
import TRANSLATIONS from './Alert.i18n'

interface Props {
  text: string
  closeModal: () => void
}

const Alert = ({ text, closeModal }: Props) => {
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)

  return (
    <div className="bg-white p-4 rounded flex flex-col items-center">
      <p className="mb-4 text-center">{text}</p>
      <button
        onClick={closeModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {translation('confirm')}
      </button>
    </div>
  )
}

export default Alert
