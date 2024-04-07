import { ChangeEventHandler } from 'react'

interface Props {
  label?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  guide?: string
}

const CheckboxInput = ({ label, value, onChange, guide }: Props) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          value={value}
          onChange={onChange}
          className="border p-2"
        />
        {label && (
          <label className="ml-2 text-gray-700 text-sm font-bold">
            {label}
          </label>
        )}
      </div>
      {guide && <div className="text-gray-600 text-sm mt-1">{guide}</div>}
    </div>
  )
}

export default CheckboxInput
