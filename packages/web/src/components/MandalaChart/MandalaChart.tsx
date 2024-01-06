import { useTheme } from '@/contexts/theme/ThemeContext'
import { useState } from 'react'
import CenterGrid from './CenterGrid'
import EdgeGrid from './EdgeGrid'

const MandalaChart = () => {
  const { themeStyle } = useTheme()
  const [centerValues, setCenterValues] = useState(Array(9).fill(''))

  const handleCenterValueChange = (index: number) => (newValue: string) => {
    const newValues = [...centerValues]
    newValues[index] = newValue
    setCenterValues(newValues)
  }

  return (
    <div className={`grid grid-cols-3 gap-3 max-w-fit`}>
      {Array.from({ length: 9 }).map((_, index) => {
        const isCenterSquareGrid = index === 4

        return isCenterSquareGrid ? (
          <CenterGrid
            key={index}
            centerValues={centerValues}
            onCenterValueChange={handleCenterValueChange}
            gridIndex={index}
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
  )
}

export default MandalaChart
