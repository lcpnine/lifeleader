import { useTheme } from '@/contexts/theme/ThemeContext'
import { useEffect, useState } from 'react'
import Square from './Square'

interface EdgeGridProps {
  centerValue: string
  gridIndex: number
}

const EdgeGrid = ({ centerValue, gridIndex }: EdgeGridProps) => {
  const isGridValid = centerValue !== ''
  const { themeStyle } = useTheme()
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
  }, [centerValue])

  return (
    <div className={`grid grid-cols-3 gap-1 border ${themeStyle.gridBorder}`}>
      {edgeValues.map((_, index) => {
        return (
          <Square
            key={index}
            value={edgeValues[index]}
            onChange={handleEdgeChange(index)}
            isCenterGrid={false}
            isCenterSquare={index === 4}
            isGridValid={isGridValid}
            gridIndex={gridIndex}
            squareIndex={index}
          />
        )
      })}
    </div>
  )
}

export default EdgeGrid
