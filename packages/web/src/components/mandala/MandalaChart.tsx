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

interface CenterGridProps {
  centerValues: string[]
  onCenterValueChange: (centerValueIndex: number) => (newValue: string) => void
}

const CenterGrid = ({ centerValues, onCenterValueChange }: CenterGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 9 }).map((_, index) => {
        return (
          <Square
            key={index}
            value={centerValues[index]}
            onChange={onCenterValueChange(index)}
          />
        )
      })}
    </div>
  )
}

interface EdgeGridProps {
  centerValue: string
}

const EdgeGrid = ({ centerValue }: EdgeGridProps) => {
  const [edgeValues, setEdgeValues] = useState([
    '',
    '',
    '',
    '',
    centerValue,
    '',
    '',
    '',
    '',
  ])

  const handleEdgeChange = (index: number) => (newValue: string) => {
    const isCenter = index === 4
    if (isCenter) return

    const newValues = [...edgeValues]
    newValues[index] = newValue
    setEdgeValues(newValues)
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {edgeValues.map((_, index) => {
        return (
          <Square
            key={index}
            value={edgeValues[index]}
            onChange={handleEdgeChange(index)}
          />
        )
      })}
    </div>
  )
}

const MandalaChart: React.FC = () => {
  const [centerValues, setCenterValues] = useState(Array(9).fill(''))

  const handleCenterValueChange = (index: number) => (newValue: string) => {
    const newValues = [...centerValues]
    newValues[index] = newValue
    setCenterValues(newValues)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, index) => {
        const isCenterGrid = index === 4

        return isCenterGrid ? (
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
