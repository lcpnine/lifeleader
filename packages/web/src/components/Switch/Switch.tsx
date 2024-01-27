type Props = {
  isSwitchOn: boolean
  handleSwitch: () => void
}

const Switch = ({ isSwitchOn, handleSwitch }: Props) => {
  return (
    <label className="flex items-center cursor-pointer">
      <p className="text-xs font-semibold pr-2">OFF</p>
      <div className="relative">
        <input
          type="checkbox"
          id="toggle"
          className="sr-only"
          checked={isSwitchOn}
          onChange={handleSwitch}
        />
        <div
          className={`block ${
            isSwitchOn ? 'bg-blue-600' : 'bg-gray-600'
          } w-14 h-8 rounded-full`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
            isSwitchOn ? 'transform translate-x-6' : ''
          }`}
        ></div>
      </div>
      <p className="text-xs font-semibold pl-2">ON</p>
    </label>
  )
}

export default Switch
