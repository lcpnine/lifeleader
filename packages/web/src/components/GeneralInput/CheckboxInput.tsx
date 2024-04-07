import { ChangeEventHandler } from 'react'

interface Props {
  label?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  link?: string
  guide?: string
}

const CheckboxInput = ({ label, value, onChange, link, guide }: Props) => {
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
          <label
            className={`ml-2 text-gray-700 text-sm font-bold ${
              link ? 'cursor-pointer hover:text-blue-700 hover:underline' : ''
            }`}
            onClick={() => link && window.open(link, '_blank')}
          >
            {label}
          </label>
        )}
      </div>
      {guide && <div className="text-gray-600 text-sm mt-1">{guide}</div>}
    </div>
  )
}

export default CheckboxInput
