import { DefaultModalProps } from '@/hooks/useModal'
import { useState } from 'react'

type TextInputModalProps = {
  state: string
  setState: (value: string) => void
} & DefaultModalProps

const TextInputModal = ({
  state,
  setState,
  closeModal,
}: TextInputModalProps) => {
  const [inputValue, setInputValue] = useState(state)

  const handleSave = (e: React.MouseEvent) => {
    setState(inputValue)
    closeModal(e)
  }

  return (
    <div className="p-4 bg-white rounded-lg">
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
        <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default TextInputModal
