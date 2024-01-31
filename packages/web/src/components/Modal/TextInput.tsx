import { DefaultModalProps } from '@/hooks/useModal'
import { useEffect, useRef, useState } from 'react'

type TextInputModalProps = {
  state: string
  setState: (value: string) => void
  type?: 'text' | 'textarea'
} & DefaultModalProps

const TextInputModal = ({
  state,
  setState,
  type = 'text',
  closeModal,
}: TextInputModalProps) => {
  const [inputValue, setInputValue] = useState(state)
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const handleSave = (e: React.MouseEvent | React.KeyboardEvent) => {
    setState(inputValue)
    closeModal(e)
  }

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div className="p-4 bg-white rounded-lg">
      {type === 'text' ? (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave(e)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      ) : (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded resize-none"
        />
      )}
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
