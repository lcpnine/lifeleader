import React, { useState } from 'react'

interface SqureProps {
  value: string
  onChange: (newValue: string) => void
}

const Square = ({ value, onChange }: SqureProps) => (
  <div className="w-24 h-24 border border-gray-200 flex items-center justify-center">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full h-full text-center"
    />
  </div>
)

interface GridProps {
  centerValue: string
  onCenterChange: (newValue: string) => void
}

const Grid = ({ centerValue, onCenterChange }: GridProps) => (
  <div className="grid grid-cols-3 gap-1">
    {Array.from({ length: 9 }).map((_, index) => {
      const isCenter = index === 4 // index 4 is the center square
      return (
        <Square
          key={index}
          value={isCenter ? centerValue : ''}
          onChange={isCenter ? onCenterChange : () => {}}
        />
      )
    })}
  </div>
)

const MandalaChart: React.FC = () => {
  const [centerValues, setCenterValues] = useState(Array(9).fill(''))

  const handleCenterChange = (index: number) => (newValue: string) => {
    const newValues = [...centerValues]
    newValues[index] = newValue
    setCenterValues(newValues)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <Grid
          key={index}
          centerValue={centerValues[index]}
          onCenterChange={handleCenterChange(index)}
        />
      ))}
    </div>
  )
}

export default MandalaChart
