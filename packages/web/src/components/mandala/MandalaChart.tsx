import { useState } from 'react'
import CenterGrid from './CenterGrid'
import EdgeGrid from './EdgeGrid'

const MandalaChart = () => {
  const [centerValues, setCenterValues] = useState(Array(9).fill(''))

  const handleCenterValueChange = (index: number) => (newValue: string) => {
    const newValues = [...centerValues]
    newValues[index] = newValue
    setCenterValues(newValues)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, index) => {
        const isCenterSquareGrid = index === 4

        return isCenterSquareGrid ? (
          <CenterGrid
            centerValues={centerValues}
            onCenterValueChange={handleCenterValueChange}
          />
        ) : (
          <EdgeGrid key={index} centerValue={centerValues[index]} />
        )
      })}
    </div>
  )
}

export default MandalaChart
