import { useTheme } from '@/contexts/theme/ThemeContext'

interface Props {
  value: string
  onChange: (newValue: string) => void
}

const Square = ({ value, onChange }: Props) => {
  const { themeStyle } = useTheme()

  return (
    <div
      className={`w-24 h-24 border ${themeStyle.borderColor} flex items-center justify-center ${themeStyle.backgroundColor}`}
    >
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full h-full text-center ${themeStyle.textColor}`}
      />
    </div>
  )
}

export default Square
