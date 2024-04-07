import { ChangeEventHandler } from 'react'

interface Props {
  label?: string
  placeholder: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  guide?: string
}

const CheckboxInput = ({
  label,
  placeholder,
  value,
  onChange,
  guide,
}: Props) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-1">
          {label}
        </label>
      )}
      {guide && <div className="text-gray-600 text-sm mb-1">{guide}</div>}
      <input
        type="checkbox"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border p-2 w-full"
      />
    </div>
  )
}

export default CheckboxInput
