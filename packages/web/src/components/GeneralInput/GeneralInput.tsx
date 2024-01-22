import { ChangeEventHandler } from 'react'

interface Props {
  label?: string // Optional label for the input
  type: string
  placeholder: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  invalidCondition?: boolean
  invalidAlert?: string
  guide?: string
}

const GeneralInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  invalidCondition,
  invalidAlert,
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
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border p-2 w-full ${
          invalidCondition ? 'border-red-500' : ''
        }`}
      />
      {invalidCondition && (
        <div className="text-red-500 text-sm mt-1">{invalidAlert}</div>
      )}
    </div>
  )
}

export default GeneralInput
