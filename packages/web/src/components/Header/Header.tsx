import LifeLeaderIcon from './LifeLeader.png'

const Header = () => {
  return (
    <header className="w-full py-4 bg-gray-400 flex justify-between items-center px-4 md:px-10">
      <div className="flex items-center">
        <img src={LifeLeaderIcon.src} alt="Logo" className="h-8 mr-2" />
        <span
          className="text-white text-xl font-semibold"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Life Leader
        </span>
      </div>
      <div>
        <select className="border rounded p-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500">
          <option value="en">English</option>
          <option value="ko">한국어</option>
        </select>
      </div>
    </header>
  )
}

export default Header
