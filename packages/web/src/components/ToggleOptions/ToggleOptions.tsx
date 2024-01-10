import { useState } from 'react'

interface ToggleOptionsComponentProps {
  options: string[]
}

const ToggleOptionsComponent = ({ options }: ToggleOptionsComponentProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0] || '')

  const selectOption = (option: string) => {
    setSelectedOption(option)
  }

  return (
    <div className="flex justify-center items-center">
      {options.map((option, index) => (
        <button
          key={option}
          className={`px-4 py-2 ${
            selectedOption === option
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          } ${index > 0 ? 'border-l border-gray-300' : ''}
      first:rounded-l-lg last:rounded-r-lg`}
          onClick={() => selectOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default ToggleOptionsComponent
