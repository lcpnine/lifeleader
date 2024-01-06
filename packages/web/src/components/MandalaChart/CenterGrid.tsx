import { useTheme } from '@/contexts/theme/ThemeContext'
import Square from './Square'

interface Props {
  centerValues: string[]
  onCenterValueChange: (centerValueIndex: number) => (newValue: string) => void
}

const CenterGrid = ({ centerValues, onCenterValueChange }: Props) => {
  const { themeStyle } = useTheme()

  return (
    <div className={`grid grid-cols-3 gap-1 border ${themeStyle.gridBorder}`}>
      {Array.from({ length: 9 }).map((_, index) => {
        return (
          <Square
            key={index}
            value={centerValues[index]}
            onChange={onCenterValueChange(index)}
            isCenterGrid={true}
            isCenterSquare={index === 4}
            isGridValid={true}
          />
        )
      })}
    </div>
  )
}

export default CenterGrid
