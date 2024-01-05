import Square from './Square'

interface Props {
  centerValues: string[]
  onCenterValueChange: (centerValueIndex: number) => (newValue: string) => void
}

const CenterGrid = ({ centerValues, onCenterValueChange }: Props) => {
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

export default CenterGrid
