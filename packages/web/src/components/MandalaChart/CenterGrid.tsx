import { useTheme } from '@/contexts/ThemeContext'
import Square from './Square'

interface Props {
  centerValues: string[]
  onCenterValueChange: (centerValueIndex: number) => (newValue: string) => void
  gridIndex: number
}

const CenterGrid = ({
  centerValues,
  onCenterValueChange,
  gridIndex,
}: Props) => {
  const { themeStyle } = useTheme()

  return (
    <div className={`grid grid-cols-3 gap-1 border ${themeStyle.gridBorder}`}>
      {Array.from({ length: 9 }).map((_, index) => {
        return (
          <Square
            key={index}
            value={centerValues[index]}
            onChange={onCenterValueChange(index)}
            isGridValid={true}
            squareIndex={index}
            gridIndex={4}
          />
        )
      })}
    </div>
  )
}

export default CenterGrid
