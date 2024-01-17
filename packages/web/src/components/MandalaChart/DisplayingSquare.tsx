import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'
import useModal from '@/hooks/useModal'
import TextInputModal from '../Modal/TextInput'

interface Props {
  value: string
  gridIndex: number
  squareIndex: number
  isGridValid: boolean
  placeHolder?: string
  handleGridValue?: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
}

const DisplayingSquare = ({
  value,
  gridIndex,
  squareIndex,
  isGridValid,
  placeHolder = '',
  handleGridValue = () => {},
}: Props) => {
  // Text Input Section
  const setSquareValue = (newValue: string) => {
    handleGridValue(gridIndex, squareIndex, newValue)
  }
  const { openModal, ModalComponent } = useModal({
    Modal: TextInputModal,
    modalProps: {
      state: value,
      setState: setSquareValue,
    },
  })

  const isCenterGrid = gridIndex === 4
  const isCenterSquare = squareIndex === 4
  const { themeStyle } = useTheme()
  const { isMobile } = useEntryContext()

  const textBold = isCenterSquare ? 'font-bold' : ''

  const textColor = !isCenterSquare
    ? themeStyle.defualtTextColor
    : isCenterGrid
      ? themeStyle.centerGridCenterSquareTextColor
      : themeStyle.edgeGridCenterSquareTextColor

  return (
    <div
      className={`${isMobile ? 'size-20' : 'size-24'} border ${
        themeStyle.borderColor
      } flex items-center justify-center overflow-hidden ${
        themeStyle.backgroundColor
      } ${isGridValid ? 'cursor-text' : 'bg-opacity-25'}`}
      onClick={() => openModal()}
    >
      <span
        className={`w-full max-h-${
          isMobile ? '20' : '24'
        } text-center ${textColor} ${textBold} p-0 inline-block focus:outline-none
        ${
          !value && placeHolder
            ? squareIndex === 4
              ? 'text-opacity-75'
              : 'text-opacity-25'
            : ''
        }
        `}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {value ? value : placeHolder}
      </span>
      {ModalComponent && <ModalComponent />}
    </div>
  )
}

export default DisplayingSquare
