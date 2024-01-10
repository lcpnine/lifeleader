import ToggleOptionsComponent from '@/components/ToggleOptions/ToggleOptions'
import { useState } from 'react'

interface Props {
  initOption?: string
  options: string[]
}

const useToggleOptions = ({ initOption, options }: Props) => {
  const [selectedOption, setSelectedOption] = useState(initOption ?? options[0])

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
