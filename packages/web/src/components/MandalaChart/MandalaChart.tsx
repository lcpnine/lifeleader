import { DIMMED_Z_INDEX } from '@/constants/common'
import { useState } from 'react'
import CenterGrid from './CenterGrid'
import EdgeGrid from './EdgeGrid'

interface Props {
  screenShotRef: React.RefObject<HTMLDivElement>
}

const MandalaChart = ({ screenShotRef }: Props) => {
  const [centerValues, setCenterValues] = useState(Array(9).fill(''))
  const [activeGrid, setActiveGrid] = useState<number | null>(null)

  const handleCenterValueChange = (index: number) => (newValue: string) => {
    const newValues = [...centerValues]
    newValues[index] = newValue
    setCenterValues(newValues)
  }

  const handleGridActivation = (index: number) => {
    setActiveGrid(index)
  }

  const resetActiveGrid = () => {
    setActiveGrid(null)
  }

  return (
    <div className={`relative max-w-fit`} ref={screenShotRef}>
      {activeGrid !== null && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-[${DIMMED_Z_INDEX}]`}
          onClick={resetActiveGrid}
        ></div>
      )}
      {activeGrid !== null && (
        <button
          className={`absolute top-2 left-2 z-[${
            DIMMED_Z_INDEX + 1
          }] p-2 text-white bg-blue-500 rounded`}
          onClick={resetActiveGrid}
        >
          Back
        </button>
      )}
      <div className={`grid grid-cols-3 gap-3`}>
        {Array.from({ length: 9 }).map((_, index) => {
          const isCenterSquareGrid = index === 4

          return isCenterSquareGrid ? (
            <CenterGrid
              key={index}
              centerValues={centerValues}
              onCenterValueChange={handleCenterValueChange}
            />
          ) : (
            <EdgeGrid
              key={index}
              centerValue={centerValues[index]}
              gridIndex={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default MandalaChart
