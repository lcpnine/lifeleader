import { useEffect, useState } from 'react'
import Square from './Square'

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
    const isCenterSquare = index === 4
    if (isCenterSquare) return

    const newValues = [...edgeValues]
    newValues[index] = newValue
    setEdgeValues(newValues)
  }

  useEffect(() => {
    const newEdgeValues = [...edgeValues]
    newEdgeValues[4] = centerValue
    setEdgeValues(newEdgeValues)
  }, [edgeValues])

  return (
    <div className="grid grid-cols-3 gap-1">
      {edgeValues.map((_, index) => {
        return (
          <Square
            key={index}
            value={edgeValues[index]}
            onChange={handleEdgeChange(index)}
            isCenterGrid={false}
            isCenterSquare={index === 4}
          />
        )
      })}
    </div>
  )
}

export default EdgeGrid
