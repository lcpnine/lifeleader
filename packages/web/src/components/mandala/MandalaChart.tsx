const Square = () => <div className="w-6 h-6 border border-gray-200">ㅎ</div>

const Grid = () => (
  <div className="grid grid-cols-3 gap-1">
    {Array.from({ length: 9 }).map((_, index) => (
      <Square key={index} />
    ))}
  </div>
)

const MandalaChart = () => (
  <div className="grid grid-cols-3 gap-4">
    {Array.from({ length: 9 }).map((_, index) => (
      <Grid key={index} />
    ))}
  </div>
)

export default MandalaChart
