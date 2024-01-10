import ToggleOptionsComponent from '@/components/ToggleOptions/ToggleOptions'
import { useState } from 'react'

interface Props {
  options: string[]
}

const useToggleOptions = ({ options }: Props) => {
  const [selectedOption, setSelectedOption] = useState(options[0])

  return {
    selectedOption,
    setSelectedOption,
    Component: (
      <ToggleOptionsComponent
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={options}
      />
    ),
  }
}

export default useToggleOptions
