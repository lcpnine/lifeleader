interface Props {
  value: string
  onChange: (newValue: string) => void
}

const Square = ({ value, onChange }: Props) => (
  <div className="w-24 h-24 border border-gray-200 flex items-center justify-center">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full h-full text-center"
    />
  </div>
)

export default Square
