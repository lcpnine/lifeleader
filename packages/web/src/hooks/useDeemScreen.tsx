import { DIMMED_Z_INDEX } from '@/constants/common'
import { useState } from 'react'

const useDeemScreen = () => {
  const [isDeemScreenOpen, setIsDeemScreenOpen] = useState(false)

  const openDeemScreen = () => {
    setIsDeemScreenOpen(true)
  }

  const closeDeemScreen = () => {
    setIsDeemScreenOpen(false)
  }

  const DeemScreen = () => {
    return (
      isDeemScreenOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-[${DIMMED_Z_INDEX}]`}
          onClick={closeDeemScreen}
        ></div>
      )
    )
  }

  return {
    openDeemScreen,
    closeDeemScreen,
    DeemScreen,
  }
}

export default useDeemScreen
